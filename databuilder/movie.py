class Movie:
    def __init__(self, id, title, budget, genres, language, popularity, release_date, revenue, runtime, rating):
        self.id = id
        self.title = title
        self.runtime = runtime
        self.revenue = revenue
        self.release_date = release_date
        self.popularity = popularity
        self.language = language
        self.genres = genres
        self.budget = budget
        self.rating = rating

    def __str__(self):
        return str(self.id) + " | " + self.title + " | " + str(self.runtime) + " | " + str(self.revenue) + \
               " | " + str(self.release_date) + " | " + str(self.popularity) + " | " + str(self.language) + \
               " | " + str(self.genres) + " | " + str(self.budget) + " | " + str(self.rating)
