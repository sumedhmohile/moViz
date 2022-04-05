CREATE TABLE IF NOT EXISTS movie_genres
(
  genre_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (genre_id, movie_id),
  FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

