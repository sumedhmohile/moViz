import json
import mysql.connector

graph_map = {
    'testGraph': 'SELECT * FROM movies LIMIT 10;',
    'testParamGraph': 'SELECT * FROM movies WHERE title=\'%s\' AND language=\'%s\';',
    'revenueByGenreAndYear': '''SELECT g.name AS genre, YEAR(m.release_date) AS year, sum(m.revenue) AS revenue
                                FROM movies m
                                INNER JOIN movie_genres mg
                                ON mg.movie_id=m.movie_id
                                INNER JOIN genres g
                                ON g.genre_id=mg.genre_id
                                WHERE m.release_date IS NOT NULL
                                GROUP BY g.name, YEAR(m.release_date);''',
    'avgRevenueActorGenre': '''SELECT p.name AS name, g.name AS genre, AVG(m.revenue) AS avg_revenue
                               FROM (SELECT * FROM people WHERE known_for_department='Acting' ORDER BY popularity DESC LIMIT 10) p
                               INNER JOIN credits c
                               ON c.person_id=p.person_id
                               INNER JOIN movies m
                               ON m.movie_id=c.movie_id
                               INNER JOIN movie_genres mg
                               ON mg.movie_id=m.movie_id
                               INNER JOIN genres g
                               ON g.genre_id=mg.genre_id
                               GROUP BY mg.genre_id, p.person_id;''',
    'popularityByGenreAndYear': '''SELECT g.name AS genre, YEAR(m.release_date) AS year, AVG(m.popularity) AS popularity
                                   FROM movies m
                                   INNER JOIN movie_genres mg 
                                   ON mg.movie_id=m.movie_id
                                   INNER JOIN genres g
                                   ON g.genre_id=mg.genre_id
                                   WHERE m.release_date IS NOT NULL
                                   GROUP BY g.name, YEAR(m.release_date);''',
    'durationVSrevenue': '''SELECT runtime, AVG(revenue) AS revenue
                            FROM movies
                            WHERE revenue>0 AND runtime>10
                            GROUP BY runtime;''',
    'countByGender': '''SELECT CASE WHEN gender=1 THEN \'Female\' WHEN gender=2 THEN \'Male\' ELSE \'Other\' END AS gender, COUNT(*) AS count
                        FROM people
                        WHERE gender>0
                        GROUP BY gender;''',
    'countByPlace': '''SELECT place_of_birth AS place, COUNT(*) AS COUNT
                       FROM people
                       WHERE place_of_birth IS NOT NULL 
                       GROUP BY place_of_birth;''',
    'budgetRevenueLanguagePopularity': '''SELECT english_name AS language, revenue, budget, popularity
                                          FROM (SELECT original_language AS language, AVG(revenue) AS revenue, AVG(budget) AS budget, AVG(popularity) AS popularity FROM movies WHERE original_language regexp \'^[a-zA-Z]+\' AND revenue>0 and budget>0 GROUP BY original_language) m 
                                          INNER JOIN languages l
                                          ON m.language=l.iso_639_1;''',
    'budgetRatingGenre': '''SELECT m.title, m.budget, m.vote_average, g.name
                                FROM movies m
                                INNER JOIN movie_genres mg
                                ON m.movie_id=mg.movie_id
                                INNER JOIN genres g
                                ON g.genre_id=mg.genre_id
                                WHERE m.budget>0 AND m.vote_average>0;''',
    'avgRevenueByGenreForActor': '''SELECT g.name AS genre, AVG(revenue) AS revenue
                                    FROM people p
                                    INNER JOIN credits c
                                    ON p.person_id=c.person_id
                                    INNER JOIN movies m
                                    ON m.movie_id=c.movie_id
                                    INNER JOIN movie_genres mg
                                    ON mg.movie_id=m.movie_id
                                    INNER JOIN genres g
                                    ON g.genre_id=mg.genre_id
                                    WHERE p.name=\'%s\'
                                    GROUP BY g.name;''',
    'avgRevenueByGenreForActors': '''SELECT g.name AS genre, AVG(revenue) AS revenue
                                     FROM movies m
                                     INNER JOIN movie_genres mg
                                     ON mg.movie_id=m.movie_id
                                     INNER JOIN genres g 
                                     ON g.genre_id=mg.genre_id
                                     INNER JOIN (SELECT a1.movie_id FROM (SELECT m.movie_id FROM movies m INNER JOIN credits c ON m.movie_id=c.movie_id INNER JOIN people p ON p.person_id=c.person_id WHERE p.name=\'%s\' ) a1 INNER JOIN (SELECT m.movie_id FROM movies m INNER JOIN credits c ON m.movie_id=c.movie_id INNER JOIN people p ON p.person_id=c.person_id WHERE a.name=\'%s\') a2 ON a1.movie_id=a2.movie_id) fm
                                     ON fm.movie_id=m.movie_id
                                     GROUP BY g.name;''',
    'avgBudgetByGenreForActor': '''SELECT g.name AS genre, AVG(budget) AS budget
                                   FROM people p
                                   INNER JOIN credits c
                                   ON p.person_id=c.person_id
                                   INNER JOIN movies m
                                   ON m.movie_id=c.movie_id
                                   INNER JOIN movie_genres mg
                                   ON mg.movie_id=m.movie_id
                                   INNER JOIN genres g
                                   ON g.genre_id=mg.genre_id
                                   WHERE p.name=\'%s\'
                                   GROUP BY g.name;''',
    'avgBudgetByGenreForActors': '''SELECT g.name AS genre, AVG(budget) AS budget
                                    FROM movies m
                                    INNER JOIN movie_genres mg
                                    ON mg.movie_id=m.movie_id
                                    INNER JOIN genres g
                                    ON g.genre_id=mg.genre_id
                                    INNER JOIN (SELECT a1.movie_id FROM (SELECT m.movie_id FROM movies m INNER JOIN credits c ON m.movie_id=c.movie_id INNER JOIN people p ON p.person_id=c.person_id WHERE p.name=\'%s\') a1 INNER JOIN (SELECT m.movie_id FROM movies m INNER JOIN credits c ON m.movie_id=c.movie_id INNER JOIN people p ON p.person_id=c.person_id WHERE p.name=\'%s\') a2 ON a1.movie_id=a2.movie_id) fm 
                                    ON fm.movie_id=m.movie_id
                                    GROUP BY g.name;''',
}

with open('../../config.json', 'r') as config_file:
    config = json.load(config_file)

user = config['db_config']['user']
password = config['db_config']['password']
host = config['db_config']['host']
database = config['db_config']['database']
port = config['db_config']['port']


def run_query(query):
    print("Attempting to run query: " + query)
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=port
    )

    cursor = connection.cursor()

    results = cursor.execute(query, multi=True)
    data = []
    for cur in results:
        print('cursor:', cur)
        if cur.with_rows:
            for row in cur.fetchall():
                tempDict = {}
                for i, value in enumerate(row):
                    tempDict[cur.description[i][0]] = str(value)
                data.append(tempDict)

    result = {"data": data, "status": 200}

    print(result)

    return result


def get_graph(graphId, graphData):
    query = graph_map[graphId]
    values = []

    if graphData is None:
        return run_query(query)

    for key in graphData:
        values.append(graphData[key])

    parameterized_query = query % tuple(values)

    return run_query(parameterized_query)
