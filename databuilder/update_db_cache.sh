source ../venv/bin/activate
./get_people.py -daily_update
./get_genres.py
./get_production_companies.py -daily_update
./get_countries.py
./get_languages.py
./get_movies.py -daily_update

rm -rf /var/tmp/django_cache
./cache_warmer.py
