CREATE TABLE IF NOT EXISTS movie_production_countries
(
  iso_3166_1 VARCHAR(255) NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (iso_3166_1, movie_id),
  FOREIGN KEY (iso_3166_1) REFERENCES countries(iso_3166_1) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

