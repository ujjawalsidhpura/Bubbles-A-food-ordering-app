
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



module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        const user = verifyUser(users, email, password);
        if (user) {
          req.session.user_id = user.id;
          res.send("Logged in!");
        } else {

        }
      })
      .catch(err => {
        res
          .send('Incorrect credentials')
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

const verifyUser = (users, email, password) => {
  const user = getUserByEmail(users, email)

  if (!user) {
    console.log("no user");
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    console.log("Incorrect password");
    return;
  }

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
