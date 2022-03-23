#!/usr/bin/env python3

import json
import logging
import urllib.request

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_countries.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
COUNTRIES_INSERT_QUERY = 'INSERT INTO countries VALUES (%s, %s, %s)'


def get_countries():
    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    country_url = f'https://api.themoviedb.org/3/configuration/countries?api_key={api_key}'
    with urllib.request.urlopen(country_url) as country:
        country_json = json.loads(country.read().decode())

    for country in tqdm(country_json):
        iso_3166_1 = country['iso_3166_1']
        english_name = country['english_name']
        native_name = country['native_name']

        try:
            cursor.execute(COUNTRIES_INSERT_QUERY, (iso_3166_1, english_name, native_name))
            logging.info(f'Successfully executed INSERT operation for iso_3166_1 {iso_3166_1}!')

        except Exception as e:
            logging.warning(e)

    cnx.commit()
    databuilder_helper.close_db(cnx)


if __name__ == "__main__":
    table_names = ['countries']

    databuilder_helper.create_tables_if_not_exist(table_names)
    get_countries()
    logging.info('Program terminated.')
