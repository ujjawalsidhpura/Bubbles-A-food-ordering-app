// // $(() => {
// import {add_drop_button_event} from './add_drop_items.js'
// $(document).ready(function() {
//   // const {  add_drop_button_event } = require('./add_drop_items');

// $('#submit').on('submit', function (event) {
//   event.preventDefault();
//   const serializedData = $(this).serialize();
//   console.log(serializedData)
//   $.post('/api/login', serializedData)

// })


// //   // // Submit sign up form
// //   // signUpInput.on('submit', function(event) {
// //   //   event.preventDefault();
// //   //   const serializedData = $(this).serialize();
// //   //   console.log(serializedData)
// //   //   $.post('/api/register', serializedData)
// //   //     .done(() => {
// //   //       window.location.reload(true)
// //   //     })
// //   //     .fail((err) => {
// //   //       console.log('failed because: ', err)
// //   //       $('.error').text(err.responseJSON.message)
// //   //     })
// //   // })

// const renderMenus = function (menus_data) {
//   for (const menuItem of menus_data) {
//     const $menuItem = createMenuItem(menuItem);
//     $(".menu-container").append($menuItem);
//   }
// }

// const createMenuItem = (menuItem) => {
//   const menuCard = `
//   <div class="card">
//     <li class="card-image">
//       <img src=${menuItem.image_url} alt="Placeholder image">
//     </li>
//     <div class="card-content">
//       <div class="media">
//         <p class="title is-3">${menuItem.name}</p>
//       </div>
//       <div class="content">
//         <span class="description"><b>Description: </b>${menuItem.description} </span>
//         <br>
//         <span class="ingredients"><b>Ingredients: </b>${menuItem.ingredients} </span>
//         <div class="card-footer">
//           <div class="cost">
//             <p><b>Price: </b>${menuItem.price}</p>
//           </div>
//             <div class="increment-order">
//             <button class="button is-danger is-light drop-button" id = "drop-button">-</button>
//             <output class = "quantity">0</output>
//             <button class="button is-success is-light add-button" id = "add-button">+</button>
//             </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>
//   `
//   return menuCard;
// };

// const renderMenus = function(menus_data) {
//   for (const menuItem of menus_data) {
//     const $menuItem = createMenuItem(menuItem);
//     $(".menu-container").append($menuItem);
//   }
//   add_drop_button_event();
// }


// //   // // exit form
// //   // exit.on('click', function(event) {
// //   //   loginForm.hide();
// //   //   cover.hide();
// //   //   loginInput.hide()
// //   //   signUpInput.hide()
// //   //   console.log('Here')
// //   //   clearLoginForm();
// //   //   clearRegisterForm();
// //   //   errorMessage.text('')
// //   // })

// //   // Log out
// //   logOutButton.on('click', function(event){
// //     event.preventDefault();
// //     $.post('/api/logout')
// //       .done(() => {
// //         window.location.reload(true)
// //       })
// //       .fail((err) => {

// //         console.log('failed because: ', err)
// //       })
// //   })
// // })

// // const clearRegisterForm = () => {
// //   $('#name').val('');
// //   $('#phone').val('');
// //   $('#reg-email').val('');
// //   $('#reg-password').val('');
// //   $('#address').val('');
// // }
// // const clearLoginForm = () => {
// //   $('#email').val('');
// //   $('#password').val('');
// // }



