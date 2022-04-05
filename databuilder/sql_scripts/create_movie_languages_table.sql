CREATE TABLE IF NOT EXISTS movie_languages
(
  iso_639_1 VARCHAR(255) NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (iso_639_1, movie_id),
  FOREIGN KEY (iso_639_1) REFERENCES languages(iso_639_1) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

