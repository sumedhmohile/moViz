CREATE TABLE IF NOT EXISTS movie_production_companies
(
  movie_id INT NOT NULL,
  production_company_id INT NOT NULL,
  PRIMARY KEY (movie_id, production_company_id),
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (production_company_id) REFERENCES production_companies(production_company_id) ON DELETE CASCADE
);

