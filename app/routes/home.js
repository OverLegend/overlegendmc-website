const router = require("express").Router();

router.use("/", (req,res) => {
  res.render("home");
})

module.exports = router;