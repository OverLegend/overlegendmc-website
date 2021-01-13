require("dotenv").config();

// Node modules
const express = require("express");
const session = require('express-session');
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");
const app = express();
const bodyPaster = require("body-parser");

// Initialize mysql connection
const conn = require("./config/mysqlConnector");
// Setting up middlewares
require("./config/middlewares")(app, conn);

// Handling routes
require("./config/aliases")(app);
fs.readdir(__dirname + "/routes", {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let route = require(`./routes/${file.name.split(".")[0]}`);
    app.use(`/${file.name.split(".")[0]}`, route);
  })
});

app.get("/punizioni/:id", (req,res) => {
  if (req.params.id) {
    res.render("punizioni");
  }
})

app.get("/api/top_parkour", (req,res) => {
  conn.query("USE ajp; SELECT * FROM ajparkour_scores;", [1,2], (err,data) => {
    if (err) throw err;
    res.json(data[1]);
  })
})

app.get("/api/bans", (req,res) => {
  conn.query("USE litebans; SELECT * FROM litebans_bans; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
    if (err) throw err;
    res.json({data: data[1], history: data[2]});
  })
})

app.get("/api/mutes", (req,res) => {
  conn.query("USE litebans; SELECT * FROM litebans_mutes; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
    if (err) throw err;
    res.json({data: data[1], history: data[2]});
  })
})

app.get("/api/warns", (req,res) => {
  conn.query("USE litebans; SELECT * FROM litebans_warnings; SELECT * FROM litebans_history;", [1,2,3], (err,data) => {
    if (err) throw err;
    res.json({data: data[1], history: data[2]});
  })
});

app.get("/api/staff", (req,res) => {
  conn.query("USE luckperms; SELECT * FROM luckperms_players;", [1,2], (err,data) => {
    if (err) throw err;
    res.json(data[1]);
  })
})

app.post("/api/trylogin", (req,res) => {
  conn.query(`USE NetworkDATA; INSERT INTO login_requests (webIp, madeRequest) VALUES("192.168.1.1", 1);`, [1,2], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  })
})

app.post("/api/authenticate", (req,res) => {

  conn.query("USE NetworkDATA; SELECT * FROM login_requests;", [1,2], (err,data) => {
    if (err) throw err;
    let founded = false;
    for (let i = 0; i < data[1].length && !founded; i++) {
      if (data[1][i].webIp == "192.168.1.1" && data[1][i].madeRequest == true) {
        founded = true;
        let newToken = Math.floor(Math.random() * 1000000000);
        conn.query(`USE NetworkDATA; UPDATE login_requests SET mcIp="192.168.1.1", sessionToken=${newToken}, uuid="${req.body.uuid}", nickname="${req.body.username}" WHERE webIp="192.168.1.1";`, [1,2], (err) => {
          if (err) throw err;
        })
      }
    }
  })
  res.sendStatus(200);
})