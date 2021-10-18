
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.use(cookieSession({
  name: 'session',
  path: '/',
  keys: ['This is a key that Im using to encrypt', '$!2@as125AF42%^&*'],
  maxAge: 24 * 60 * 60 * 1000
}))

const getUserByEmail = (userObj, email) => {
  for (let user in userObj) {
    if (userObj[user].email === email) {
      return userObj[user];
    }
  }
  return undefined;
};

module.exports = (db) => {
  router.post("/", (req, res) => {
    const customer = req.body;
    const {name, phone, email, password, address} = customer;
    const hashpass = bcrypt.hashSync(password, salt);
    const queryParams = [name, phone, email, hashpass, address];
    const queryString = `
    INSERT INTO customers (name, phone, email, password, address)
    VALUES ($1, $2, $3, $4, $5);
    `;
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        const user = getUserByEmail(users, email);
        if (user) {
          // req.session.user_id = user.id;
          // res.send("Logged in!");
          console.log('User exists')
        } else {
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
        }
      })
  });

  return router;
};


