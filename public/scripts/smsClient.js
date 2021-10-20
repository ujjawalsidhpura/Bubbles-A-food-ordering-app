
$(() => {

  $('#order-submit-btn').on('click', function (event) {
    event.preventDefault();

    //INSERT ORDER and customer DETAILS into DB AND THEN-->


    placeOrder([1, 2, 3]);

    // getOrder()
    //         .then()
    //$.post('/api/orders', { order_id: 3 })

  })

})



