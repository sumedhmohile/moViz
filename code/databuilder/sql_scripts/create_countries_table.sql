CREATE TABLE IF NOT EXISTS countries
(
  iso_3166_1 VARCHAR(255) NOT NULL,
  english_name VARCHAR(255) NOT NULL,
  native_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (iso_3166_1)
);
