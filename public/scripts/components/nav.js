$(() => {
  window.nav = {};
  let currentUser = null;
  function updateNav(user) {
    currentUser = user
    // $('body').find(".navbar").remove();
    let $nav;

    if (!user) {
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
    } else {
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

          <div class="navbar-end">
            <span class="navbar-item">${user.name}! 👋🏽</span>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-danger logout-button is-light">
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      `
    }
    $('body').append($nav)
  }
  window.nav.update = updateNav;

  getMyDetails()
    .then(function( json ) {
      console.log(json)
      updateNav(json.user);
  });

  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

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

  // Open sign up form
  signUpButton.on('click', function(event) {
    console.log("Here")
    if (!loginForm.is(":visible")) {
      loginForm.addClass('flex');
      signUpInput.show()
      loginForm.show();
      cover.show();
    } else {
      loginInput.hide()
      errorMessage.text('')
      signUpInput.show()
    }
  })

})
