const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  path: '/',
  keys: ['This is a key that Im using to encrypt', '$!2@as125AF42%^&*'],
  maxAge: 24 * 60 * 60 * 1000
}))

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    res.send('Logged out')
  });
  return router;
};
