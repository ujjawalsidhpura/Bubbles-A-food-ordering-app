$(() => {
  const signUpForm = $(`
  <form action="/users" method="POST" id="register">
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


})
