module.exports = (app) => {
  app.get(["/", "/index"], (err,res) => {res.redirect("/home")});
  app.get(["/rules"], (err,res) => {res.redirect("/regole")});
  app.get(["/banlist", "/ban"], (err,res) => {res.redirect("/bans")});
}