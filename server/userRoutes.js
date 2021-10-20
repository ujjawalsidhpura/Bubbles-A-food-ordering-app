const bcrypt = require('bcryptjs');
const { getUserWithEmail } = require('./database');

module.exports = function(router, database) {
  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    database.getUserWithEmail(user.email)
            .then(result => {
              if (result){
                return res.status(404).send({message: 'User Already Exists!'})
              } else {
                database.addCustomer(user)
                    .then(() => {
                          // req.session.userId = user.id;
                          // res.send("🤗");
                          console.log(user.email, user.password);
                          login(user.email, user.password)
                              .then(user => {
                                console.log(user);
                                if (!user) {
                                  return res.status(404).send({message: 'Incorrect username or password'})
                                }
                                req.session.userId = user.id;
                                res.send({user: {id: user.id, name: user.name, password: user.password, email: user.email, address: user.address }});
                              })
                    })
              }
            })
            .catch(e => {
                console.log(e);
              }
              );

  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }
    database.getUserWithId(userId)
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      res.send({user: {id: userId, name: user.name, password: user.password, email: user.email, address: user.address }});
    })
    .catch(e => res.send(e));
  });

  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          return res.status(404).send({message: 'Incorrect username or password'})
        }
        req.session.userId = user.id;
        res.send({user: {id: userId, name: user.name, password: user.password, email: user.email, address: user.address }});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.send({});
  })
}
