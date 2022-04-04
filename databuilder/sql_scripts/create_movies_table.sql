CREATE TABLE IF NOT EXISTS movies
(
  -- adult not implemented
  backdrop_path VARCHAR(255),
  -- belongs_to_collection not implemented
  budget INT,
  -- genres added in movie_genres table
  homepage VARCHAR(255),
  movie_id INT NOT NULL,
  imdb_id VARCHAR(255),
  original_language VARCHAR(255) NOT NULL,
  original_title VARCHAR(255) NOT NULL,
  overview TEXT,
  popularity DOUBLE NOT NULL,
  poster_path VARCHAR(255),
  -- production_companies added in movie_production_companies table
  -- production_countries added in movie_production_countries table
  release_date DATE NOT NULL,
  revenue INT,
  runtime INT,
  -- spoken_languages added in movie_languages table
  status VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  -- video not implemented
  vote_average DOUBLE,
  vote_count INT NOT NULL,
  PRIMARY KEY (movie_id)
);

