/*
 * All routes for Menus are defined here
 * Since this file is loaded in server.js into api/menus,
 *   these routes are mounted onto /menus
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.use(cookieSession({
  name: 'session',
  keys: ['This is a key that Im using to encrypt', '$!2@as125AF42%^&*'],
}))



module.exports = (db) => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.session.user_id)
    console.log(email)
    console.log(password)
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        console.log(users)
        const user = login(users, email, password)
        if (user) {
          console.log(user.id)
          req.session.user_id = user.id;
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

const login = (users, email, password) => {
  const user = getUserByEmail(users, email)
  console.log(user)

  if (!user) {
    console.log("no user")
    return;
  }
  // if (!bcrypt.compareSync(password, user.password)) {
  //   res.status(403);
  //   res.send("Incorrect password. <a href = '/login'>Go Back!</a>");
  //   return;
  // }
  console.log('getting here')
  return user
}

const getUserByEmail = (userObj, email) => {
  for (let user in userObj) {
    if (userObj[user].email === email) {
      return userObj[user];
    }
  }
  return undefined;
};
