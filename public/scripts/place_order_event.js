$('#order-submit-btn').on('click', function () {
  $(".total-price-value").text("0.00");
  $(".shopping-cart-counter").text(0);
  $(".shopping-cart-counter").css("visibility","hidden");
  $(".quantity").text(0)
  $(".quantity").css("visibility","hidden");
  $(".drop-button").css("visibility","hidden");
  $("#my-cart").empty();
  $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);
  $("#my-cart-exit").click(function(){
  $(".cover").hide();
  $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
  })
})
