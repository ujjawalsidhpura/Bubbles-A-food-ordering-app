// Import Twilio auth credentials from .env  //
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);

const sendSMS = function () {

  sms.messages
    .create({
      body: `An order has been placed for matcha tea.Reply yes for an update`,
      from: '+13433125653', // Twilio num for Restaurant
      to: '+15197817563'
    })
    .then(message => console.log('Message ID', message.sid));
}

module.exports = sendSMS;


