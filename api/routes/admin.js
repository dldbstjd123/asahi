var express = require("express")
var router = express.Router()
var path = require("path")
var fs = require("fs")
const passport = require("passport")
const {mysqlconfig, mysqlPoolConfig} = require("../../ignore/config.js")
var mysql = require("mysql")
let mysql2 = require("mysql2")

let pool = mysql2.createPool(mysqlPoolConfig)
let promisePool = pool.promise()

var multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "/../../client/public/images/menu/"))
        //cb(null, "../public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

var upload = multer({storage: storage})

//const User = require("../models/userModel");

/* GET users listing. */
router.get("/", async function (req, res, next) {
    console.log("/admin/ route")
    res.sendFile(path.join(__dirname + "/../../manager/build/index.html"))
})

router.post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err)
        } else if (!user) {
            return res.json({status: "failed"})
        }
        req.logIn(user, function (err) {
	    console.log(`req.logIn Function called, user = ${user}`)
            if (err) {
                return next(err)
            }
            return res.json({status: "succeed", user: req.user})
        })
    })(req, res, next)
})
router.post("/logout", function (req, res, next) {
    req.logOut()
    res.json({status: "succeed"})
})

router.post("/category/get", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}

    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT * FROM asahi.category`, function (error, results) {
        res.json(results)
    })
    connection.end()
})

router.post("/category/add", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    if (req.body.name == undefined || req.body.name.length == 0) {
        res.json({status: "failed"})
    } else if (req.body.sort == undefined || req.body.sort.length == 0) {
        res.json({status: "failed"})
    } else {
        var connection = mysql.createConnection(mysqlconfig)
        connection.connect()
        connection.query(
            `INSERT INTO asahi.category (name, sort) VALUES('${req.body.name}',${req.body.sort})`,
            function (error, results) {
                if (error) {
                    throw error
                }
                res.json({status: "succeed"})
            }
        )
        connection.end()
    }
})

router.post("/category/update", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    if (req.body.name == undefined || req.body.name.length == 0) {
        res.json({status: "failed"})
    } else if (req.body.sort == undefined || req.body.sort.length == 0) {
        res.json({status: "failed"})
    } else {
        var connection = mysql.createConnection(mysqlconfig)
        connection.connect()
        connection.query(
            `UPDATE asahi.category SET name = '${req.body.name}', sort = ${req.body.sort} WHERE id = ${req.body.id}`,
            function (error, results) {
                if (error) {
                    throw error
                }
                res.json({status: "succeed"})
            }
        )
        connection.end()
    }
})

router.post("/category/checkbeforedelete", function(req, res, next){
    //if(req.user == undefined){res.redirect('/admin')}
    console.log(req.user)

    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT COUNT(id) as count FROM asahi.menu WHERE category = ${req.body.id}`, function(error, results){
      if(error){throw error}
      res.json({status:"succeed", results: results})
    })
})

router.post("/category/delete", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    if (req.body.name == undefined || req.body.name.length == 0) {
        res.json({status: "failed"})
    } else if (req.body.sort == undefined || req.body.sort.length == 0) {
        res.json({status: "failed"})
    } else {
        var connection = mysql.createConnection(mysqlconfig)
        connection.connect()
        connection.query(
            `DELETE FROM asahi.category WHERE id = ${req.body.id}`,
            function (error, results) {
                if (error) {
                    throw error
                }
                res.json({status: "succeed"})
            }
        )
        connection.end()
    }
})

