$(document).ready(function() {
  $(".fa-shopping-cart").click(function(){

    $(".cover").show();
    $("#my-cart").removeClass("my-cart").addClass("my-cart-flex");
  })

  $("#my-cart-exit").click(function(){
    $(".cover").hide();
    $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
  })
});
