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
    const orderItems = req.body.menu_array;
    const customer_id = req.session.userId;
    const time = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});    ;
    let order_id;

    /* Order of Events that happen on 'place order'*/
    // 1. Add new entry in 'orders' table using customer_id. This shall give a uniqure order_id (which is PK of orders)
    // 2. Then inject order_id-menu_id key:value pairs in order_details table.
    // 3. Since all funcs are async, final func will wait for step 2 to finish all promise and then it will execute
    // 4. It will query out the recently placed order gtom db using order_id and send out sms

    database.addOrder(customer_id, time)
      .then(data => {
        order_id = data[0].id

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

  router.get("/order-history", (req, res) => {
    const customer_id = req.session.userId;
    if (customer_id) {
      database.getOrderHistories(customer_id)
              .then(data => {
                console.log("order-history:", data);
                return res.send(data);
              })
              .catch(err => {
                console.log(err);
              });
    }
  })

  return router;

}
