
// $(() => {

//   $('#order-submit-btn').on('click', function () {
//     sendSMS();
//   })

// })

const sendSMS = function () {
  // Import Twilio auth credentials from .env  //
  require('dotenv').config({ path: '../../.env' });
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const sms = require('twilio')(accountSid, authToken);


  sms.messages
    .create({
      body: `An order has been placed from ABC. Order is ABC.`,
      from: '+13433125653', // Twilio num for Restaurant
      to: '+12048089972'
    })
    .then(message => console.log('Message ID', message.sid));
}

sendSMS();


