#!/usr/bin/env python3

import json
import logging
import urllib.request

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_genres.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
GENRE_INSERT_QUERY = 'INSERT INTO genres VALUES (%s, %s)'


def get_genres():
    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    genre_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}'
    with urllib.request.urlopen(genre_url) as genre:
        genre_json = json.loads(genre.read().decode())

    for genre in tqdm(genre_json['genres']):
        genre_id = genre['id']
        name = genre['name']

        try:
            cursor.execute(GENRE_INSERT_QUERY, (genre_id, name))
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
