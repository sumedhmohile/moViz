SHELL := /bin/bash

setup:
	virtualenv venv
	source venv/bin/activate
	pip3 install -r requirements.txt

server:
	source venv/bin/activate
	cd backend/moViz && python3 manage.py runserver 0.0.0.0:8000
