export const order_history_event = function(){
  $(".order-history").on("click", function () {
    $(".cover").show();
    $("#my-history").removeClass("my-history").addClass("my-history-flex");
    console.log("clicked");
    getMyOrderHistory();
    $("#menu-container").addClass("menu-container-hide").removeClass("menu-container")
  })

  $("#my-history-exit").on("click", function(){
    $(".cover").hide();
    $("#my-history").addClass("my-history").removeClass("my-history-flex");
    $("#menu-container").addClass("menu-container").removeClass("menu-container-hide")
  })



  $("#my-order-detail-exit").on("click", function(){
    $(".cover").hide();
    $("#my-history").addClass("my-history-flex").removeClass("my-history");
    $("#my-order-detail").removeClass("my-order-detail-flex").addClass("my-order-detail");
    $(".order-detail-card").remove();
  })

  const createOrderHistoryItem = (orderHistoryItem) => {
    // Create html for each json in the menus table of the database
    const $orderHitoryItem = `
    <div class="order-history-card card" style = "width: 80%">
         <span class="history-name"><b>Customer Name: </b>${orderHistoryItem.customer_name} </span>
          <span class="history-id"><b>Order History ID: </b>${orderHistoryItem.order_id} </span>
          <span class="history-total-price"><b>Total Price: $</b>${orderHistoryItem.total_price} </span>
          <span class="history-order-time"><b>Order Time: </b>${orderHistoryItem.order_time.slice(0,10) + " " + orderHistoryItem.order_time.slice(11,19)} </span>
    </div>
    `

    $(".order-history-card").on("click", function () {
      $(".cover").show();
      $("#my-history").removeClass("my-history-flex").addClass("my-history");
      $("#my-order-detail").removeClass("my-order-detail").addClass("my-order-detail-flex");
      // $("#menu-container").addClass("menu-container-hide").removeClass("menu-container")
    })

    return $orderHitoryItem;
  };

  const createOrderDetail = (order_detail) => {
    const $order_detail = `
    <div class="order-detail-card card" style = "width: 80%">
        <span class="detail-image"> <img style = "max-width: 100px" src=${order_detail.image_url}> </span>
         <span class="detail-name"><b>Name: </b>${order_detail.name} </span>
          <span class="detail-quantity"><b>Quantity: </b>${order_detail.quantity} </span>
          <span class="detail-total-price"><b>Price: $</b>${order_detail.price} </span>
    </div>
    `

    return $order_detail;
  };

  const renderOrderDetails = function(order_details) {
    // Loop through the menus table of the databse and then call createMenuItem for each menuItem
    for (const order_detail of order_details) {
      const $orderDetail = createOrderDetail(order_detail);
      $("#my-order-detail").append($orderDetail);
      $(".order-detail-card").on("mouseenter", function() {
        $(this).css("box-shadow", "10px 5px 5px #60a3bc");
        $(this).css("width", "60%")
      });

      $(".order-detail-card").on("mouseleave", function() {
        $(this).css("box-shadow", "none");
        $(this).css("width", "80%")
      });
    }
  }

  const renderOrderHistory = function(order_history_data) {
    // Loop through the menus table of the databse and then call createMenuItem for each menuItem
    for (const orderHistoryItem of order_history_data) {
      const $orderHistoryItem = createOrderHistoryItem(orderHistoryItem);
      $("#my-history").append($orderHistoryItem);
      $(".order-history-card").on("mouseenter", function() {
        $(this).css("box-shadow", "10px 5px 5px #60a3bc");
        $(this).css("width", "60%")
      });

      $(".order-history-card").on("mouseleave", function() {
        $(this).css("box-shadow", "none");
        $(this).css("width", "80%")
      });
    }
    $(".order-history-card").on("click", function(){
      const order_id = Number($(this).find(".history-id").text().slice(18));
      console.log(order_id);
      sendOrderID(order_id)
                    .then(order_details => {
                      console.log(order_details);
                      renderOrderDetails(order_details);
                    })
    })
  }

  const getMyOrderHistory = () => {
    // call the renderMenus function by ajax get /api/menus which loads our menus table
    $.ajax({
      url: '/api/order-history',
      method: "GET",
      dataType: "json",
      success: (orders) => {
        renderOrderHistory(orders);
      },

      error: (err) => {
        alert(`there was an error ${err}`);
      }
    });
  };

}


