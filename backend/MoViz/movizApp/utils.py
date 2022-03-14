import mysql.connector
import json

graph_map = {
    'testGraph' : 'select * from movies limit 10;',
    'testParamGraph' : 'select * from movies where title=\'%s\' and language=\'%s\';',
    'revenueByGenreAndYear' : 'select g.name as genre, YEAR(m.release_date) as year, sum(m.revenue) as revenue from movies m inner join genre_mapping gm on gm.movie_id=m.movie_id inner join genres g on g.genre_id=gm.genre_id where m.release_date is not null group by g.name, YEAR(m.release_date)',
    'avgRevenueActorGenre' : 'select a.name as name, g.name as genre, avg(m.revenue) as avg_revenue from (select * from actors order by popularity desc limit 100) a inner join credits c on c.actor_id=a.actor_id inner join movies m on m.movie_id=c.movie_id inner join genre_mapping gm on gm.movie_id=m.movie_id inner join genres g on g.genre_id=gm.genre_id group by gm.genre_id, a.actor_id;',
    'popularityByGenreAndYear' : 'select g.name as genre, YEAR(m.release_date) as year, avg(m.popularity) as popularity from movies m inner join genre_mapping gm on gm.movie_id=m.movie_id inner join genres g on g.genre_id=gm.genre_id where m.release_date is not null group by g.name, YEAR(m.release_date);',
    'durationVSrevenue' : 'select runtime, avg(revenue) as revenue from movies where revenue > 0 and runtime > 10 group by runtime;',
    'countByGender' : 'select case when gender = 1 then \'Female\' when gender = 2 then \'Male\' else \'Other\' end as gender, count(*) as count from actors where gender > 0 group by gender;',
    'countByPlace' : 'select place_of_birth as place, count(*) as count from actors group by place_of_birth;',
    'budgetRevenueLanguagePopularity' : 'select language, avg(revenue) as revenue, avg(budget) as budget, avg(popularity) as popularity from movies where language regexp \'^[a-zA-Z]+\' and revenue > 0 and budget > 0 group by language;',
    'budgetPopularityGenre' : 'select m.title, m.budget, m.rating, g.name from movies m inner join genre_mapping gm on m.movie_id=gm.movie_id inner join genres g on g.genre_id=gm.genre_id where m.budget > 0 and m.rating > 0;'
}


def run_query(query):
    print("Attempting to run query: " + query)
    connection = mysql.connector.connect(
        host="database-1.cmra5f09g0at.us-east-2.rds.amazonaws.com",
        user="admin",
        password="CS526Rutgers",
        database="MoViz",
        port="3306"
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

    result = {"data": data, "status" : 200}

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
