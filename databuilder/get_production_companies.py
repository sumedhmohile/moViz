#!/usr/bin/env python3

import json
import logging
import urllib.error
import urllib.request

import databuilder_helper

databuilder_helper.configure_logging('get_production_companies.log')
logging.info('Program started.')

api_key, user, password, host, database, port = databuilder_helper.get_config()
PRODUCTION_COMPANY_INSERT_QUERY = 'INSERT INTO production_companies VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'


def get_production_company(production_company_id):
    production_company_url = f'https://api.themoviedb.org/3/company/{production_company_id}?api_key={api_key}'

    try:
        with urllib.request.urlopen(production_company_url) as production_company:
            production_company_json = json.loads(production_company.read().decode())

    except urllib.error.HTTPError:
        logging.warning(f'Could not find data for production_company_id {production_company_id}.')

        return

    description = production_company_json['description']
    if description == '':
        description = None

    headquarters = production_company_json['headquarters']
    if headquarters == '':
        headquarters = None

    homepage = production_company_json['homepage']
    if homepage == '':
        homepage = None

    logo_path = production_company_json['logo_path']
    name = production_company_json['name']
    origin_country = production_company_json['origin_country']
    parent_company_dict = production_company_json['parent_company']

    if parent_company_dict:
        parent_company_id = parent_company_dict['id']
    else:
        parent_company_id = None

    cnx, cursor = databuilder_helper.connect_db(user, password, host, database, port)
    try:
        cursor.execute(PRODUCTION_COMPANY_INSERT_QUERY, (
            description, headquarters, homepage, production_company_id, logo_path, name, origin_country,
            parent_company_id))

    except Exception as e:
        logging.critical(e)

        return

    cnx.commit()
    # logging.info(f'Successfully committed INSERT operation for production_company_id {production_company_id}!')
    databuilder_helper.close_db(cnx)


if __name__ == "__main__":
    table_names = ['production_companies']

    databuilder_helper.create_tables_if_not_exist(table_names)
    databuilder_helper.get_new_records_fe('production_company_ids', get_production_company)
    logging.info('Program terminated.')
