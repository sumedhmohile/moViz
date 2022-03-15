import helper
import ast
import json


movie_input = "movies.txt"
actor_input = "actors.txt"
credit_input = "credits.txt"

genre_output = "genre_db.csv"
genre_mapping_output = "genre_mapping_db.csv"
actor_output = "actor_db.csv"
movie_output = "movie_db.csv"
credit_output = "credit_db.csv"

config_file = open("config.json")
config_data = json.load(config_file)

print(config_data)

api_key = config_data['api_key']

with open(genre_output, 'w') as f:
    pass
with open(genre_mapping_output, 'w') as f:
    pass
with open(actor_output, 'w') as f:
    pass
with open(movie_output, 'w') as f:
    pass
with open(credit_output, 'w') as f:
    pass

def add_genres():
    data = helper.get_all_genres(api_key)

    for genre in data:
        genre_id = genre[0]
        genre_name = genre[1]

        print(str(genre_id) + " " + str(genre_name))

        try:
            with open(genre_output, "a") as file:
                file.write("%s|%s\n" % (genre_id, genre_name))

        except Exception as e:
            print(str(e))

def add_movies():
    with open(movie_input, 'r') as file:
        for line in file:
            movie = line.strip().split('|')

            movie_id = movie[0].strip()
            title = movie[1].strip()
            runtime = movie[2].strip()
            revenue = movie[3].strip()
            release_date = movie[4].strip()
            popularity = movie[5].strip()
            language = movie[6].strip()
            genres = movie[7].strip()
            budget = movie[8].strip()
            rating = movie[9].strip()

            print(movie)

            try:
                with open(movie_output, 'a') as file:
                    file.write("%s|%s|%s|%s|%s|%s|%s|%s|%s\n" % (movie_id, title, budget, language, popularity, release_date, revenue, runtime, rating))

                genre_data = ast.literal_eval(genres)

                for genre in genre_data:
                    genre_id = genre['id']

                    with open(genre_mapping_output, 'a') as file:
                        file.write("%s|%s\n" % (genre_id, movie_id))

            except Exception as e:
                print(str(e))


def add_actors():
    with open(actor_input, 'r') as file:
        for line in file:
            actor = line.strip().split('|')

            actor_id = actor[0].strip()
            name = actor[1].strip()
            popularity = actor[2].strip()
            birthday = actor[3].strip()
            department = actor[4].strip()
            gender = actor[5].strip()
            place_of_birth = actor[6].strip()

            try:
                with open(actor_output, 'a') as file:
                    file.write("%s|%s|%s|%s|%s|%s|%s\n" % (actor_id, name, popularity, birthday, department, gender, place_of_birth))

            except Exception as e:
                print(str(e))


def add_credits():
    with open(credit_input, 'r') as file:
        for line in file:
            credit = line.strip().split('|')

            movie_id = credit[0].strip()
            actor_id = credit[1].strip()

            try:
                with open(credit_output, 'a') as file:
                    file.write("%s|%s\n" % (movie_id, actor_id))


            except Exception as e:
                print(str(e))


add_genres()
add_actors()
add_movies()
add_credits()