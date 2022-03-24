CREATE TABLE IF NOT EXISTS movies
(
  -- adult not implemented
  backdrop_path VARCHAR(255),
  -- belongs_to_collection not implemented
  budget INT NOT NULL,
  -- genres added in movie_genres table
  homepage VARCHAR(255),
  movie_id INT NOT NULL,
  imdb_id VARCHAR(255),
  original_language VARCHAR(255) NOT NULL,
  original_title VARCHAR(255) NOT NULL,
  overview TEXT,
  popularity DOUBLE NOT NULL,
  poster_path VARCHAR(255),
  -- production_companies added in production_companies_mapping table
  -- production_countries added in production_countries_mapping table
  release_date DATE NOT NULL,
  revenue INT NOT NULL,
  runtime INT,
  -- spoken_languages added in production_countries_mapping table
  status VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  -- video not implemented
  vote_average DOUBLE NOT NULL,
  vote_count INT NOT NULL,
  PRIMARY KEY (movie_id)
);

