const router = require("express").Router();
const User = require("../db/models/User");
const Transaction = require("../db/models/Transaction");
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

router.post("/transaction", async (req, res, next) => {
  try {
    const {
      addressTo,
      addressFrom,
      amount,
      keyword,
      message,
      timestamp,
      token,
    } = req.body;

    const user = await User.findByToken(token);

    if (user) {
      const createTransaction = await Transaction.create({
        addressTo,
        addressFrom,
        amount,
        keyword,
        message,
        timestamp,
        UserId: user.dataValues.id,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (error) {
    next(error);
  }
});
