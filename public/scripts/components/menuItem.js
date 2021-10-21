// Render all the menus to the home page, similar to tweeter app
import {add_drop_button_event} from '../add_drop_items.js'

$(() => {

  loadMenus();

})

const createMenuItem = (menuItem) => {
  // Create html for each json in the menus table of the database
  const $menuItem = `
  <div class="card">
    <li class="card-image">
      <img src=${menuItem.image_url} alt="Placeholder image">
    </li>
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
            <div class="increment-order">
            <button class="button is-danger is-light drop-button" id = "drop-button">-</button>
            <output class = "quantity">0</output>
            <button class="button is-success is-light add-button" id = "add-button">+</button>
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
  // Loop through the menus table of the databse and then call createMenuItem for each menuItem
  for (const menuItem of menus_data) {
    const $menuItem = createMenuItem(menuItem);
    $(".menu-container").append($menuItem);
  }
  add_drop_button_event();
}

const loadMenus = () => {
  // call the renderMenus function by ajax get /api/menus which loads our menus table
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
