const router = require("express").Router();

router.use("/", (req,res) => {
  res.render("modalita");
})

module.exports = router;