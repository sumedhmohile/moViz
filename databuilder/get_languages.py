#!/usr/bin/env python3

import json
import logging
import urllib.request

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_languages.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
LANGUAGE_INSERT_QUERY = 'INSERT INTO languages VALUES (%s, %s, %s)'


def get_languages():
    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    language_url = f'https://api.themoviedb.org/3/configuration/languages?api_key={api_key}'
    with urllib.request.urlopen(language_url) as language:
        language_json = json.loads(language.read().decode())

    for language in tqdm(language_json):
        iso_639_1 = language['iso_639_1']
        english_name = language['english_name']
        name = language['name']

        try:
            cursor.execute(LANGUAGE_INSERT_QUERY, (iso_639_1, english_name, name))
            logging.info(f'Successfully committed INSERT operation for iso_639_1 {iso_639_1}!')

        except Exception as e:
            logging.warning(e)

    cnx.commit()
    databuilder_helper.close_db(cnx)


if __name__ == "__main__":
    table_names = ['languages']

    databuilder_helper.create_tables_if_not_exist(table_names)
    get_languages()
    logging.info('Program terminated.')
