import requests
from actor import Actor
from movie import Movie


def get_popular_actor_ids(max_count, api_key):
    ids = []
    page = 1

    while len(ids) < max_count:
        payload = {'api_key': api_key, 'language': 'en-US', 'page': page}
        r = requests.get('https://api.themoviedb.org/3/person/popular', params=payload)

        actor_data = r.json()['results']

        for actor in actor_data:
            ids.append(actor['id'])

        page += 1

    return ids


def get_actor_by_id(id, api_key):
    payload = {'api_key': api_key, 'language': 'en-US'}
    r = requests.get('https://api.themoviedb.org/3/person/' + str(id), params=payload)

    actor_data = r.json()

    return Actor(actor_data['id'], actor_data['name'], actor_data['popularity'], actor_data['birthday'],
                 actor_data['known_for_department'], actor_data['gender'], actor_data['place_of_birth'])


def get_movie_ids_for_actor_id(id, api_key):
    movie_ids = []
    payload = {'api_key': api_key, 'language': 'en-US'}
    r = requests.get('https://api.themoviedb.org/3/person/' + str(id) + "/movie_credits", params=payload)

    movies = r.json()['cast']

    for movie in movies:
        movie_ids.append(movie['id'])

    return movie_ids


def get_movie_for_id(id, api_key):
    payload = {'api_key': api_key, 'language': 'en-US'}
    r = requests.get('https://api.themoviedb.org/3/movie/' + str(id), params=payload)

    movie_data = r.json()


    return Movie(movie_data['id'], movie_data['title'], movie_data['budget'], movie_data['genres'], movie_data['original_language'],
                 movie_data['popularity'], movie_data['release_date'], movie_data['revenue'], movie_data['runtime'])


def get_all_genres(api_key):
    payload = {'api_key': api_key, 'language': 'en-US'}
    r = requests.get('https://api.themoviedb.org/3/genre/movie/list', params=payload)
    result = []

    genre_data = r.json()['genres']

    print(genre_data)

    for genre in genre_data:
        result.append((genre['id'], genre['name']))

    return result


def get_credits_for_actor_id(id, api_key):
    payload = {'api_key': api_key, 'language': 'en-US'}
    r = requests.get('https://api.themoviedb.org/3/person/' + str(id) + '/movie_credits', params=payload)
    result = []

    data = r.json()['cast']

    for item in data:
        result.append(item['id'])

    return result

