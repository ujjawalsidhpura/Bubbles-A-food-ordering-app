// Show the login form when click the "Log In" Button
$(() => {
  const $logInForm = $(`
  <form action="/users/login" method="POST" id="submit">
    <input name="email" class="input" type="email" id="email" placeholder="Email Address" required>
    <input name="password" class="input" type="password" id="password" placeholder="Password" required>
    <p class="error"></p>
    <button type="submit" class="button is-primary is-fullwidth" id="login">Log In</button>
  </form>
  `)
  window.$logInForm = $logInForm;
  $('.login-content').append($logInForm)
 })
