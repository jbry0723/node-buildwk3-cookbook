const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const Auths = require("./auth-model");

const { generateToken } = require("../middleware/auth-middleware");
const {
  validateCredentials,
  checkExistingUser,
} = require("../middleware/router-middleware");

router.post(
  "/register",
  validateCredentials,
  checkExistingUser,
  (req, res, next) => {
    const hash = bcryptjs.hashSync(req.body.password, 8);
    req.body.password = hash;

    Auths.add(req.body)
      .then((user) => {
        res.status(200).json(user.username);
      })
      .catch(next);
  }
);

router.post("/login", validateCredentials, (req, res, next) => {
  const { username, password } = req.body;
  Auths.findByUsername(username)
    .then((user) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(next);
});

module.exports = router;
