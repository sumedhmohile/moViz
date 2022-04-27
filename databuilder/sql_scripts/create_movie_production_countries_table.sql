CREATE TABLE IF NOT EXISTS movie_production_countries
(
  movie_id INT NOT NULL,
  iso_3166_1 VARCHAR(255) NOT NULL,
  PRIMARY KEY (movie_id, iso_3166_1),
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (iso_3166_1) REFERENCES countries(iso_3166_1) ON DELETE CASCADE
);

