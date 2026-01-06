CREATE SCHEMA IF NOT EXISTS mx_dic;

-- ======================================================
-- СЛОВНИК ТИПІВ ПЛІНТУСІВ
-- ======================================================
DROP TABLE IF EXISTS mx_dic.plintus_types CASCADE;

CREATE TABLE IF NOT EXISTS mx_dic.plintus_types (
  id          smallserial PRIMARY KEY,           -- компактний FK
  title       text NOT NULL                     -- локалізована назва (українська)
);

INSERT INTO mx_dic.plintus_types (title) VALUES
 ('Дюрополімер Cezar'),
 ('MDF Cezar'),
 ('MDF'),
 ('Алюмінієвий');
