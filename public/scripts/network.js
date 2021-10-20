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

function placeOrder(){
  console.log("order is placed");
  return $.ajax({
    method: "POST",
    url: "/api/orders"
  })
}
