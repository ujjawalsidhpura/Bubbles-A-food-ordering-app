// Import Twilio auth credentials from .env  //
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);

const sendSMS = function (data) {

  const message = messageMaker(data);

  sms.messages
    .create({
      body: `${message}`,
      from: '+13433125653', // Twilio num for Restaurant
      to: '+12048089972'
    })
    .then(message => console.log('Message ID', message.sid));
}

module.exports = sendSMS;

// Helper To Frame a message //
const messageMaker = function (data) {
  let message = 'An order has been placed for:';
  let array = []
  let result = []
  let count = {}

  for (let eachItem of data) {
    array.push(eachItem.name)
  }

  array.forEach(item => {
    if (count[item]) {
      count[item] += 1
      return
    }
    count[item] = 1
  })

  for (let prop in count) {
    if (count[prop] >= 2) {
      result.push(prop)
    }
  }

  for (let item in count) {
    message += `* ${count[item]} ${item} *`
  }

  return message;
}



