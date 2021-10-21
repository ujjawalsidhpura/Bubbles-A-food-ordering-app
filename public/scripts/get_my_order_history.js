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


  const createOrderHistoryItem = (orderHistoryItem) => {
    // Create html for each json in the menus table of the database
    const $orderHitoryItem = `
    <div class="order-history-card card" style = "width: 80%">
         <span class="history-id"><b>Customer Name: </b>${orderHistoryItem.customer_name} </span>
          <span class="history-id"><b>Order History ID: </b>${orderHistoryItem.order_id} </span>
          <span class="history-total-price"><b>Total Price: $</b>${orderHistoryItem.total_price} </span>
          <span class="history-total-price"><b>Order Time: </b>${orderHistoryItem.order_time.slice(0,10) + " " + orderHistoryItem.order_time.slice(11,19)} </span>
    </div>
    <button>View Details</button>
    `
    return $orderHitoryItem;
  };

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
  }

  const getMyOrderHistory = () => {
    // call the renderMenus function by ajax get /api/menus which loads our menus table
    $.ajax({
      url: '/api/order-history',
      method: "GET",
      dataType: "json",
      success: (menus) => {
        renderOrderHistory(menus);
      },

      error: (err) => {
        alert(`there was an error ${err}`);
      }
    });
  };
}

