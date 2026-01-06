CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS mx_data;

-- ======================================================
-- ТАБЛИЦЯ ПЛІНТУСІВ
-- ======================================================
DROP TABLE IF EXISTS mx_data.plintus_data CASCADE;
CREATE TABLE IF NOT EXISTS mx_data.plintus_data (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plintus_types_id smallint NOT NULL,
  product_id smallint NOT NULL,
  title text NOT NULL,
  image_path text NOT NULL,
  price numeric(10,2) NOT NULL,
  weight NUMERIC(6,2) NOT NULL,
  length NUMERIC(6,2) NOT NULL,
  width  NUMERIC(6,2) NOT NULL,
  height NUMERIC(6,2) NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plintus_data_fk_plintus_types
    FOREIGN KEY (plintus_types_id) REFERENCES mx_dic.plintus_types(id) ON DELETE RESTRICT,
    CONSTRAINT plintus_data_unique_product_id UNIQUE (product_id)
);

-- Індекси
CREATE INDEX IF NOT EXISTS plintus_data_idx_plintus_types        ON mx_data.plintus_data (plintus_types_id);
CREATE INDEX IF NOT EXISTS plintus_data_idx_product_id        ON mx_data.plintus_data (product_id);


INSERT INTO mx_data.plintus_data
(plintus_types_id, product_id, title, image_path, price, weight, length, width, height)
VALUES
(1, 7897, 'LPC-01',  'catalog/drpm/LPC-01.jpg', 200, 0.275, 2440, 21.6, 21.6),
(1, 7898, 'LPC-04',  'catalog/drpm/LPC-04-1.jpg', 265, 0.445, 2000, 14,   49.5),
(1, 7899, 'LPC-06',  'catalog/drpm/LPC-06-1.jpg', 320, 0.455, 2000, 14,   69),
(1, 7900, 'LPC-07',  'catalog/drpm/LPC-07.jpg', 385, 0.61,  2000, 12.6, 79),
(1, 7901, 'LPC-08',  'catalog/drpm/LPC-08.jpg', 440, 0.715, 2000, 12.2, 94),
(1, 7902, 'LPC-09',  'catalog/drpm/LPC-09-1.jpg', 575, 0.915, 2000, 15,   119),
(1, 7903, 'LPC-11',  'catalog/drpm/lpc11_1200_1200_01.jpg', 360, 0.505, 2000, 13, 78),
(1, 7904, 'LPC-11B', 'catalog/drpm/LPC-11-color.jpg', 420, 0.505, 2000, 13, 78),
(1, 7905, 'LPC-15',  'catalog/drpm/LPC-15-1.jpg', 375, 0.615, 2000, 11, 81),
(1, 7906, 'LPC-16',  'catalog/drpm/LPC-16.jpg', 380, 0.47,  2440, 19, 83),
(1, 7907, 'LPC-18',  'catalog/drpm/lpc18_1200_1200_01.jpg', 400, 0.615, 2000, 10, 107),
(1, 7908, 'LPC-19',  'catalog/drpm/LPC-19.jpg', 490, 0.79,  2000, 17.7, 98),
(1, 7951, 'LPC-20',  'catalog/drpm/LPC-20.jpg', 550, 1.005, 2000, 15.9, 108),
(1, 7952, 'LPC-22',  'catalog/drpm/LPC-22.jpg', 580, 0.89,  2000, 14.5, 117),
(1, 7953, 'LPC-23',  'catalog/drpm/LPC-23.jpg', 385, 0.595, 2000, 15.3, 68.4),
(1, 7954, 'LPC-24',  'catalog/drpm/LPC-24.jpg', 775, 1.564, 2440, 16.8, 136),
(1, 7955, 'LPC-25',  'catalog/drpm/LPC-25.jpg', 570, 1.11,  2000, 13.2, 144),
(1, 7956, 'LPC-26',  'catalog/drpm/LPC-26.jpg', 495, 0.765, 2000, 22,   103),
(1, 7957, 'LPC-27',  'catalog/drpm/LPC-27.jpg', 360, 0.55,  2000, 16,   57),
(1, 7958, 'LPC-28',  'catalog/drpm/LPC-28.jpg', 450, 0.655, 2000, 16,   79),
(1, 7959, 'LPC-29',  'catalog/drpm/LPC-29.jpg', 500, 0.74,  2000, 16,   99),
(1, 7960, 'LPC-30',  'catalog/drpm/LPC-30.jpg', 610, 1.00,  2000, 16,   138),
(1, 7961, 'LPC-31',  'catalog/drpm/LPC-31.jpg', 535, 1.005, 2000, 16,   119),
(1, 7962, 'LPC-32',  'catalog/drpm/LPC-32.jpg', 355, 0.41,  2000, 12,   58),
(1, 7963, 'LPC-33',  'catalog/drpm/LPC-33.jpg', 1070,1.785, 2440, 16.5, 179),
(1, 7964, 'LPC-34',  'catalog/drpm/LPC-34.jpg', 760, 1.495, 2440, 26,   120),
(1, 7965, 'LPC-35',  'catalog/drpm/LPC-35.jpg', 995, 1.755, 2440, 25,   160),
(1, 7966, 'LPC-36',  'catalog/drpm/LPC-36.jpg', 275, 0.38,  2440, 10,   40),
(1, 7967, 'LPC-37',  'catalog/drpm/lpc37_1200_1200_01.jpg', 365, 0.51, 2000, 12, 70),
(1, 7968, 'LPC-38',  'catalog/drpm/LPC-38-1.jpg', 420, 0.635, 2000, 12, 95),
(1, 7969, 'LPC-40',  'catalog/drpm/LPC-40.jpg', 525, 0.97,  2440, 32, 100),
(1, 7983, 'LPC-23A', 'catalog/drpm/LPC-23-color.jpg', 440, 0.595, 2000, 15.3, 68.4),
(1, 8025, 'LPC-39',  'catalog/drpm/LPC-39-1.jpg', 990, 2.24,  2440, 17, 195),
(1, 8047, 'LPC-10',  'catalog/article/lpc-10-wm.jpg', 650, 1.07, 2440, 15, 110);







