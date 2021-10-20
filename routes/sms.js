// Import Twilio auth credentials from .env  //
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);

const sendSMS = function (data) {

  const twilioNum = '+13433125653';
  const restaurantOwnerNum = '+12048089972';
  const messageToOwner = orderMessageMaker(data);
  const messageToClient = clientMessageMaker(data);
  const clientNum = data[0].phone;
  const clientName = data[0].client;


  // 1. Send Message to Owner giving order details and client name
  sms.messages
    .create({
      body: messageToOwner,
      from: twilioNum,
      to: restaurantOwnerNum
    })
    .then(message => console.log('Message ID', message.sid))
    .then(() => {

      setTimeout(function () {

        sms.messages
          .create({
            body: messageToClient,
            from: twilioNum,
            to: clientNum
          })
          .then(message => console.log('Message ID', message.sid))

      }, 2000); //Change this timeout to 5 seconds later

    })
}

module.exports = sendSMS;


// Helper To Frame a message //
const orderMessageMaker = function (data) {
  const clientName = data[0].client;
  let message = `An order placed by: ${clientName}. Order details:`;
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
    message += `${count[item]} ${item} `
  }

  return message;
}

const clientMessageMaker = function (data) {
  const clientName = data[0].client;
  return `Hello ${clientName}, Thank you for placing an order at Bubbles. Your order should be ready in approximately 15 minutes.`
}

