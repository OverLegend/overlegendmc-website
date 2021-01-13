const router = require("express").Router();

router.use("/", (req,res) => {
  res.render("staff");
})

module.exports = router;