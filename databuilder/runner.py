import helper
import json

actor_id_output = "actor_ids.txt"
movie_id_output = "movie_ids.txt"
movie_output = "movies.txt"
actor_output = "actors.txt"
credit_output = "credits.txt"
actors = []

config_file = open("config.json")
config_data = json.load(config_file)

print(config_data)

api_key = config_data['api_key']

popular_actor_ids = helper.get_popular_actor_ids(10, api_key)

print(popular_actor_ids)

def clear():
    with open(movie_id_output, 'w') as f:
        pass
    with open(movie_output, 'w') as f:
        pass
    with open(actor_id_output, 'w') as f:
        pass
    with open(actor_output, 'w') as f:
        pass


def create_credits():
    for index, actor_id in enumerate(popular_actor_ids):
        credit_ids = helper.get_credits_for_actor_id(actor_id, api_key)
        print(credit_ids)
        with open(credit_output, 'a') as f:
            for item in credit_ids:
                f.write("%s|%s\n" % (item, actor_id))

def create_movie_ids():
    for index, actor_id in enumerate(popular_actor_ids):
        print(str(index) + " / " + str(len(popular_actor_ids)))
        movie_ids = helper.get_movie_ids_for_actor_id(actor_id, api_key)


        with open(movie_id_output, 'a') as f:
            for item in movie_ids:
                f.write("%s\n" % item)

        with open(actor_id_output, 'a') as f:
            f.write("%s\n" % actor_id)


def create_movies():
    with open(movie_id_output) as file:
        for line in file:
            movie_id = int(line.strip())

            try:
                movie = helper.get_movie_for_id(movie_id, api_key)
                print(movie)

                with open(movie_output, 'a') as f:
                    f.write("%s\n" % str(movie))
            except Exception:
                pass


def create_actors():
    with open(actor_id_output) as file:
        for line in file:
            actor_id = int(line.strip())

            actor = helper.get_actor_by_id(actor_id, api_key)
            print(actor)

            with open(actor_output, 'a') as f:
                f.write("%s\n" % str(actor))


clear()
create_movie_ids()
create_movies()
create_actors()
create_credits()