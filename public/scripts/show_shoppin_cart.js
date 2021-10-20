$(document).ready(function() {
  $(".fa-shopping-cart").click(function(){
    // $(".menu-container").addClass("menu-container-blur");
    // $(".container").click(function(){
    //   $(".menu-container").removeClass("menu-container-blur");
    // })
    $(".cover").show();
    $("#my-cart").removeClass("my-cart").addClass("my-cart-flex");
  })
});
