const Auths=require('../auth/auth-model')



  function validateCredentials(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json("missing user data");
    } else if (!req.body.username || !req.body.password) {
      res.status(400).json("username and password required");
    } else {
      next();
    }
  }

  function checkExistingUser(req, res, next) {
    Auths.findByUsername(req.body.username).then((user) => {
      if (!user) {
        next();
      } else {
        res.status(400).json("username already taken");
      }
    });
  }

  function handleErrors(error, req, res, next) {
    res.status(500).json({
      info: "There was an error in the router",
      message: error.message,
      stack: error.stack,
    });
  }

module.exports = {
    handleErrors, validateCredentials,checkExistingUser
  };