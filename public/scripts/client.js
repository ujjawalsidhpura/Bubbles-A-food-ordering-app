$(() => {
  loadMenus();

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

  // Submit login form
  loginInput.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData)
    $.post('/api/login', serializedData)
    .done((data) => {
      window.location.reload(true)
    })
    .fail((err) => {
      console.log('failed because: ', err)
      $('.error').text(err.responseJSON.message)
    })
  })

  // Submit sign up form
  signUpInput.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData)
    $.post('/api/register', serializedData)
      .done(() => {
        window.location.reload(true)
      })
      .fail((err) => {
        console.log('failed because: ', err)
        $('.error').text(err.responseJSON.message)
      })
  })

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

  // Open sign up form
  signUpButton.on('click', function(event) {
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
    clearLoginForm();
    clearRegisterForm();
    errorMessage.text('')
  })

  // Log out
  logOutButton.on('click', function(event){
    event.preventDefault();
    $.post('/api/logout')
      .done(() => {
        window.location.reload(true)
      })
      .fail((err) => {

        console.log('failed because: ', err)
      })
  })
})

const clearRegisterForm = () => {
  $('#name').val('');
  $('#phone').val('');
  $('#reg-email').val('');
  $('#reg-password').val('');
  $('#address').val('');
}
const clearLoginForm = () => {
  $('#email').val('');
  $('#password').val('');
}

const createMenuItem = (menuItem) => {
  const $menuItem = `
  <div class="card">
    <div class="card-image">
      <img src=${menuItem.image_url} alt="Placeholder image">
    </div>
    <div class="card-content">
      <div class="media">
        <p class="title is-3">${menuItem.name}</p>
      </div>
      <div class="content">
        <span class="description"><b>Description: </b>${menuItem.description} </span>
        <br>
        <span class="ingredients"><b>Ingredients: </b>${menuItem.ingredients} </span>
        <div class="card-footer">
          <div class="cost">
            <p><b>Price: </b>${menuItem.price}</p>
          </div>
          <div class="order-value">
            <div>quantity: 0</div>
            <div class="increment-order">
              <button class="button is-success is-light">+</button>
              <button class="button is-danger is-light">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  return $menuItem;
};

const renderMenus = function(menus_data) {
  for (const menuItem of menus_data) {
    const $menuItem = createMenuItem(menuItem);
    $(".menu-container").append($menuItem);
  }
}

const loadMenus = () => {
  $.ajax({
    url: '/api/menus',
    method: "GET",
    dataType: "json",
    success: (menus) => {
      renderMenus(menus);
    },

    error: (err) => {
      alert(`there was an error ${err}`);
    }
  });
};
