DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(12),
  email VARCHAR(255),
  password VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  image_url VARCHAR(255),
  ingredients VARCHAR(255),
  status BOOLEAN DEFAULT true
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  order_time TIMESTAMP,
  status BOOLEAN DEFAULT true
);

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE
);
