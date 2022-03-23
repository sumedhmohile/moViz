CREATE TABLE IF NOT EXISTS people
(
  birthday DATE,
  known_for_department VARCHAR(255),
  deathday DATE,
  person_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  -- also_known_as not implemented
  gender INT NOT NULL,
  biography TEXT NOT NULL,
  popularity DOUBLE NOT NULL,
  place_of_birth VARCHAR(255),
  profile_path VARCHAR(255),
  -- adult not implemented
  imdb_id VARCHAR(255),
  homepage VARCHAR(255),
  PRIMARY KEY (person_id)
);
