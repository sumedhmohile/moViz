CREATE TABLE IF NOT EXISTS production_company_mapping
(
  production_company_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (production_company_id, movie_id),
  FOREIGN KEY (production_company_id) REFERENCES production_companies(production_company_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies_dev(movie_id) ON DELETE CASCADE
);

