CREATE TABLE IF NOT EXISTS movie_languages
(
  movie_id INT NOT NULL,
  iso_639_1 VARCHAR(255) NOT NULL,
  PRIMARY KEY (movie_id, iso_639_1),
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (iso_639_1) REFERENCES languages(iso_639_1) ON DELETE CASCADE
);

