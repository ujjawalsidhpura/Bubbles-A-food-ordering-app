$(document).ready(function() {
  $(".fa-shopping-cart").click(function(){
    // $(".menu-container").addClass("menu-container-blur");
    // $(".container").click(function(){
    //   $(".menu-container").removeClass("menu-container-blur");
    // })
    $(".cover").show();
    $("#my-cart").removeClass("my-cart").addClass("my-cart-flex");
  })

  $("#my-cart-exit").click(function(){
    $(".cover").hide();
    $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
  })
});
