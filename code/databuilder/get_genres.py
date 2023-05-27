#!/usr/bin/env python3

import json
import logging
import time
import urllib.error
import urllib.request

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_genres.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
GENRES_INSERT_QUERY = 'INSERT INTO genres VALUES (%s, %s) ON DUPLICATE KEY UPDATE name=%s;'


def get_genres():
    genres_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}'

    while True:
        try:
            with urllib.request.urlopen(genres_url) as genres:
                genres_json = json.loads(genres.read().decode())

            break

        except urllib.error.HTTPError as e:
            seconds = 60
            logging.warning(f'Could not get genres: {e}. Trying again after {seconds} seconds.')
            time.sleep(seconds)

    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    for genre in tqdm(genres_json['genres']):
        genre_id = genre['id']
        name = genre['name']

        try:
            cursor.execute(GENRES_INSERT_QUERY, (genre_id, name, name))
            logging.info(f'Successfully executed INSERT operation for genre_id {genre_id}!')

        except Exception as e:
            logging.warning(e)

    cnx.commit()
    databuilder_helper.close_db(cnx)


if __name__ == "__main__":
    table_names = ['genres']

    databuilder_helper.create_tables_if_not_exist(table_names)
    get_genres()
    logging.info('Program terminated.')
