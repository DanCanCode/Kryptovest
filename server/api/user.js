const router = require("express").Router();
module.exports = router;

router.get("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    console.log(req.body);
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
