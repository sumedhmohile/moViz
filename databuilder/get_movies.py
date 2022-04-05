#!/usr/bin/env python3

import json
import logging
import urllib.error
import urllib.request
from argparse import ArgumentParser
from datetime import datetime, timedelta
from multiprocessing import Pool

from tqdm import tqdm

import databuilder_helper

databuilder_helper.configure_logging('get_movies.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
MOVIE_INSERT_QUERY = 'INSERT INTO movies VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
MOVIE_GENRES_INSERT_QUERY = 'INSERT INTO movie_genres VALUES (%s, %s)'
MOVIE_PRODUCTION_COMPANIES_INSERT_QUERY = 'INSERT INTO movie_production_companies VALUES (%s, %s)'
MOVIE_PRODUCTION_COUNTRIES_INSERT_QUERY = 'INSERT INTO movie_production_countries VALUES (%s, %s)'
MOVIE_LANGUAGES_INSERT_QUERY = 'INSERT INTO movie_languages VALUES (%s, %s)'
CREDITS_INSERT_QUERY = 'INSERT INTO credits VALUES (%s, %s)'
MOVIE_DELETE_QUERY = 'DELETE FROM movies WHERE movie_id=%s'


def get_movie(movie_id):
    movie_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&append_to_response=credits'

    try:
        with urllib.request.urlopen(movie_url) as movie:
            movie_json = json.loads(movie.read().decode())

    except urllib.error.HTTPError as e:
        logging.warning(f'Could not find data for movie_id {movie_id}: {e}.')

        return

    backdrop_path = movie_json['backdrop_path']

    budget = movie_json['budget']
    if budget == 0:
        budget = None

    homepage = movie_json['homepage']
    if homepage == '':
        homepage = None

    movie_id = movie_json['id']

    imdb_id = movie_json['imdb_id']
    if imdb_id == '':
        imdb_id = None

    original_language = movie_json['original_language']
    original_title = movie_json['original_title']

    overview = movie_json['overview']
    if overview == '':
        overview = None

    popularity = movie_json['popularity']
    poster_path = movie_json['poster_path']

    try:
        release_date = datetime.strptime(movie_json['release_date'], '%Y-%m-%d').date()

    except ValueError:
        logging.warning(
            f'Could not set release_date "{movie_json["release_date"]}" for movie_id {movie_id}. Setting it to NULL instead.')
        release_date = None

    revenue = movie_json['revenue']
    if revenue == 0:
        revenue = None

    runtime = movie_json['runtime']
    if runtime == 0:
        runtime = None

    status = movie_json['status']

    tagline = movie_json['tagline']
    if tagline == '':
        tagline = None

    title = movie_json['title']

    vote_average = movie_json['vote_average']
    if vote_average == 0:
        vote_average = None

    vote_count = movie_json['vote_count']

    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)
    try:
        cursor.execute(MOVIE_INSERT_QUERY, (backdrop_path, budget, homepage, movie_id, imdb_id,
                                            original_language, original_title, overview, popularity,
                                            poster_path, release_date, revenue, runtime, status, tagline, title,
                                            vote_average, vote_count))
        # logging.info(f'Successfully executed INSERT operation for movie_id {movie_id}!')

        for genre in movie_json['genres']:
            genre_id = genre['id']

            cursor.execute(MOVIE_GENRES_INSERT_QUERY, (genre_id, movie_id))
            # logging.info(f'Successfully executed INSERT operation for genre_id {genre_id}, movie_id {movie_id}!')

        for production_company in movie_json['production_companies']:
            production_company_id = production_company['id']

            cursor.execute(MOVIE_PRODUCTION_COMPANIES_INSERT_QUERY, (production_company_id, movie_id))
            # logging.info(
            #     f'Successfully executed INSERT operation for production_company_id {production_company_id}, movie_id {movie_id}!')

        for production_country in movie_json['production_countries']:
            iso_3166_1 = production_country['iso_3166_1']

            cursor.execute(MOVIE_PRODUCTION_COUNTRIES_INSERT_QUERY, (iso_3166_1, movie_id))
            # logging.info(
            #     f'Successfully executed INSERT operation for iso_3166_1 {iso_3166_1}, movie_id {movie_id}!')

        for spoken_language in movie_json['spoken_languages']:
            iso_639_1 = spoken_language['iso_639_1']

            cursor.execute(MOVIE_LANGUAGES_INSERT_QUERY, (iso_639_1, movie_id))
            # logging.info(f'Successfully executed INSERT operation for iso_639_1 {iso_639_1}, movie_id {movie_id}!')

        if 'credits' in movie_json:
            for credits in [movie_json['credits']['cast'], movie_json['credits']['crew']]:
                for credit in credits:
                    person_id = credit['id']

                    try:
                        cursor.execute(CREDITS_INSERT_QUERY, (movie_id, person_id))
                        # logging.info(
                        #     f'Successfully executed INSERT operation for movie_id {movie_id}, person_id {person_id}!')
                    except Exception as e:
                        logging.warning(e)

                        continue

    except Exception as e:
        logging.critical(e)
        cnx.rollback()
        databuilder_helper.close_db(cnx)

        return

    cnx.commit()
    # logging.info(f'Successfully committed INSERT operation for movie_id {movie_id}!')
    databuilder_helper.close_db(cnx)


def update_movies():
    today = datetime.today()
    today_str = today.strftime('%Y-%m-%d')
    yesterday = today - timedelta(days=1)
    yesterday_str = yesterday.strftime('%Y-%m-%d')
    movies_url = f'https://api.themoviedb.org/3/movie/changes?api_key={api_key}&start_date={yesterday_str}&end_date={today_str}'

    logging.info('Updating records...')
    with urllib.request.urlopen(movies_url) as movies:
        movies_json = json.loads(movies.read().decode())

    daily_change_ids = set()
    for result in movies_json['results']:
        daily_change_ids.add(result['id'])

    logging.info(f'Found {len(daily_change_ids)} records to update!')

    logging.info('Removing outdated records...')
    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)

    for movie_id in tqdm(daily_change_ids):
        cursor.execute(MOVIE_DELETE_QUERY, (movie_id,))

    cnx.commit()
    logging.info('Successfully removed outdated records!')

    logging.info('Inserting updated records...')
    for _ in tqdm(Pool().imap_unordered(get_movie, daily_change_ids), total=len(daily_change_ids)):
        pass

    databuilder_helper.close_db(cnx)
    logging.info('Successfully inserted updated records!')


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-daily_update', action='store_true',
                        help='fetch updates (program needs to run daily from the cron job)')
    args = parser.parse_args()

    table_names = [
        'movies',
        'movie_genres',
        'movie_production_companies',
        'movie_production_countries',
        'movie_languages',
        'credits'
    ]

    databuilder_helper.create_tables_if_not_exist(table_names)

    if args.daily_update:
        update_movies()

    databuilder_helper.get_new_records_fe('movie_ids', get_movie)
    logging.info('Program terminated.')
