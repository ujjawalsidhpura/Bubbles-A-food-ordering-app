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
    console.log(req.body);
    const customer_id = req.session.userId;

    const time = new Date();

    database.addOrder(customer_id, time)
              .then(data => {
                console.log(data);
                return res.send(data);
              })
              .catch(err => {
                res
                  .status(500)
                  .json({ error: err.message });
              });



    // const order_id = req.body.order_id;

    // database.getOrdersByOrderID(order_id)
    //   .then(data => {

    //      sendSMS(data);
    //   })

  })



  return router;


}
