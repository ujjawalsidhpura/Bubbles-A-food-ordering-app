// for (let eachItem of data) {
//   array.push(eachItem.name)
// }

// array.forEach(item => {
//   if (count[item]) {
//     count[item] += 1
//     return
//   }
//   count[item] = 1
// })


export const add_drop_button_event = function(){
  const array = [];
  $("button.add-button").click(function(){
    const createCartItem = function (cartItem) {
      const $cartItem = `
      <div class="card">
        <span class="description"><b>Description: </b>${cartItem.name} </span>
        <span class="ingredients"><b>Ingredients: </b>${cartItem.price} </span>
        <span class = "my-cart-quantity"><b>Quantity: </b>1</span>
      </div>
    `
      return $cartItem
    }

    let this_item = $(this).closest(".card-content").find(".title").text();

    const renderCart = function(carts_data) {
      let $cartItem;

      for (const cartItem of carts_data) {
         if(cartItem.name === this_item){
            array.push(cartItem.id);
            $cartItem = createCartItem(cartItem);
            $("#my-cart").append($cartItem);
         }
      }
      console.log(array);
      }

    $.ajax({
      url: '/api/menus',
      method: "GET",
      dataType: "json",
      success: (menus) => {
        renderCart(menus);
      },

      error: (err) => {
        alert(`there was an error ${err}`);
      }
    });

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
     let price = Number($(this).parent().siblings(".cost").text().slice(19));
     let total_price = Number($(".total-price-value").text());
     total_price += price;
     $(".total-price-value").text(total_price.toFixed(2))
     $(".total-price").css("visibility","visible")
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

     let price = Number($(this).parent().siblings(".cost").text().slice(19));
     let total_price = Number($(".total-price-value").text());
     total_price -= price;
     $(".total-price-value").text(total_price.toFixed(2))
     if (total_price === 0){
      $(".total-price").css("visibility","hidden")
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
