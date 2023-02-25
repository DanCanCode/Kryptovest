const router = require("express").Router();
module.exports = router;

router.get("/", (req, res, next) => {
  try {
    res.status(200).send("it works");
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
