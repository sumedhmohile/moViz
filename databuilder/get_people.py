#!/usr/bin/env python3

import json
import logging
import time
import urllib.error
import urllib.request
from argparse import ArgumentParser
from datetime import datetime, timedelta
from multiprocessing import Pool

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_people.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
PEOPLE_INSERT_QUERY = 'INSERT INTO people VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'


def get_person(person_id):
    person_url = f'https://api.themoviedb.org/3/person/{person_id}?api_key={api_key}'

    try:
        with urllib.request.urlopen(person_url) as person:
            person_json = json.loads(person.read().decode())

    except urllib.error.HTTPError as e:
        logging.warning(f'Could not find data for person_id {person_id}: {e}.')

        return

    birthday = person_json['birthday']
    if birthday:
        try:
            birthday = datetime.strptime(birthday, '%Y-%m-%d').date()

        except (ValueError, TypeError):
            logging.warning(
                f'Could not set birthday "{birthday}" for person_id {person_id}. Setting it to NULL instead.')
            birthday = None

    known_for_department = person_json['known_for_department']
    if known_for_department == 'Actors':
        known_for_department = 'Acting'

    deathday = person_json['deathday']
    if deathday:
        try:
            deathday = datetime.strptime(deathday, '%Y-%m-%d').date()

        except (ValueError, TypeError):
            logging.warning(
                f'Could not set deathday "{deathday}" for person_id {person_id}. Setting it to NULL instead.')
            deathday = None

    name = person_json['name']

    gender = person_json['gender']
    if gender == 0:
        gender = None
    elif gender == 1:
        gender = 'Female'
    elif gender == 2:
        gender = 'Male'
    elif gender == 3:
        gender = 'Other'

    biography = person_json['biography']
    if biography == '':
        biography = None

    popularity = person_json['popularity']
    place_of_birth = person_json['place_of_birth']
    profile_path = person_json['profile_path']
    adult = int(person_json['adult'])

    imdb_id = person_json['imdb_id']
    if imdb_id == '':
        imdb_id = None

    homepage = person_json['homepage']

    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)
    try:
        cursor.execute(PEOPLE_INSERT_QUERY, (
            birthday, known_for_department, deathday, person_id, name, gender, biography, popularity, place_of_birth,
            profile_path, adult, imdb_id, homepage))
        # logging.info(f'Successfully executed INSERT operation for person_id {person_id}!')

    except Exception as e:
        logging.critical(e)
        cnx.rollback()
        databuilder_helper.close_db(cnx)

        return

    cnx.commit()
    # logging.info(f'Successfully Committed INSERT operation for person_id {person_id}!')
    databuilder_helper.close_db(cnx)


def update_people():
    today = datetime.today()
    today_str = today.strftime('%Y-%m-%d')
    yesterday = today - timedelta(days=1)
    yesterday_str = yesterday.strftime('%Y-%m-%d')
    people_url = f'https://api.themoviedb.org/3/person/changes?api_key={api_key}&start_date={yesterday_str}&end_date={today_str}'

    logging.info('Updating records...')
    while True:
        try:
            with urllib.request.urlopen(people_url) as people:
                people_json = json.loads(people.read().decode())

            break

        except urllib.error.HTTPError as e:
            seconds = 60
            logging.warning(f'Could not get people updates: {e}. Trying again after {seconds} seconds.')
            time.sleep(seconds)

    daily_change_ids = set()
    for result in people_json['results']:
        daily_change_ids.add(result['id'])

    logging.info(f'Found {len(daily_change_ids)} records to update!')

    logging.info('Removing outdated records...')
    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    PEOPLE_DELETE_QUERY = f'DELETE FROM people WHERE person_id IN ({", ".join(["%s"] * len(daily_change_ids))});'
    cursor.execute(PEOPLE_DELETE_QUERY, list(daily_change_ids))
    cnx.commit()
    logging.info('Successfully removed outdated records!')

    logging.info('Inserting updated records...')
    for _ in tqdm(Pool().imap_unordered(get_person, daily_change_ids), total=len(daily_change_ids)):
        pass

    databuilder_helper.close_db(cnx)
    logging.info('Successfully inserted updated records!')


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-daily_update', action='store_true', help='fetch updates from yesterday')
    args = parser.parse_args()

    table_names = ['people']

    databuilder_helper.create_tables_if_not_exist(table_names)

    if args.daily_update:
        update_people()

    databuilder_helper.get_new_records_fe('person_ids', get_person)
    logging.info('Program terminated.')
