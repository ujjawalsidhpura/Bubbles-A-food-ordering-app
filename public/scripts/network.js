// This is an ajax helper function file
// It has all of the ajax functions to control the get and post methods

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

function logOut(){
  return $.ajax({
    method: "POST",
    url: "/users/logout"
  })
}

function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me"
  });
}

function placeOrder(menu_array){
  console.log("order is placed");
  return $.ajax({
    method: "POST",
    url: "/api/orders",
    data: {
      menu_array
    }
  })
}

function getMyOrderHistory(){
  console.log("get my order history");
  return $.ajax({
    method: "GET",
    url: "/api/order-history"
  })
}


function getOrder(){
  console.log("get order");
  return $.ajax({
    method: "GET",
    url: "/api/orders/:id"
  })
}


function sendOrderID(id) {
  // call the renderMenus function by ajax get /api/menus which loads our menus table
  return $.ajax({
    url: '/api/order-detail/:id',
    method: "POST",
    dataType: "json",
    data: {id}
  });
};
