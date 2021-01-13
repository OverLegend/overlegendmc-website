const router = require("express").Router();

router.use("/", (req,res) => {
  res.render("regole");
})

module.exports = router;