const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { PoliciesList } = require('twilio/lib/rest/trusthub/v1/policies');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
const getCustomers = function () {
  const queryString = `
    SELECT *
    FROM customers;
  `;
  return pool.query(queryString)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err)
    });
}
const menuItems = function () {
  const queryString = `
    SELECT *
    FROM menus;
  `;
  return pool.query(queryString)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err)
    });
};

const addCustomer = function (customer) {
  const queryString = `
    INSERT INTO customers (name, phone, email, password, address)
    VALUES ($1, $2, $3, $4, $5);
  `;
  const { name, phone, email, password, address } = customer;
  const queryParams = [name, phone, email, bcrypt.hashSync(password, 10), address];

  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addOrder = function (customer_id, order_time) {
  const queryString = `
    INSERT INTO orders (customer_id, order_time)
    VALUES ($1, $2)
    RETURNING id;
  `;

  // const { customer_id, order_time, status } = order;
  const queryParams = [customer_id, order_time];

  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err);
};

// const addOrderDetails = function (order_id, menu_array) {

//   const queryString = `
//     INSERT INTO order_details (order_id, menu_id)
//     VALUES ($1, $2)
//   `
//   let ans;
//   for (let item of menu_array) {
//     let queryParams = [order_id, item];

//     ans = pool.query(queryString, queryParams)
//       .then((result) => result.rows)
//       .catch((err) => err);
//     }
//     return ans;
// }

const addOrderDetail = function (order_id, menu_id) {
  const queryString = `
    INSERT INTO order_details (order_id, menu_id)
    VALUES ($1, $2)
  `
  const queryParams = [order_id, menu_id];

  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err);
}
// This is used to fetch the data from database and show them to the shopping cart, so user
// know what they have ordered
const getOrderDetailsByOrderId = function (order_id) {
  const queryString = `
  SELECT orders.id AS order_id, customers.name AS client, menus.name, menus.image_url, count(menus.name) as quantity, Sum(menus.price) AS price
  FROM order_details JOIN menus
  ON order_details.menu_id = menus.id
  JOIN orders
  ON order_details.order_id = orders.id
  JOIN customers
  ON orders.customer_id = customers.id
  WHERE order_id = $1
  GROUP BY orders.id, menus.name, menus.image_url, customers.phone, customers.name;
  `;

  const queryParams = [order_id];

  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err);
}

// This is used to display the total_price for the order
const getOrdersPrice = function (order_id) {
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
const getOrderHistories = function (customer_id) {
  const queryString = `
  SELECT customers.id, customers.name AS customer_name,  orders.id AS order_id, SUM(menus.price) AS total_price,  orders.order_time
  FROM order_details
  JOIN menus ON menu_id = menus.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE customer_id = $1
  GROUP BY orders.id, customers.id
  Order BY orders.id DESC;
  `;

  const queryParams = [customer_id];

  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err);
}

const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT *
      FROM customers
      WHERE customers.id = $1
      `, [id]
    )
    .then((result) => result.rows[0] || null)
    .catch((err) => {
      console.log(err.message);
    });
}

const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT *
      FROM customers
      WHERE customers.email = $1
      `, [email]
    )
    .then((result) => result.rows[0] || null)
    .catch((err) => {
      console.log(err.message);
    });
}

const getOrdersByOrderID = (order_id) => {
  console.log("database order_id:", order_id)
  return pool.query(`SELECT customers.phone ,
                     customers.name AS client ,
                     menus.name, count(menus.name) as quantity
                     FROM order_details JOIN menus
                     ON order_details.menu_id = menus.id
                     JOIN orders
                     ON order_details.order_id = orders.id
                     JOIN customers
                     ON orders.customer_id = customers.id
                     WHERE order_id = $1
                     GROUP BY menus.name, customers.phone, customers.name;`, [order_id])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = {
  getCustomers,
  menuItems,
  addCustomer,
  addOrder,
  addOrderDetail,
  getOrderDetailsByOrderId,
  getOrdersPrice,
  getOrderHistories,
  getUserWithId,
  getUserWithEmail,
  getOrdersByOrderID,
  // addOrderDetails

}
