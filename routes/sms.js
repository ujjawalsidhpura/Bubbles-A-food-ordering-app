// Import Twilio auth credentials from .env  //
require('dotenv').config({ path: '../.env' });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sms = require('twilio')(accountSid, authToken);

/* Code Below in the box is temp and will change later when input routes and admin route to decide time for an order is establishes **/

const testObject = {
  user_name: 'John Doe',
  user_number: '+12048089972',
  order_item: 'matcha tea'
}

/***********************************************************/

const sendSMS = (obj) => {

  const bubbleTeaStoreNum = '+13433125653'; // Do not alter //

  sms.messages
    .create({
      body: `Thank you ${obj.user_name} for placing an order.Your item ${obj.order_item} will be ready in X minutes`,
      from: bubbleTeaStoreNum,
      to: obj.user_number
    })
    .then(message => console.log('Message ID', message.sid));
}

sendSMS(testObject);

