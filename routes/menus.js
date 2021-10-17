/*
 * All routes for Menus are defined here
 * Since this file is loaded in server.js into api/menus,
 *   these routes are mounted onto /menus
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menus;`)
      .then(data => {
        const menus = data.rows;
        res.json(menus);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
