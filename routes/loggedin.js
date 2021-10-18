const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    let identity = req.session.user_id;
    console.log(identity)
    if (!identity) {
      const templateVars = {
        "user_id": identity
      };
      return res.render("index", templateVars);
    }
    const templateVars = {
      "user_id": identity
    };
    return res.render("index", templateVars);

    // db.query(`
    // SELECT *
    // FROM customers
    // WHERE id = $1;`, [identity])
    //   .then(data => {
    //     // const users = data.rows;
    //     // const user = verifyUser(users, email, password);
    //     const user = data.rows[0];
    //     const templateVars = {
    //       "user_id": user.id
    //     };
    //     res.render("index", templateVars);
    //     // console.log(data.rows)
    //     // if (!user) {
    //     //   console.log("no user");
    //     //   return res.status(404).send({message: 'Email does not exist'})
    //     // }

    //     // if (!bcrypt.compareSync(password, user.password)) {
    //     //   console.log("Incorrect password");
    //     //   return res.status(404).send({message: 'Incorrect password'})
    //     // }

    //     // req.session.user_id = user.id;
    //     // return res.send("Logged in!");
    //     // // addError('Incorrect Credentials')

    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .send({ error: err.message })

    //   });


  });
  return router;
};
