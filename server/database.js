const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const menuItems = function() {
  const queryString = `
    SELECT name description price image_url, ingredients
    FROM menus;
  `;
  return pool.query(queryString)
             .then((result) => result.rows)
             .catch((err) => err);
};

const addCustomer = function(customer) {
  const queryString = `
    INSERT INTO customers (name, phone, email, password, address)
    VALUES ($1, $2, $3, $4, $5);
  `;
  const {name, phone, email, password, address} = customer;
  const queryParams = [name, phone, email, password, address];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
};

const addOrder = function(order) {
  const queryString = `
    INSERT INTO orders (customer_id, order_time, status)
    VALUES ($1, $2, $3);
  `;

  const {customer_id, order_time, status} = order;
  const queryParams = [customer_id, order_time, status];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
};

const addOrderDetail = function(order_detail) {
  const queryString = `
    INSERT INTO order_details (order_id, menu_id)
    VALUES ($1, $2)
  `

  const {order_id, menu_id} = order_detail;
  const queryParams = [order_id, menu_id];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
}
// This is used to fetch the data from database and show them to the shopping cart, so user
// know what they have ordered
const getOrderDetailsByOrderId = function(order_id) {
  const queryString = `
  SELECT id, customer_name, item, COUNT(*) AS quantity, Sum(price) AS price
  FROM (
  SELECT customers.id, customers.name AS customer_name, menus.name AS item, menus.price AS price
  FROM order_details
  JOIN menus ON menu_id = menus.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE orders.id = 1
  ) AS orders
  GROUP BY id,customer_name, item;
  `;

  const queryParams = [order_id];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
}

// This is used to display the total_price for the order
const getOrdersPrice = function(order_id) {
  const queryString = `
  SELECT customers.id, customers.name AS customer_name,  SUM(menus.price) AS total_price
  FROM order_details
  JOIN menus ON menu_id = menus.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE orders.id = $1
  GROUP BY customers.id;
  `;

  const queryParams = [order_id];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
}

// This is used to show customers their order history
const getOrderHistories = function(customer_id) {
  const queryString = `
  SELECT customers.id, customers.name AS customer_name,  SUM(menus.price) AS total_price
  FROM order_details
  JOIN menus ON menu_id = menus.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE customer_id = 3
  GROUP BY orders.id, customers.id;
  `;

  const queryParams = [customer_id];

  return pool.query(queryString, queryParams)
             .then((result) => result.rows)
             .catch((err) => err);
}
module.exports = {
  menuItems,
  addCustomer,
  addOrder,
  addOrderDetail,
  getOrderDetailsByOrderId,
  getOrdersPrice,
  getOrderHistories
}
