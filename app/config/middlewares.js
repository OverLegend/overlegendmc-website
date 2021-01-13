module.exports = (app, conn) => {

  const express = require("express");
  const srvPort = process.env.serverPort || 3000;
  const bodyParser = require("body-parser");
  const path = require("path");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");

  app.listen(srvPort);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname + "/../theme/views"));
  app.use(cookieParser());

  app.use(function (req, res, next) {
    // check if client sent cookie
    let cookie = req.cookies.sessionToken;
    if (cookie === undefined) {
      

      conn.query("USE NetworkDATA; SELECT * FROM login_requests;", [1,2], (err,data) => {
        if (err) throw err;

        let requestIp = req.connection.remoteAddress;
        for (let i = 0; i < data[1].length; i++) {
          if (data[1][i].webIp == requestIp && data[1][i].mcIp == requestIp) {
            let newToken = Math.floor(Math.random() * 1000000000);
            res.cookie("sessionToken", newToken, {maxAge: 900000, httpOnly: true});
          }
        }
      })
    }
    next();
  });

  app.use(express.static(path.join(__dirname + "/../theme/public")));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
}