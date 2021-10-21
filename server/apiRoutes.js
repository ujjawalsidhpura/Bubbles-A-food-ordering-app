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

    // const test = async() => {
    //   await Promise.resolve(
    //     database.addOrder(customer_id, time)
    //             .then(data => {
    //               order_id = data[0].id
    //               // console.log('menu:', orderItems);

    //               for (let item of orderItems) {
    //                 database.addOrderDetail(order_id, item)
    //               }

    //               // return res.json({ order_id: order_id });
    //               return res.send(orderItems)

    //             })
    //   )
    // }
    // test()
    // .then(() =>{
    //   console.log(order_id)
    //   database.getOrdersByOrderID(order_id)
    //     .then(data => {
    //       console.log("sms data:", data)
    //       // sendSMS(data);
    //     })
    //   // console.log(orders)

    // })
    database.addOrder(customer_id, time)
              .then(data => {
                order_id = data[0].id
                // console.log('menu:', orderItems);

                for (let item of orderItems) {
                  database.addOrderDetail(order_id, item)
                }

                return res.send({ order_id: order_id });
                // return res.send(orderItems)

              })
              .then(() =>{
                console.log(order_id)
                database.getOrdersByOrderID(order_id)
                  .then((data) => {
                    console.log("sms data:", data)
                    // sendSMS(data);
                  })
                // console.log(orders)

              })
              // .catch(err => {
              //   res
              //     .status(500)
              //     .json({ error: err.message });
              // })




    // const order_id = req.body.order_id;

    // database.getOrdersByOrderID(order_id)
    //   .then(data => {

    //      sendSMS(data);
    //   })

  })



  return router;


}
