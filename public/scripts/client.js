$(() => {

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
                <button>+</button>
                <button>-</button>
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

  //renderMenus(menus);

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

  loadMenus();

})



