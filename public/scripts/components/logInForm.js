$(() => {
  const logInForm = $(`
  <form action="/users/login" method="POST" id="submit">
    <input name="email" class="input" type="email" id="email" placeholder="Email Address" required>
    <input name="password" class="input" type="password" id="password" placeholder="Password" required>
    <p class="error"></p>
    <button type="submit" class="button is-primary is-fullwidth" id="login">Log In</button>
  </form>
  `)
  $('.login-content').append(logInForm)

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

  // exit form
  exit.on('click', function(event) {
    loginForm.hide();
    cover.hide();
    loginInput.hide()
    signUpInput.hide()
    console.log('Here')
    clearLoginForm();
    clearRegisterForm();
    errorMessage.text('')
  })

  // Submit login form
  loginInput.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        console.log(json.user)
      })
  })
})
