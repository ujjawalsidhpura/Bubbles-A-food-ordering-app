// This file controls all the event handlers related with add/drop button
// and the place order button
export const add_drop_button_event = function(){
  // This is the initialization for the array which will be sent to place order ajax function
  let array = [];

  // This is the initialization for the object will will be changed every time add/drop items
  let object = {};

  // All the event handlers when click the ADD button
  $("button.add-button").click(function(){

    // create html for each item that will show up in the shopping cart
    const createCartItem = function (object) {

      // append the exit button because the form will be emptied and re-rendered every time
      // we click add/drop button
      $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);

      // enable exit button
      // because we need to enable it every time after it was emptied and re-appended
      /*
      We can create a helper function for this
      */
      $("#my-cart-exit").click(function(){
        $(".cover").hide();
        $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
      })

      let cart_total_price = 0;
      // render the html for each object in the object,
      // which will be shown when click the shoppin cart
      for (const eachObject in object) {
        const $cartItem = `
        <div class="card" style = "width: 80%">
          <span class="cart-image"> <img style = "max-width: 100px" src=${object[eachObject].image_url}> </span>
          <span class="cart-name"><b>Name: </b>${object[eachObject].name} </span>
          <span class="cart-price"><b>Price: </b>${object[eachObject].price} </span>
          <span class = "my-cart-quantity"><b>Quantity: </b>${object[eachObject].quantity}</span>
          <span class="cart-price"><b>Sum: </b>${(object[eachObject].price * object[eachObject].quantity).toFixed(2)} </span>
        </div>
      `
        cart_total_price += object[eachObject].price * object[eachObject].quantity;
        $("#my-cart").append($cartItem);
      }
      cart_total_price = cart_total_price.toFixed(2);
      $("#my-cart").append(`<span class = "cart-total-price">Total Price: ${cart_total_price}</span>`)
    }

    // Find the tilte of "this" (or current) card where we click the add button
    let this_item = $(this).closest(".card-content").find(".title").text();

    // If the object contains the item, increment the quantity, otherwise add this to the object
    if (object[this_item]){
      object[this_item].quantity += 1;
    } else {
     object[this_item] = {
       quantity: 1
     };
    }

    // render the entire shopping cart
    const renderCart = function(carts_data) {
      // empty the shopping cart everytime we call the renderCart function
      $("#my-cart").empty();

      // loop through the ajax json form (which comes from menus table in our databases)
      for (const cartItem of carts_data) {
        // if the title of this card matches the item in the menus
        // add the id of this menu item to the array
        // also add the properties of this menu item to the object
         if(cartItem.name === this_item) {
            array.push(cartItem.id);
            const quantity = object[this_item].quantity;
            object[this_item] = {name: cartItem.name, image_url: cartItem.image_url,
              price : cartItem.price, quantity};
         }
      }
      createCartItem(object);
      }

    // ajax function to get the menus table

    /*
    Might want to move it to the network.js
    */
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

    // Get the current value of the quantity
    let quantity = $(this).siblings(".quantity").text();

    // Increament quantity and replace the current value by it
    quantity ++;
    $(this).siblings(".quantity").css("visibility","visible");
    $(this).siblings(".drop-button").css("visibility","visible");

    $(this).siblings(".quantity").text(quantity);

    // add animation class when do the add and drop
    $(this).closest(".card-content")
           .siblings(".card-image")
           .find("img")
           .clone()
           .addClass("zoom-add")
           .appendTo(".shopping-cart")
     setTimeout(function(){
       $(".zoom-add").remove();
     }, 500);

     // Increase or decrease the counter of the shopping-cart
     // Similar to quantity, but quantity is only changed locally, counter is changed globally
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

  // Send data to place order ajax when click place order button
  $('#order-submit-btn').on('click', function (event) {
    event.preventDefault();
    placeOrder(array);
    object = {};
    array = [];
  })

  // animation effects for add and drop buttons
  $("button.add-button").mousedown(function(){
    $(this).siblings(".quantity").removeClass("quantity").addClass("quantity-add");
    $(".shopping-cart-counter").removeClass("shopping-cart-counter").addClass("shopping-cart-counter-add")
  })

  $("button.add-button").mouseup(function(){
    $(this).siblings(".quantity-add").removeClass("quantity-add").addClass("quantity");
    $(".shopping-cart-counter-add").removeClass("shopping-cart-counter-add").addClass("shopping-cart-counter")
  })


  // click event handler for drop button, very similar to add button event but do the opposite
  $("button.drop-button").click(function(){
    const createCartItem = function (object) {
      $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);
      $("#my-cart-exit").click(function(){
        $(".cover").hide();
        $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
      })
      let cart_total_price = 0;
      // render the html for each object in the object,
      // which will be shown when click the shoppin cart
      for (const eachObject in object) {
        const $cartItem = `
        <div class="card" style = "width: 80%">
          <span class="cart-image"> <img style = "max-width: 100px" src=${object[eachObject].image_url}> </span>
          <span class="cart-name"><b>Name: </b>${object[eachObject].name} </span>
          <span class="cart-price"><b>Price: </b>${object[eachObject].price} </span>
          <span class = "my-cart-quantity"><b>Quantity: </b>${object[eachObject].quantity}</span>
          <span class="cart-price"><b>Sum: </b>${(object[eachObject].price * object[eachObject].quantity).toFixed(2)} </span>
        </div>
      `
        cart_total_price += object[eachObject].price * object[eachObject].quantity;
        $("#my-cart").append($cartItem);
      }
      cart_total_price = cart_total_price.toFixed(2);
      $("#my-cart").append(`<span class = "cart-total-price">Total Price: ${cart_total_price}</span>`)
    }

    let this_item = $(this).closest(".card-content").find(".title").text();

    // quantity will minus one each time click drop button
    // if the quantity is zero, remove this item from the object
    if (object[this_item]){
      object[this_item].quantity -= 1;
      if (object[this_item].quantity === 0) {
        delete object[this_item];
      }
    }

    const renderCart = function(carts_data) {
      $("#my-cart").empty();
      for (const cartItem of carts_data) {
        if(cartItem.name === this_item){
          // remove one element from arary which has the same id as the menuItem in the menus
          let index = array.indexOf(cartItem.id)
          if (index > -1) {
            array.splice(index, 1);
          }
        }

         if(cartItem.name === this_item && object[this_item]) {
            const quantity = object[this_item].quantity;
            object[this_item] = {name: cartItem.name, image_url: cartItem.image_url,
            price : cartItem.price, quantity};
         }
      }
      createCartItem(object);
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

    // decrement quantity each time click the drop button
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

     // decreament counter each time click the drop button
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
