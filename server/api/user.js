const router = require("express").Router();
const User = require("../db/models/User");
module.exports = router;

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
