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
    'durationVSrevenue': '''select runtime, AVG(revenue) as revenue 
                            from movies 
                            where revenue > 0 and runtime > 10 
                            group by runtime;''',
    'countByGender': '''select case when gender = 1 then \'Female\' when gender = 2 then \'Male\' else \'Other\' end as gender, count(*) as count 
                        from people where gender > 0
                        group by gender;''',
    'countByPlace': '''select place_of_birth as place, count(*) as count 
                       from people where place_of_birth is not null 
                       group by place_of_birth;''',
    'budgetRevenueLanguagePopularity': '''select english_name as language, revenue, budget, popularity 
                                          from (select original_language as language, avg(revenue) as revenue, avg(budget) as budget, avg(popularity) as popularity from movies where original_language regexp \'^[a-zA-Z]+\' and revenue > 0 and budget > 0 group by original_language) m 
                                          inner join languages l on m.language=l.iso_639_1;''',
    'budgetPopularityGenre': '''select m.title, m.budget, m.rating, g.name 
                                from movies m 
                                inner join movie_genres gm on m.movie_id=gm.movie_id 
                                inner join genres g on g.genre_id=gm.genre_id 
                                where m.budget > 0 and m.rating > 0;''',
    'avgRevenueByGenreForActor': '''select g.name as genre, avg(revenue) as revenue 
                                    from people a inner join credits c on a.person_id=c.person_id 
                                    inner join movies m on m.movie_id=c.movie_id 
                                    inner join movie_genres gm on gm.movie_id=m.movie_id 
                                    inner join genres g on g.genre_id=gm.genre_id where a.name=\'%s\' group by g.name;''',
    'avgRevenueByGenreForActors': '''select g.name as genre, avg(revenue) as revenue 
                                     from movies m 
                                     inner join movie_genres gm on gm.movie_id=m.movie_id 
                                     inner join genres g on g.genre_id=gm.genre_id 
                                     inner join ( select a1.movie_id from ( select m.movie_id from movies m inner join credits c on m.movie_id=c.movie_id inner join people a on a.person_id=c.person_id where a.name=\'%s\' ) a1 inner join (select m.movie_id from movies m inner join credits c on m.movie_id=c.movie_id inner join people a on a.person_id=c.person_id where a.name=\'%s\') a2 on a1.movie_id=a2.movie_id) fm on fm.movie_id=m.movie_id group by g.name;''',
    'avgBudgetByGenreForActor': '''select g.name as genre, avg(budget) as budget 
                                   from people a 
                                   inner join credits c on a.person_id=c.person_id 
                                   inner join movies m on m.movie_id=c.movie_id 
                                   inner join movie_genres gm on gm.movie_id=m.movie_id 
                                   inner join genres g on g.genre_id=gm.genre_id 
                                   where a.name=\'%s\' group by g.name;''',
    'avgBudgetByGenreForActors': '''select g.name as genre, avg(budget) as budget 
                                    from movies m 
                                    inner join movie_genres gm on gm.movie_id=m.movie_id 
                                    inner join genres g on g.genre_id=gm.genre_id 
                                    inner join ( select a1.movie_id from ( select m.movie_id from movies m inner join credits c on m.movie_id=c.movie_id inner join people a on a.person_id=c.person_id where a.name=\'%s\' ) a1 inner join (select m.movie_id from movies m inner join credits c on m.movie_id=c.movie_id inner join people a on a.person_id=c.person_id where a.name=\'%s\') a2 on a1.movie_id=a2.movie_id) fm on fm.movie_id=m.movie_id group by g.name;''',        #                             GROUP BY g.name;''',
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
