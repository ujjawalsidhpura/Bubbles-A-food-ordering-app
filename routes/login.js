/*
 * All routes for Menus are defined here
 * Since this file is loaded in server.js into api/menus,
 *   these routes are mounted onto /menus
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const cookieSession = require('cookie-session');
const express = require('express');
const router = express.Router();

router.use(cookieSession({
  name: 'session',
  keys: ['This is a key that Im using to encrypt', '$!2@as125AF42%^&*'],
}))

module.exports = (db) => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        user = getUserByEmail(users, email);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    // if (getUserByEmail())
    // db.query(`SELECT email FROM customers;`)
    //   .then(data => {
    //     const emails = data.rows;
    //     console.log(req)
    //     res.json(emails);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });
  return router;
};


const getUserByEmail = (userObj, email) => {
  for (let user in userObj) {
    if (userObj[user].email === email) {
      return userObj[user];
    }
  }
  return undefined;
};
