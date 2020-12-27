var express = require("express")
var router = express.Router()
var path = require("path")
var mysql = require("mysql")
const { mysqlconfig } = require("../../ignore/config.js")

/* GET home page. */
router.post("/hours/get", function (req, res, next) {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT * FROM asahi.hours`, function (error, results) {
        res.json(results)
    })
    connection.end()
})

router.post("/menu/get", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `SELECT menu.*, category.name AS categoryName, category.description as categoryDescription FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id ORDER BY category.sort, sort`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})

router.post("/menu/getId", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    console.log("requested")
    console.log(req.body.id)
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `SELECT menu.*, category.name AS categoryName, category.description as categoryDescription FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id WHERE category.id=${req.body.id} ORDER BY category.sort, sort`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})

router.get("/image", function (req, res, next) {
    let filename = req.query.image
    let location = path.join(
        __dirname,
        "..",
        "..",
        "client",
        "public",
        "images",
        "menu"
    )
    res.sendFile(location + "/" + filename)
})

router.get("/tax/get", function (req, res, next) {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT rate FROM asahi.tax WHERE id=1`, function (
        error,
        results
    ) {
        res.json({ rate: results[0].rate })
    })
    connection.end()
})

router.get("/category/get", function (req, res, next) {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT * FROM asahi.category`, function (error, results) {
        res.json(results)
    })
    connection.end()
})

router.get("/category/get6", function (req, res, next) {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `SELECT * FROM asahi.category WHERE name = 'Specialty Roll' or name = 'Nigiri' or name = 'Omakase & Boat' or name = 'Sashimi Platter' or name = 'Bento' or name = 'Appetizers'`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})

router.get("/redirectToClover", function (req, res, next) {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `INSERT INTO asahi.history (page, ip, time) VALUES( 'order', '${req.ip}', NOW())`,
        function (error, results) {
            console.log(error)
            res.json({ status: "succeed" })
        }
    )
    connection.end()
})

module.exports = router
