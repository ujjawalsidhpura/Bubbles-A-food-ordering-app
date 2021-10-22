import {order_history_event} from "../get_my_order_history.js"
// This component renders the nav bar of our app, which responsive according to the user state
$(() => {
  const buttonEventControls = function(){
    // DOM Variables
    const loginButton = $('.login-button');
    const signUpButton = $('.sign-up-button');
    const logOutButton = $('.logout-button');
    const loginInput = $('#submit')
    const signUpInput = $('#register')
    const loginForm = $('.login-form');
    const exit = $('#exit');
    const cover = $('.cover');
    const errorMessage = $('.error');

    // the function to close the sign up form
    const clearRegisterForm = () => {
      $('#name').val('');
      $('#phone').val('');
      $('#reg-email').val('');
      $('#reg-password').val('');
      $('#address').val('');
      loginForm.hide();
      cover.hide();
    }

    // Open sign up form
    signUpButton.on('click', function(event) {
      signUpButton.removeClass('is-light');
      signUpButton.addClass('is-primary');
      loginButton.addClass('is-light');
      loginButton.removeClass('is-primary');
      console.log("Here")
      if (!loginForm.is(":visible")) {
        loginForm.addClass('flex');
        signUpInput.show()
        loginForm.show();
        cover.show();
      } else {
        errorMessage.text('')
        $('#submit').hide()
        signUpInput.show()
      }
    })

    // exit form
    exit.on('click', function(event) {
      loginForm.hide();
      cover.hide();
      loginInput.hide()
      signUpInput.hide()
      clearLoginForm();
      clearRegisterForm();
      errorMessage.text('')
    })

    // Submit sign up form
    signUpInput.on('submit', function(event) {
      event.preventDefault();

      const data = $(this).serialize();

      signUp(data)
        .then((json) => {
          clearRegisterForm();
          getMyDetails()
            .then(json => {
              updateNav(json.user)
            });
        })
        .fail((err) => {
          console.log('failed because: ', err)
          $('.error').text(err.responseJSON.message)
        })
    })

    // function to hide the login/register form
    const clearLoginForm = () => {
      $('#email').val('');
      $('#password').val('');
      loginForm.hide();
      cover.hide();
    }

    // Open login form
    loginButton.on('click', function(event) {
      loginButton.removeClass('is-light');
      loginButton.addClass('is-primary');
      signUpButton.addClass('is-light');
      signUpButton.removeClass('is-primary');
      if (!loginForm.is(":visible")) {
        loginInput.show()
        loginForm.addClass('flex');
        loginForm.show();
        cover.show();
      } else {
        signUpInput.hide()
        errorMessage.text('')
        loginInput.show()
      }
    })

  //submit the form to login, update the nav bar after login
    loginInput.on('submit', function(event) {
      event.preventDefault();

      const data = $(this).serialize();
      logIn(data)
        .then(() => {
          clearLoginForm();
          getMyDetails()
            .then(json => {
              updateNav(json.user)
            });
        })
        .fail((err) => {
                console.log('failed because: ', err)
                $('.error').text(err.responseJSON.message)
              })
    })

    // click event handler for logout button which will update nav bar when we log out
    logOutButton.on("click", () => {
      console.log("hello");
      $(".total-price-value").text("0.00");
      $(".shopping-cart-counter").text(0);
      $(".shopping-cart-counter").css("visibility","hidden");
      $(".quantity").text(0)
      $(".quantity").css("visibility","hidden");
      $(".drop-button").css("visibility","hidden");
      $("#my-cart").empty();
      $("#my-cart").append(`<a class="button is-danger is-light" id="my-cart-exit">&times;</a>`);
      $("#my-cart-exit").click(function(){
      $(".cover").hide();
      $("#my-cart").removeClass("my-cart-flex").addClass("my-cart");
      $("#menu-container").removeClass("menu-container-hide").addClass("menu-container");
      })

      signUpInput.hide();
      loginInput.hide();
      errorMessage.text('')
      logOut()
      .then(() => {
        getMyDetails()
          .then(json => {
            updateNav(json.user)
          });
      })
    })

    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });
  }

  let $nav;

  const updateNav = function(user){
    if (!user) {
      // The appearance of nav bar when user is not logged in
      $('.navbar').empty()
      $nav = `
      <div class="navbar-brand">
        <a class="navbar-item" href=#>
          <img src="../images/image.jpeg" width="30" height="28">
          <p>Bubbles</p>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">


      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary sign-up-button">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light login-button">
              Log in
            </a>
          </div>
        </div>
      </div>
    `
      $('.navbar').append($($nav));

      // enable the event handlers when a new nav bar is appended
      buttonEventControls();
    } else {
      // The appearance of nav bar when user is logged in
      $('.navbar').empty()
      $nav = `
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
          <img src="../images/image.jpeg" width="30" height="28">
          <p>Bubbles</p>
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

          <a class = "navbar-item order-history"> My order Histories</a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">


        </div>
        <div class="navbar-end">
          <div class = "user-name">
            <p>${user.name}🤞</p>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-danger logout-button is-light">
                 Logout
              </a>
            </div>
          </div>
        </div>
      `

      $('.navbar').append($nav)



      // enable the event handlers when a new nav bar is appended
      order_history_event();
      buttonEventControls();
    }
  }


  getMyDetails()
    .then(function( json ) {

    updateNav(json.user);

  });

})
