#!/usr/bin/env python3

import logging

import requests

import databuilder_helper

databuilder_helper.configure_logging('cache_warmer.log')
logging.info('Program started.')

apis = requests.get('http://localhost:8000/api/')
apis_json = apis.json()

for key in apis_json():
    logging.info(f'Caching {key}...')
    requests.get(apis_json[key])

logging.info('Program terminated.')

if __name__ == "__main__":
    pass