router.post("/hours/get", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT * FROM asahi.hours`, function (error, results) {
        res.json(results)
    })
    connection.end()
})

router.post("/hours/update", function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    let NullIncluded = false
    for (let i = 0; i < req.body.length; i++) {
        if ((req.body[i].openhour.length = 0)) {
            NullIncluded = true
        } else if ((req.body[i].closehour.length = 0)) {
            NullIncluded = true
        }
    }
    if (NullIncluded) {
        res.json({status: "failed"})
    } else {
        for (let i = 0; i < req.body.length; i++) {
            var connection = mysql.createConnection(mysqlconfig)
            connection.connect()
            connection.query(
                `UPDATE asahi.hours SET openhour='${req.body[i].openhour}', closehour='${req.body[i].closehour}', status='${req.body[i].status}' WHERE id =${req.body[i].id}`,
                function (error, results) {
                    if (i == req.body.length - 1) {
                        res.json({status: "succeed"})
                    }
                }
            )
            connection.end()
        }
    }
})

router.post("/menu/get", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `SELECT menu.*, category.name AS categoryName FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id ORDER BY category, sort`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})
router.post("/menu_update/get", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `SELECT menu.*, category.name AS categoryName FROM asahi.menu LEFT JOIN asahi.category ON menu.category = category.id WHERE menu.id = ${req.query.item}`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})

router.post("/menu_update/update", function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    //console.log("menu_update/update requested");
    //console.log(req.body);
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `UPDATE asahi.menu SET name='${req.body.name}', description='${req.body.description}', price='${req.body.price}', category=${req.body.category}, sort=${req.body.sort} WHERE id = ${req.body.id}`,
        function (error, results) {
            res.json(results)
        }
    )
    connection.end()
})
router.post("/menu_update/updateImage", upload.single("file1"), async function (
    req,
    res,
    next
) {
    //if(req.user == undefined){res.redirect('/admin')}
    const selectImage = await promisePool.query(
        `SELECT * FROM  asahi.menu WHERE id = ${req.body.itemid}`
    )
    let fileToDelete = selectImage[0][0].image
    console.log(fileToDelete)
    fs.unlink("../client/public/images/menu/" + fileToDelete, err => {
        if (err) {
            console.log("failed to delete local image:" + err)
        } else {
            console.log("successfully deleted local image")
        }
    })

    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `UPDATE asahi.menu SET image='${req.file.filename}' WHERE id = ${req.body.itemid}`,
        function (error, results) {
            if (error) {
                throw error
            }
            console.log(2)
            res.json(results)
        }
    )
})

router.post("/menu_update/delete", async function (req, res, next) {
    //if(req.user == undefined){res.redirect('/admin')}
    const selectImage = await promisePool.query(
        `SELECT * FROM  asahi.menu WHERE id = ${req.body.id}`
    )
    let fileToDelete = selectImage[0][0].image
    fs.unlink("../client/public/images/menu/" + fileToDelete, err => {
        if (err) {
            console.log("failed to delete local image:" + err)
        } else {
            console.log("successfully deleted local image")
        }
    })
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(
        `DELETE FROM asahi.menu WHERE id = ${req.body.id}`,
        function (error, results) {
            res.json({status: "succeed"})
        }
    )
    connection.end()
})

router.post("/menu_add/add", upload.single("file1"), async function (
    req,
    res,
    next
) {
    let query
    if (req.file != undefined) {
        query = `INSERT INTO asahi.menu (name, description, price, category, sort, image) VALUES('${req.body.name}', '${req.body.description}', ${req.body.price}, ${req.body.category}, ${req.body.sort}, '${req.file.filename}')`
    } else {
        query = `INSERT INTO asahi.menu (name, description, price, category, sort) VALUES('${req.body.name}', '${req.body.description}', ${req.body.price}, ${req.body.category}, ${req.body.sort})`
    }
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(query, function (error, results) {
        if(error){
          throw error
        }
        res.json({status:'succeed'})
    })
    connection.end()
})

router.post("/tax/get", function(req, res, next){
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT rate FROM asahi.tax`, function (error, results) {
        if(error){
          throw error
        }
        res.json({rate: results[0].rate})
    })
    connection.end()
})

router.post("/tax/update", function(req, res, next){
    if(req.user == undefined){res.redirect('/admin')}
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`UPDATE asahi.tax SET rate = ${req.body.tax} WHERE id = 1`, function (error, results) {
        if(error){
          throw error
        }
        res.json({status: 1})
    })
    connection.end()
})

module.exports = router
