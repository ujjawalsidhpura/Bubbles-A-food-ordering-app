// $(() => {

//   // DOM Variables
//   const loginButton = $('.login-button');
//   const signUpButton = $('.sign-up-button');
//   const logOutButton = $('.logout-button');
//   const loginInput = $('#submit')
//   const signUpInput = $('#register')
//   const loginForm = $('.login-form');
//   const exit = $('#exit');
//   const cover = $('.cover');
//   const errorMessage = $('.error');

//   // // Submit login form
//   // loginInput.on('submit', function(event) {
//   //   event.preventDefault();
//   //   const serializedData = $(this).serialize();
//   //   console.log(serializedData)
//   //   $.post('/api/login', serializedData)
//   //   .done((data) => {
//   //     window.location.reload(true)
//   //   })
//   //   .fail((err) => {
//   //     console.log('failed because: ', err)
//   //     $('.error').text(err.responseJSON.message)
//   //   })
//   // })

//   // // Submit sign up form
//   // signUpInput.on('submit', function(event) {
//   //   event.preventDefault();
//   //   const serializedData = $(this).serialize();
//   //   console.log(serializedData)
//   //   $.post('/api/register', serializedData)
//   //     .done(() => {
//   //       window.location.reload(true)
//   //     })
//   //     .fail((err) => {
//   //       console.log('failed because: ', err)
//   //       $('.error').text(err.responseJSON.message)
//   //     })
//   // })




//   // // exit form
//   // exit.on('click', function(event) {
//   //   loginForm.hide();
//   //   cover.hide();
//   //   loginInput.hide()
//   //   signUpInput.hide()
//   //   console.log('Here')
//   //   clearLoginForm();
//   //   clearRegisterForm();
//   //   errorMessage.text('')
//   // })

//   // Log out
//   logOutButton.on('click', function(event){
//     event.preventDefault();
//     $.post('/api/logout')
//       .done(() => {
//         window.location.reload(true)
//       })
//       .fail((err) => {

//         console.log('failed because: ', err)
//       })
//   })
// })

// const clearRegisterForm = () => {
//   $('#name').val('');
//   $('#phone').val('');
//   $('#reg-email').val('');
//   $('#reg-password').val('');
//   $('#address').val('');
// }
// const clearLoginForm = () => {
//   $('#email').val('');
//   $('#password').val('');
// }

