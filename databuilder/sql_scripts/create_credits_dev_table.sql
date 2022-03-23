CREATE TABLE IF NOT EXISTS credits_dev
(
  -- only getting movie_id and people_id
  movie_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY (movie_id, people_id),
  FOREIGN KEY (movie_id) REFERENCES movies_dev(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES people(person_id) ON DELETE CASCADE
);

