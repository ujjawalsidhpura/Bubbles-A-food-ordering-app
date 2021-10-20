
$(() => {

  $('#order-submit-btn').on('click', function (event) {
    event.preventDefault();

    // ORDER and customer DET//INSERT AILS into DB AND THEN-->


    $.post('/api/orders', { order_id: 3 })

  })

})



