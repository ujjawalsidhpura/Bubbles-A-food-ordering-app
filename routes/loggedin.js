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

  });
  return router;
};
