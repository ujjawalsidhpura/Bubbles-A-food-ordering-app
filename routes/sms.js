// Import Twilio auth credentials from .env  //
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);

const sendSMS = function (data) {

  const messageToOwner = orderMessageMaker(data);
  const clientNum = data[0].phone; // Get Client's number from data
  const clientName = data[0].client;
  console.log(clientName)

  sms.messages
    .create({
      body: `${messageToOwner}`, // Order details
      from: '+13433125653', // Twilio num for Restaurant
      to: '+12048089972' // Restaurant owner's number
    })
    .then(message => console.log('Message ID', message.sid))
    .then(() => {

      setTimeout(function () {

        sms.messages
          .create({
            body: `Thank you ${clientName} for placing an order. You order will be ready in 20 minutes`, // Confirmation with time.
            from: '+13433125653',
            to: clientNum // Client Number
          })
          .then(message => console.log('Message ID', message.sid))

      }, 2000); //Change this timeout to 5 seconds later

    })
}

module.exports = sendSMS;


// Helper To Frame a message //
const orderMessageMaker = function (data) {
  const clientName = data[0].client;
  let message = `${clientName} has placed an order.Order is :`;
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



