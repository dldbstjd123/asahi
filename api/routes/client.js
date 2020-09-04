var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const { mysqlconfig } = require("../../ignore/config.js");


/* GET home page. */
router.post('/hours/get', function(req, res, next) {
  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query(`SELECT * FROM asahi.hours`, function (error, results) {
    res.json(results);
  });
  connection.end();

});

module.exports = router;

