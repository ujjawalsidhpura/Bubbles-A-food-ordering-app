export const order_history_event = function(){
  $(".order-history").on("click", function () {
    console.log("clicked");
    $(this).css("background-color", "red");
    // getMyOrderHistory();
  })
}

