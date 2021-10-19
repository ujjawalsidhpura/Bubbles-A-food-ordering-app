const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = (db) => {


  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).send('Email and password required')
    }
    console.log('Querying database')
    db.query(`
    SELECT *
    FROM customers
    WHERE email = $1;`, [email])
      .then(data => {
        const user = data.rows[0];
        console.log(data.rows)
        if (!user) {
          console.log("no user");
          return res.status(404).send({message: 'Email does not exist'})
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log("Incorrect password");
          return res.status(404).send({message: 'Incorrect password'})
        }
        req.session.user_id = user.id;
        return res.send("Logged in!");
      })
      .catch(err => {
        res
          .status(500)
          .send({ error: err.message })
      });
  });
  return router;
};
