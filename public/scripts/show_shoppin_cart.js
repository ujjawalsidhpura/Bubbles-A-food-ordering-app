$(document).ready(function() {
  // Show the items inside the shopping cart when click on the shopping cart
  $(".fa-shopping-cart").on("click", function () {

    $(".cover").show();
    $("#my-cart").removeClass("my-cart").addClass("my-cart-flex");
    $("#menu-container").addClass("menu-container-hide").removeClass("menu-container")
  })

  // close the shopping cart and show the menus when click on the exit button
  $("#my-cart-exit").on("click", function(){
    $(".cover").hide();
    $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
    $("#menu-container").addClass("menu-container").removeClass("menu-container-hide")
  })
});

