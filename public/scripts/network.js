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

function getOrder(){
  console.log("get order");
  return $.ajax({
    method: "GET",
    url: "/api/orders/:id"
  })
}
