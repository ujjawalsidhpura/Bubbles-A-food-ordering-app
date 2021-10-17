$(() => {
  loadMenus();

  const loginButton = $('.login-button');
  const loginForm = $('.login-form');
  const exit = $('#exit');
  const cover = $('.cover');
  $('#submit').on('submit', function(event) {
    event.preventDefault();
    console.log(this)
    const serializedData = $(this).serialize();
    console.log(serializedData)
    $.post('/api/login', serializedData)
      .done(() => {
        loginForm.hide()
        cover.hide();
        $('#email').val('');
        $('#password').val('');
      })
      .fail((err) => {
        console.log('failed because: ', err)
      })

  })

  loginButton.on('click', function(event) {
    if (!loginForm.is(":visible")) {
      loginForm.addClass('flex');
      loginForm.show();
      cover.show();
    }
  })
  exit.on('click', function(event) {
    loginForm.hide();
    cover.hide();
  })

})

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

