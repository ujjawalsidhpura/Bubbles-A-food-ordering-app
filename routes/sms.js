// Import Twilio auth credentials from .env in root dir //
require('dotenv').config({ path: '../.env' });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initilize client (OR sms) //
const sms = require('twilio')(accountSid, authToken);

/**  Code Below for 'testObject' will be changed later, once order input object is established **/

const testObject = {
  user_name: 'vlad',
  user_number: '+16478302809',
  order_item: 'matcha tea'
}

const sendSMS = (obj) => {

  const bubbleTeaStoreNum = '+13433125653'; // Do not alter //

  sms.messages
    .create({
      body: `Thank you ${obj.user_name} for placing an order.Your item ${obj.order_item} will be ready in X minutes`,
      //
      from: bubbleTeaStoreNum,
      to: obj.user_number
    })
    .then(message => console.log('Message ID', message.sid));
}

sendSMS(testObject);

