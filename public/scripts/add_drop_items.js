export const add_drop_button_event = function(){

  $("button.add-button").click(function(){
    let quantity = $(this).siblings(".quantity").text();
    quantity ++;
    $(this).siblings(".quantity").css("visibility","visible");
    $(this).siblings(".drop-button").css("visibility","visible");

    $(this).siblings(".quantity").text(quantity);

    $(this).closest(".card-content")
           .siblings(".card-image")
           .find("img")
           .clone()
           .addClass("zoom-add")
           .appendTo(".shopping-cart")
     setTimeout(function(){
       $(".zoom-add").remove();
     }, 500);

     let counter = $(".shopping-cart-counter").text();
     counter ++;
     $(".shopping-cart-counter").text(counter);
     $(".shopping-cart-counter").css("visibility","visible");
  });

  $("button.add-button").mousedown(function(){
    $(this).siblings(".quantity").removeClass("quantity").addClass("quantity-add");
    $(".shopping-cart-counter").removeClass("shopping-cart-counter").addClass("shopping-cart-counter-add")
  })

  $("button.add-button").mouseup(function(){
    $(this).siblings(".quantity-add").removeClass("quantity-add").addClass("quantity");
    $(".shopping-cart-counter-add").removeClass("shopping-cart-counter-add").addClass("shopping-cart-counter")
  })

  $("button.drop-button").click(function(){
    let quantity = $(this).siblings(".quantity").text();
    if(quantity > 0){
      quantity --;
      $(this).siblings(".quantity").text(quantity);

      if (quantity === 0) {
        $(this).css("visibility","hidden");
        $(this).siblings(".quantity").css("visibility","hidden");
      }

      $(this).closest(".card-content")
           .siblings(".card-image")
           .find("img")
           .clone()
           .addClass("zoom-drop")
           .appendTo(".shopping-cart")
     setTimeout(function(){
       $(".zoom-drop").remove();
     }, 500);

     let counter = $(".shopping-cart-counter").text();
     counter --;
     $(".shopping-cart-counter").text(counter);
     if (counter === 0) {
      $(".shopping-cart-counter").css("visibility","hidden");
     }
    }

  })

  $("button.drop-button").mousedown(function(){
    $(this).siblings(".quantity").removeClass("quantity").addClass("quantity-drop");
    $(".shopping-cart-counter").removeClass("shopping-cart-counter").addClass("shopping-cart-counter-drop")
  })

  $("button.drop-button").mouseup(function(){
    $(this).siblings(".quantity-drop").removeClass("quantity-drop").addClass("quantity");
    $(".shopping-cart-counter-drop").removeClass("shopping-cart-counter-drop").addClass("shopping-cart-counter")
  })

  $(".quantity").on("mouseenter", function() {
    $(this).removeClass("quantity").addClass("quantity-hover");
  });

  $(".quantity").on("mouseleave", function() {
    $(this).removeClass("quantity-hover").addClass("quantity");
  });

  $(".card").on("mouseenter", function() {
    $(this).css("box-shadow", "10px 5px 5px #60a3bc");
    const tweets_footer = $(this).children(".card-footer");
    tweets_footer.css("box-shadow", "0px 10px #60a3bc");
  });

  $(".card").on("mouseleave", function() {
    $(this).css("box-shadow", "none");
    const tweets_footer = $(this).children(".card-footer");
    tweets_footer.css("box-shadow", "none");
  });
}
