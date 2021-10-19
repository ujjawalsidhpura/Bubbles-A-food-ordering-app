
$(() => {

  $('#order-submit-btn').on('click', function (event) {
    event.preventDefault();

    //INSERT ORDER and customer DETAILS into DB AND THEN-->

    $.post('/api/orders', { order_id: 3 })

  })

})
