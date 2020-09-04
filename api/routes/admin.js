var express = require("express");
var router = express.Router();
var path = require("path");
const passport = require("passport");
var mysql = require("mysql");
const { mysqlconfig } = require("../../ignore/config.js");

//const User = require("../models/userModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log("/admin/ route");
  res.sendFile(path.join(__dirname + "/../../manager/build/index.html"));
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.json({ status: "failed" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ status: "succeed", user: req.user });
    });
  })(req, res, next);
});
router.post("/logout", function (req, res, next) {
  req.logOut();
  res.json({ status: "succeed" });
});

router.post("/category/get", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}

  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query(`SELECT * FROM asahi.category`, function (error, results) {
    res.json(results);
  });
  connection.end();
});

router.post("/category/add", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  if (req.body.name == undefined || req.body.name.length == 0) {
    res.json({ status: "failed" });
  } else if (req.body.sort == undefined || req.body.sort.length == 0) {
    res.json({ status: "failed" });
  } else {
    var connection = mysql.createConnection(mysqlconfig);
    connection.connect();
    connection.query(
      `INSERT INTO asahi.category (name, sort) VALUES('${req.body.name}',${req.body.sort})`,
      function (error, results) {
        if (error) {
          throw error;
        }
        res.json({ status: "succeed" });
      }
    );
    connection.end();
  }
});

router.post("/category/update", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  if (req.body.name == undefined || req.body.name.length == 0) {
    res.json({ status: "failed" });
  } else if (req.body.sort == undefined || req.body.sort.length == 0) {
    res.json({ status: "failed" });
  } else {
    var connection = mysql.createConnection(mysqlconfig);
    connection.connect();
    connection.query(
      `UPDATE asahi.category SET name = '${req.body.name}', sort = ${req.body.sort} WHERE id = ${req.body.id}`,
      function (error, results) {
        if (error) {
          throw error;
        }
        res.json({ status: "succeed" });
      }
    );
    connection.end();
  }
});

router.post("/category/delete", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  if (req.body.name == undefined || req.body.name.length == 0) {
    res.json({ status: "failed" });
  } else if (req.body.sort == undefined || req.body.sort.length == 0) {
    res.json({ status: "failed" });
  } else {
    var connection = mysql.createConnection(mysqlconfig);
    connection.connect();
    connection.query(
      `DELETE FROM asahi.category WHERE id = ${req.body.id}`,
      function (error, results) {
        if (error) {
          throw error;
        }
        res.json({ status: "succeed" });
      }
    );
    connection.end();
  }
});

router.post("/hours/get", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query(`SELECT * FROM asahi.hours`, function (error, results) {
    res.json(results);
  });
  connection.end();
});

router.post("/hours/update", function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  let NullIncluded = false;
  for (let i = 0; i < req.body.length; i++) {
    if ((req.body[i].openhour.length = 0)) {
      NullIncluded = true;
    } else if ((req.body[i].closehour.length = 0)) {
      NullIncluded = true;
    }
  }
  if (NullIncluded) {
    res.json({ status: "failed" });
  } else {
    for (let i = 0; i < req.body.length; i++) {
      var connection = mysql.createConnection(mysqlconfig);
      connection.connect();
      connection.query(
        `UPDATE asahi.hours SET openhour='${req.body[i].openhour}', closehour='${req.body[i].closehour}', status='${req.body[i].status}' WHERE id =${req.body[i].id}`,
        function (error, results) {
          if (i == req.body.length - 1) {
            res.json({ status: "succeed" });
          }
        }
      );
      connection.end();
    }
  }
});

router.post("/menu/get", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query(
    `SELECT menu.*, category.name AS categoryName FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id ORDER BY category, sort`,
    function (error, results) {
      res.json(results);
    }
  );
  connection.end();
});
router.post("/menu_update/get", async function (req, res, next) {
  //if(req.user == undefined){res.redirect('/admin')}
  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query(
    `SELECT menu.*, category.name AS categoryName FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id WHERE menu.id = ${req.query.item}`,
    function (error, results) {
      res.json(results);
    }
  );
  connection.end();
});

module.exports = router;
