// const express = require('express');
// const dbParams = require('../lib/db');
// const sendSMS = require('./sms');
// const router = express.Router();


// module.exports = (db) => {

//   router.get('/:id', (req, res) => {

//     db.query(`SELECT customers.phone ,
//               customers.name AS client ,
//               menus.name
//               FROM order_details JOIN menus
//               ON order_details.menu_id = menus.id
//               JOIN orders
//               ON order_details.order_id = orders.id
//               JOIN customers
//               ON orders.customer_id = customers.id
//               WHERE order_id = $1;`, [req.params.id])
//       .then(data => {
//         res.json(data.rows);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   })

//   router.post('/', (req, res) => {

//     order_id = req.body.order_id;

//     db.query(`SELECT customers.phone,
//               customers.name AS client,
//               menus.name
//               FROM order_details JOIN menus
//               ON order_details.menu_id = menus.id
//               JOIN orders
//               ON order_details.order_id = orders.id
//               JOIN customers
//               ON orders.customer_id = customers.id
//               WHERE order_id = $1;`, [order_id])
//       .then(data => {
//         sendSMS(data.rows);
//       })

//   })
//   return router;
// };



