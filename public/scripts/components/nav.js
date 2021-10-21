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
            .then(json => updateNav(json.user));
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
            .then(json => updateNav(json.user));
        })
        .fail((err) => {
                console.log('failed because: ', err)
                $('.error').text(err.responseJSON.message)
              })
    })

    // click event handler for logout button which will update nav bar when we log out
    logOutButton.on("click", () => {
      signUpInput.hide();
      loginInput.hide();
      logOut()
      .then(() => {
        getMyDetails()
          .then(json => updateNav(json.user));
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
      $nav = `<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
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
      </div>
    </nav>
    `
      $('body').append($($nav));

      // enable the event handlers when a new nav bar is appended
      buttonEventControls();
    } else {
      // The appearance of nav bar when user is logged in
      $nav = `
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

            <a class="navbar-item">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
          <div class = "user-name">
            <p>${user.name}🤞</p>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-danger logout-button is-light">
                   Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      `

      $('body').append($nav)

      // enable the event handlers when a new nav bar is appended
      buttonEventControls();
    }
  }


  getMyDetails()
    .then(function( json ) {
    updateNav(json.user);
  });

})
