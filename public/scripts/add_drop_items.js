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

  // {
  //   classic bubble tea: {
  //     price:
  //     quanity:
  //     image:
  //   },
  // }
  const object = {};

  $("button.add-button").click(function(){


    const createCartItem = function (object) {
      $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);
      $("#my-cart-exit").click(function(){
        $(".cover").hide();
        $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
      })
      for (const eachObject in object) {
        const $cartItem = `
        <div class="card">
          <span class="cart-image"> <img style = "max-width: 100px" src=${object[eachObject].image_url}> </span>
          <span class="description"><b>Description: </b>${object[eachObject].name} </span>
          <span class="cart-price"><b>Price: </b>${object[eachObject].price} </span>
          <span class = "my-cart-quantity"><b>Quantity: </b>${object[eachObject].quantity}</span>
        </div>
      `
        $("#my-cart").append($cartItem);
      }
    }

    let this_item = $(this).closest(".card-content").find(".title").text();

    if (object[this_item]){
      object[this_item].quantity += 1;
    } else {
     object[this_item] = {
       quantity: 1
     };
    }


    const renderCart = function(carts_data) {
      $("#my-cart").empty();
      for (const cartItem of carts_data) {
         if(cartItem.name === this_item) {
            const quantity = object[this_item].quantity;
            object[this_item] = {name: cartItem.name, image_url: cartItem.image_url,
              price : cartItem.price, quantity};
            //$cartItem = createCartItem(cartItem);
            //$("#my-cart").append($cartItem);
         }
      }
      console.log(object);
      createCartItem(object);
      // console.log(array);
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

  $('#order-submit-btn').on('click', function (event) {
    event.preventDefault();

    //INSERT ORDER and customer DETAILS into DB AND THEN-->


    placeOrder(array)
    // .then((user) => {
    //   console.log(user.JSON)
    //   // getMyDetails()
    //   //   .then(json => updateNav(json.user));
    // })
    // .fail((err) => {
    //   console.log('failed because: ', err)
    //   $('.error').text(err.responseJSON.message)
    // })

    // getOrder()
    //         .then()
    //$.post('/api/orders', { order_id: 3 })

  })


  $("button.add-button").mousedown(function(){
    $(this).siblings(".quantity").removeClass("quantity").addClass("quantity-add");
    $(".shopping-cart-counter").removeClass("shopping-cart-counter").addClass("shopping-cart-counter-add")
  })

  $("button.add-button").mouseup(function(){
    $(this).siblings(".quantity-add").removeClass("quantity-add").addClass("quantity");
    $(".shopping-cart-counter-add").removeClass("shopping-cart-counter-add").addClass("shopping-cart-counter")
  })

  $("button.drop-button").click(function(){
    const createCartItem = function (object) {
      $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);
      $("#my-cart-exit").click(function(){
        $(".cover").hide();
        $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
      })
      for (const eachObject in object) {
        const $cartItem = `
        <div class="card">
          <span class="cart-image"> <img style = "max-width: 100px" src=${object[eachObject].image_url}> </span>
          <span class="description"><b>Description: </b>${object[eachObject].name} </span>
          <span class="cart-price"><b>Price: </b>${object[eachObject].price} </span>
          <span class = "my-cart-quantity"><b>Quantity: </b>${object[eachObject].quantity}</span>
        </div>
      `
        $("#my-cart").append($cartItem);
      }
    }

    let this_item = $(this).closest(".card-content").find(".title").text();

    if (object[this_item]){
      object[this_item].quantity -= 1;
      if (object[this_item].quantity === 0) {
        delete object[this_item];
      }
    }
    // else {
    //  object[this_item] = {
    //    quantity: 1
    //  };
    // }


    const renderCart = function(carts_data) {
      $("#my-cart").empty();
      for (const cartItem of carts_data) {
         if(cartItem.name === this_item && object[this_item]) {
            const quantity = object[this_item].quantity;
            object[this_item] = {name: cartItem.name, image_url: cartItem.image_url,
            price : cartItem.price, quantity};
         }
      }
      console.log(object);
      createCartItem(object);
      // console.log(array);
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
