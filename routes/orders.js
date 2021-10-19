const express = require('express');
const dbParams = require('../lib/db');
const sendSMS = require('./sms');
const router = express.Router();


module.exports = (db) => {

  router.get('/:id', (req, res) => {

    db.query(`SELECT order_id, menu_id,name
              FROM order_details JOIN menus
              ON order_details.menu_id = menus.id
              WHERE order_id = $1;`, [req.params.id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post('/', (req, res) => {

    order_id = req.body.id

    db.query(`SELECT name
              FROM order_details JOIN menus
              ON order_details.menu_id = menus.id
              WHERE order_id = $1;`, [order_id])
      .then(data => {
        sendSMS(data.rows);
      })

  })
  return router;
};
