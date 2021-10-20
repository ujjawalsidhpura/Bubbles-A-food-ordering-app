const sendSMS = require('../routes/sms')

module.exports = function (router, database) {
  router.get("/menus", (req, res) => {
    database.menuItems()
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/customers", (req, res) => {
    database.getCustomers()
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/orders/:id', (req, res) => {

    const order_id = req.params.id
    database.getOrdersByOrderID(order_id)
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post('/orders', (req, res) => {
    const orderItems = req.body.menu_array
    const customer_id = req.session.userId;
    const time = new Date();
    let order_id;

    database.addOrder(customer_id, time)
      .then(data => {
        order_id = data[0].id
        console.log('menu:', orderItems);

        //list of promises that needs to resolve before sms is sent
        let promiseArray = orderItems.map((item) => {
          return database.addOrderDetail(order_id, item)
        })

        Promise.all(promiseArray)
          .then(() => {
            console.log(order_id)
            database.getOrdersByOrderID(order_id)
              .then(data => {
                console.log("sms data:", data)
                sendSMS(data);
              })


          })

        return res.send(orderItems)

      })

  })

  return router;

}
