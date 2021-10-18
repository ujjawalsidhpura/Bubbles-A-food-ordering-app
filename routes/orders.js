
const express = require('express');
const sendSMS = require('./sms');
const router = express.Router();

module.exports = () => {


  router.post('/', (req, res) => {
    sendSMS();
  })
  return router;
};
