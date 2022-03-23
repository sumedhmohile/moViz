CREATE TABLE IF NOT EXISTS genre_mapping_dev
(
  genre_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (genre_id, movie_id),
  FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies_dev(movie_id) ON DELETE CASCADE
);

