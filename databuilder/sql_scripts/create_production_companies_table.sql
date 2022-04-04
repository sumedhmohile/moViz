CREATE TABLE IF NOT EXISTS production_companies
(
  description VARCHAR(255),
  headquarters VARCHAR(255),
  homepage VARCHAR(255),
  production_company_id INT NOT NULL,
  logo_path VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  origin_country VARCHAR(255),
  parent_company_id INT, -- only getting parent_company_id
  PRIMARY KEY (production_company_id)
);

