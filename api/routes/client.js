var express = require('express');
var router = express.Router();
var path = require('path')
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

router.get('/image',function(req, res, next){
  let filename = req.query.image
  let location = path.join(__dirname,'..', '..', 'client', 'public', 'images', 'menu')
  res.sendFile(location+"/"+filename)
})

module.exports = router;

