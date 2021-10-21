// Import Twilio auth credentials from .env  / /
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);

const sendSMS = function (data) {

  // Helper To Frame a message //
  const orderMessageMaker = function (data) {
    const clientName = data[0].client;
    let message = `An order placed by: ${clientName}. Order details:`;

    for (let item of data) {
      message += ` ${item.name} : ${item.quantity} `
    }

    return message;
  }

  const clientMessageMaker = function (data) {
    const clientName = data[0].client;
    let quantity = 0;
    let time;

    for (let item of data) {
      quantity += parseInt(item.quantity)
    }

    if (quantity <= 5) {
      time = 10;
    } else if (quantity > 5 && quantity <= 10) {
      time = 20;
    } else if (quantity > 10 && quantity <= 15) {
      time = 25;
    } else {
      time = 30;
    }

    return `Hello ${clientName}, Thank you for placing an order at Bubbles. Your order should be ready in approximately ${time} minutes.`
  }

  const twilioNum = '+13433125653';
  const restaurantOwnerNum = '+12048089972';
  // '+15197817563' //
  const messageToOwner = orderMessageMaker(data);
  const messageToClient = clientMessageMaker(data);
  const clientNum = data[0].phone;
  console.log("client number:", clientNum)

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

      }, 5000);

    })
}

module.exports = sendSMS;


