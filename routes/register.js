const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const getUserByEmail = (emails, email) => {
  for (let user of emails) {
    if (user.email === email) {
      return user.email;
    }
  }
  return undefined;
};

module.exports = (db) => {
  router.post("/", (req, res) => {
    const customer = req.body;
    const {name, phone, email, password, address} = customer;
    if (!name || !password || !email || !password || !address) {
      return res.status(400).send('User values required')
    }
    const hashpass = bcrypt.hashSync(password, salt);
    const queryParams = [name, phone, email, hashpass, address];
    const queryString = `
    INSERT INTO customers (name, phone, email, password, address)
    VALUES ($1, $2, $3, $4, $5);
    `;
    db.query(`
    SELECT email
    FROM customers
    `)
      .then(data => {
        const users = data.rows;
        const user = getUserByEmail(users, email)
        if (user) {
          console.log('User exists')
          return res.status(404).send({message: 'Email already in use'})
        }
        db.query(queryString, queryParams)
        .then(data => {
          req.session.user_id = users.length;
          res.send('Worked')
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      })
  });
  return router;
};


