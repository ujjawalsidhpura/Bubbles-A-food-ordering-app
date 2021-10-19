$(() => {
  // let $nav
  const $nav = `
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary sign-up-button">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light login-button">
              Log in
            </a>
            <a class="button is-danger logout-button is-light">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `
  $('body').append($nav)
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

  $.get('/users/me')
      .done((req,res) => {
        if (req.message === 'not logged in') {
          logOutButton.hide()
          loginButton.show()
          signUpButton.show()
          // $nav = `
          //   <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          //     <div class="navbar-brand">
          //       <a class="navbar-item" href="https://bulma.io">
          //         <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          //       </a>

          //       <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          //         <span aria-hidden="true"></span>
          //         <span aria-hidden="true"></span>
          //         <span aria-hidden="true"></span>
          //       </a>
          //     </div>

          //     <div id="navbarBasicExample" class="navbar-menu">
          //       <div class="navbar-start">
          //         <a class="navbar-item">
          //           Home
          //         </a>

          //         <a class="navbar-item">
          //           Documentation
          //         </a>

          //         <div class="navbar-item has-dropdown is-hoverable">
          //           <a class="navbar-link">
          //             More
          //           </a>

          //           <div class="navbar-dropdown">
          //             <a class="navbar-item">
          //               About
          //             </a>
          //             <a class="navbar-item">
          //               Jobs
          //             </a>
          //             <a class="navbar-item">
          //               Contact
          //             </a>
          //             <hr class="navbar-divider">
          //             <a class="navbar-item">
          //               Report an issue
          //             </a>
          //           </div>
          //         </div>
          //       </div>

          //       <div class="navbar-end">
          //         <div class="navbar-item">
          //           <div class="buttons">
          //             <a class="button is-primary sign-up-button">
          //               <strong>Sign up</strong>
          //             </a>
          //             <a class="button is-light login-button">
          //               Log in
          //             </a>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </nav>
          //   `
          //   $('body').append($nav)
        } else {
          logOutButton.show()
          loginButton.hide()
          signUpButton.hide()
          // $nav = `
          //   <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          //     <div class="navbar-brand">
          //       <a class="navbar-item" href="https://bulma.io">
          //         <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          //       </a>

          //       <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          //         <span aria-hidden="true"></span>
          //         <span aria-hidden="true"></span>
          //         <span aria-hidden="true"></span>
          //       </a>
          //     </div>

          //     <div id="navbarBasicExample" class="navbar-menu">
          //       <div class="navbar-start">
          //         <a class="navbar-item">
          //           Home
          //         </a>

          //         <a class="navbar-item">
          //           Documentation
          //         </a>

          //         <div class="navbar-item has-dropdown is-hoverable">
          //           <a class="navbar-link">
          //             More
          //           </a>

          //           <div class="navbar-dropdown">
          //             <a class="navbar-item">
          //               About
          //             </a>
          //             <a class="navbar-item">
          //               Jobs
          //             </a>
          //             <a class="navbar-item">
          //               Contact
          //             </a>
          //             <hr class="navbar-divider">
          //             <a class="navbar-item">
          //               Report an issue
          //             </a>
          //           </div>
          //         </div>
          //       </div>

          //       <div class="navbar-end">
          //         <div class="navbar-item">
          //           <div class="buttons">
          //             <a class="button is-danger logout-button is-light">
          //               Log out
          //             </a>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </nav>
          //   `
          //   $('body').append($nav)
        }
        console.log(req.message)
      })
      .fail((err) => {

        console.log('failed because: ', err)
      })



      $(".navbar-burger").click(function() {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

      });

  // if ($.cookie('token') === null || $.cookie('token') === ""|| $.cookie('token') === "null" || $.cookie('token') === undefined)
  //   {
  //     //no cookie
  //     console.log('NO cookie')
  //   }
  //   else
  //   {
  //     //have cookie
  //     console.log('Yes cookie')
  //   }


})

// $.get("/me", (req, res) => {
//   console.log(res)
//   console.log(req)
//   // let identity = req.session.user_id;
//   // console.log(identity)
//   // if (!identity) {
//   //   const templateVars = {
//   //     "user_id": identity
//   //   };
//   //   return res.render("index", templateVars);
//   // }
//   // const templateVars = {
//   //   "user_id": identity
//   // };
//   // return res.render("index", templateVars);

// });
