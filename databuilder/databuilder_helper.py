import gzip
import json
import logging
import os
import shutil
import urllib.error
import urllib.request
from datetime import datetime
from multiprocessing import Pool

import mysql.connector
from tqdm import tqdm

LOOKUP = {
    'movie_ids':
        {
            'name': 'Movies',
            'db_get_ids_query': 'SELECT movie_id FROM movies_dev'
        },
    'person_ids':
        {
            'name': 'People',
            'db_get_ids_query': 'SELECT person_id FROM people'
        },
    'production_company_ids':
        {
            'name': 'Production Companies',
            'db_get_ids_query': 'SELECT production_company_id FROM production_companies'
        }
}


def configure_logging(filename):
    if not os.path.exists('logs'):
        os.makedirs('logs')

    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s %(levelname)s %(message)s',
        handlers=[
            logging.FileHandler(f'logs/{filename}'),
            logging.StreamHandler()
        ]
    )


def get_config():
    with open('../config.json', 'r') as config_file:
        config = json.load(config_file)

    api_key = config['api_key']
    user = config['db_config']['user']
    password = config['db_config']['password']
    host = config['db_config']['host']
    database = config['db_config']['database']
    port = config['db_config']['port']

    return api_key, user, password, host, database, port


def connect_db(user, password, host, database, port):
    # logging.info('Connecting to database...')
    cnx = mysql.connector.connect(user=user, password=password,
                                  host=host, database=database,
                                  port=port)
    # logging.info('Database connection successful!')
    cursor = cnx.cursor()

    return cnx, cursor


def close_db(cnx):
    cnx.close()
    # logging.info('Closed database connection.')


def create_tables_if_not_exist(table_names):
    _, user, password, host, database, port = get_config()
    cnx, cursor = connect_db(user, password, host, database, port)

    for table_name in table_names:
        logging.info(f'Creating {table_name} table if not exists...')
        with open(f'sql_scripts/create_{table_name}_table.sql') as sql_file:
            cursor.execute(sql_file.read())
            cnx.commit()

    close_db(cnx)
    logging.info('Done!')


def get_ids_fe(ids, date):
    logging.info(f'Checking if {LOOKUP[ids]["name"]} file export for {date} exists in directory...')
    if os.path.exists(f'{ids}_{date}.json.gz'):
        logging.info(f'{LOOKUP[ids]["name"]} file export for {date} exists in directory!')

    else:
        logging.info(f'{LOOKUP[ids]["name"]} file export for {date} does not exist in Directory.')
        logging.info(f'Retrieving {LOOKUP[ids]["name"]} file export for {date}...')
        fe_url = f'https://files.tmdb.org/p/exports/{ids}_{date}.json.gz'
        urllib.request.urlretrieve(fe_url, f'{ids}_{date}.json.gz')
        logging.info(f'Successfully retrieved {LOOKUP[ids]["name"]} file export!')

    logging.info(f'Extracting .json file from {ids}_{date}.json.gz...')
    with gzip.open(f'{ids}_{date}.json.gz', 'rb') as gzip_file:
        with open(f'{ids}_{date}.json', 'wb') as json_file:
            shutil.copyfileobj(gzip_file, json_file)
    logging.info(f'Successfully extracted .json file from {ids}_{date}.json.gz!')

    logging.info(f'Retrieving {ids} from {ids}_{date}.json...')
    with open(f'{ids}_{date}.json') as json_file:
        ids_fe = set()

        for line in json_file:
            ids_fe.add(json.loads(line)['id'])
    logging.info(f'Successfully retrieved {ids} from {ids}_{date}.json!')

    return ids_fe


def get_ids_db(ids):
    logging.info(f'Retrieving {ids} from database...')

    _, user, password, host, database, port = get_config()
    cnx, cursor = connect_db(user, password, host, database, port)
    get_ids_query = LOOKUP[ids]['db_get_ids_query']
    cursor.execute(get_ids_query)

    ids_db = set()
    for id_db in cursor:
        ids_db.add(id_db[0])

    close_db(cnx)
    logging.info(f'Successfully retrieved {ids} from database!')

    return ids_db


def remove_fe(ids, date):
    logging.info(f'Removing {LOOKUP[ids]["name"]} file export and .json file for {date} from directory...')
    os.remove(f'{ids}_{date}.json')
    os.remove(f'{ids}_{date}.json.gz')
    logging.info(f'Successfully removed {LOOKUP[ids]["name"]} file export and .json file for {date} from directory!')


def get_new_records_fe(ids, get_function):
    logging.info('Inserting new records from file export...')

    today = datetime.today()
    today_str = today.strftime('%m_%d_%Y')

    ids_fe = get_ids_fe(ids, today_str)
    ids_db = get_ids_db(ids)
    new_ids = ids_fe - ids_db

    logging.info(f'Found {len(new_ids)} new records to insert!')

    for _ in tqdm(Pool().imap_unordered(get_function, new_ids), total=len(new_ids)):
        pass
    logging.info('Successfully inserted new records from file export!')

    remove_fe(ids, today_str)
