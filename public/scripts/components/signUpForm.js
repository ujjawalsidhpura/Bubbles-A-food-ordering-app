$(() => {
  const signUpForm = $(`
  <form action="/users/" method="POST" id="register">
    <input name="name" class="input" type="text" id="name" placeholder="First Name" required>
    <input name="phone" class="input" type="tel" id="phone" placeholder="Phone Number" required>
    <input name="email" class="input" type="email" id="reg-email" placeholder="Email Address" required>
    <input name="password" class="input" type="password" id="reg-password" placeholder="Password" required>
    <input name="address" class="input" type="text" id="address" placeholder="Address" required>
    <p class="error"></p>
    <button type="submit" class="button is-primary is-fullwidth" id="signup">Sign Up</button>
  </form>
  `)
  $('.login-content').append(signUpForm)

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

  // Submit sign up form
  signUpInput.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    signUp(data)
      .then(getMyDetails)
      .then((json) => {
        console.log(json)
        // signUpInput.hide()
      })
  })
})
