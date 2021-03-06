var express = require("express")
var router = express.Router()
var mysql = require("mysql")
let mysql2 = require("mysql2")
const {
    mysqlconfig,
    emailConfig,
    mysqlPoolConfig,
    cloverConfig
} = require("../../ignore/config.js")
var nodemailer = require("nodemailer")

let auth_code = undefined //|| '3a149af4-2c25-ea26-f992-97b1a2852306'
//                             "de544175-7ebe-f2c4-b7cd-64916ae88629"
//const clover = require('clover-ecomm-sdk')(access_token)

router.get("/unauthorized", function (req, res, next) {
    let client_id = cloverConfig.app_id //"SJD3F92ASG2GG"
    let optionUrl = "https://sandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        optionUrl = "https://clover.com"
    }
    res.redirect(
        `${optionUrl}/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`
    )
})

router.get("/authorized", async function (req, res, next) {
    if (!req.query.code) {
        //Change Client_ID WHEN SWITCHING TO PRODUCTION
        let client_id = cloverConfig.app_id //"SJD3F92ASG2GG"
        let optionUrl = "https://sandbox.dev.clover.com"
        if (cloverConfig.server == "live") {
            optionUrl = "https://clover.com"
        }
        res.redirect(
            `${optionUrl}/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`
        )
    } else {
        auth_code = req.query.code
        console.log("*****************STORE THIS ACCESS TOKEN ****************")
        console.log(auth_code)
        getAccessToken(auth_code)
        console.log("*****************STORE THIS ACCESS TOKEN ****************")
        //res.json({auth_code : req.query.code})
    }
})

router.post("/proceed", async function (req, res, next) {
    //let access_token = "96f8d7cd-dc30-1185-47b3-83a2ae91df64"
    let access_token = cloverConfig.access_token

    console.log(`final reuslt access_token = ${JSON.stringify(access_token)}`)
    let api_key = await getApiKey(access_token)
    console.log(`final reuslt api_key = ${JSON.stringify(api_key)}`)
    let source = await getSourceCode(api_key, req)
    console.log(`final reuslt source = ${JSON.stringify(source)}`)
    if (source.error) {
        console.log("responding error!!")
        res.json({ status: 0, error: source.error })
        return
    }
    //let taxRate = await getTaxRate();
    //console.log(`final reuslt taxRate = ${taxRate}`)
    let orderId = await createOrder(req.body.cart, access_token)
    console.log(`final reuslt orderId = ${orderId}`)
    let charge = await chargeOrder(access_token, source, orderId)
    if (charge.error) {
        console.log("responding error!!")
        res.json({ status: 0, error: charge.error })
        return
    }
    console.log(`final reuslt charge = ${JSON.stringify(charge)}`)
    if (charge.id) {
        res.json({ status: 1, items: charge.items, id: charge.id })
        sendEmail(req.body.email, charge.id, req.body.name, charge.items)
        storeInDB(charge, req.body.email, req.body.name, req.ip)
        return
    } else {
        res.json({ status: 0, error: "Failed to pay." })
        return
    }
})

router.get("/email", function (req, res, next) {
    console.log("email")
    let emailStatus = sendEmail(
        "dannydannyl@me.com",
        "FA554832148",
        "yoon jung",
        { description: "test", amount: 2000, quantity: 2 }
    )
    console.log(`email status = ${emailStatus}`)
})

async function getAuthCode() {
    const request = require("request-promise")
    const options = {
        method: "GET",
        url: `https://asahisushiolympia.com/clover/authorized`,
        headers: { accept: "application/json" }
    }
    var result = await request(options)
    return JSON.parse(result)
}

async function getAccessToken(auth_code) {
    const request = require("request-promise")
    let optionUrl = "https://sandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        optionUrl = "https://clover.com"
    }
    const options = {
        method: "GET",
        url: `${optionUrl}/oauth/token?client_id=${cloverConfig.app_id}&client_secret=${cloverConfig.app_secret}&code=${auth_code}`,
        headers: { accept: "application/json" }
    }
    var result = await request(options)
    console.log(`Access Token = ${JSON.parse(result).access_token}`)
    return JSON.parse(result).access_token
}

async function getApiKey(access_token) {
    const request = require("request-promise")
    let urlOption = "https://apisandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        urlOption = "https://api.clover.com"
    }
    const options = {
        method: "GET",
        url: `${urlOption}/pakms/apikey`,
        headers: {
            accept: "application/json",
            authorization: `Bearer ${access_token}`
        }
    }

    let api_access_key = await request(options)
    return JSON.parse(api_access_key).apiAccessKey
}

async function getSourceCode(api_key, req) {
    const request = require("request-promise")
    let urlOption = "https://token-sandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        urlOption = "https://token.clover.com"
    }
    const options = {
        method: "POST",
        url: `${urlOption}/v1/tokens`,
        //headers: {accept: 'application/json', apiKey: 'db7b80d37e5b5988c1acff2a385d309d', 'content-type':'application/json'},
        headers: {
            accept: "application/json",
            apiKey: api_key,
            "content-type": "application/json"
        },
        body: {
            card: {
                number: req.body.cardNumber,
                exp_month: req.body.expMonth,
                exp_year: req.body.expYear,
                cvv: req.body.cvv
            }
        },
        json: true
    }
    try {
        let source_code = await request(options)
        console.log(`source_code =  ${JSON.stringify(source_code)}`)
        return source_code.id
    } catch (err) {
        console.log(`err = ${err}`)
        console.log("---")
        let splited = err.message.split("-")
        //console.log("err = ", JSON.parse(splited[1]))
        let errorMessage = JSON.parse(splited[1].trim()).error.message
        return { error: errorMessage }
        //console.log(`source code error = ${JSON.stringify(err.message)}`)
    }
}

async function getTaxRate() {
    let pool = mysql2.createPool(mysqlPoolConfig)
    let promisePool = pool.promise()
    let rate = await promisePool.query(`SELECT rate FROM asahi.tax WHERE id=1`)
    return rate[0][0].rate
    // var connection = mysql.createConnection(mysqlconfig)
    // connection.connect()
    // connection.query(`SELECT rate FROM asahi.tax WHERE id=1`, function (
    //     error,
    //     results
    // ) {
    //     return results[0].rate
    // })
    // connection.end()
}

async function createOrder(cart, access_token) {
    console.log(`cart = ${JSON.stringify(cart)}`)
    let items = []
    let totalPrice = 0
    for (let key in cart) {
        totalPrice += cart[key].basePrice * 100 * cart[key].qty
        items.push({
            amount: cart[key].basePrice * 100,
            currency: "usd",
            description: cart[key].name,
            quantity: cart[key].qty
        })
    }
    //items.push({type:'tax', amount:totalPrice*taxRate, currency:'usd', description: 'Tax', quantity:1})
    console.log(`items = ${items}`)
    const request = require("request-promise")
    let urlOption = "https://scl-sandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        urlOption = "https://scl.clover.com"
    }
    const options = {
        method: "POST",
        url: `${urlOption}/v1/orders`,
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${access_token}`
        },
        body: {
            //items: [{amount: 3000, currency: 'usd', description: 'salmon roll', quantity: 3}],
            items: items,
            currency: "usd",
            email: "dannydannyl@me.com"
        },
        json: true
    }
    let result = await request(options)
    return result.id
}

async function chargeOrder(access_token, source, orderId) {
    console.log(`before charge ${access_token} , ${source}`)
    const request = require("request-promise")
    let urlOption = "https://scl-sandbox.dev.clover.com"
    if (cloverConfig.server == "live") {
        urlOption = "https://scl.clover.com"
    }
    const options = {
        method: "POST",
        url: `${urlOption}/v1/orders/${orderId}/pay`,
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${access_token}`
        },
        body: {
            ecomind: "ecom",
            metadata: { newKey: "New Value" },
            source: source
        },
        json: true
    }
    try {
        let result = await request(options)
        //console.log(`result of chargeOrder = ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        let splited = err.message.split("-")
        //console.log("err = ", JSON.parse(splited[1]))
        let errorMessage = JSON.parse(splited[1].trim()).error.message
        return { error: errorMessage }
    }
}
async function storeInDB(charge, email, name, ip) {
    console.log("----charge data----")
    console.log(JSON.stringify(charge))

    // {"id":"A7JS93K4H1M6J",
    // "object":"order",
    // "amount":100,
    // "currency":"USD",
    // "charge":"Q2Y3PN89Y6KFM",
    // "created":1603644374000,
    // "ref_num":"029900500720",
    // "auth_code":"OK7173",
    // "items":[{"quantity":1,"amount":100,"description":"TEST"}],
    // "source":{"brand":"VISA","exp_month":"05","exp_year":"2024","first6":"440066","last4":"0674"},
    // "status":"paid",
    // "status_transitions":{"paid":1603644377877},"ecomind":"ecom"}
    let pool = mysql2.createPool(mysqlPoolConfig)
    let promisePool = pool.promise()
    let query = `INSERT INTO orders (order_id, amount, charge_id, charge_time, customer_name, customer_email, customer_ip, ref_num, auth_code, source_brand, source_exp_month, source_exp_year, source_first6, source_last4, charge_status, status_transition, live) VALUES ('${charge.id}', ${charge.amount}, '${charge.charge}', NOW(), '${name}', '${email}', '${ip}', '${charge.ref_num}', '${charge.auth_code}', '${charge.source.brand}', ${charge.source.exp_month}, ${charge.source.exp_year}, ${charge.source.first6}, ${charge.source.last4}, '${charge.status}', '${charge.status_transitions.paid}', 0)`
    if (cloverConfig.server == "live") {
        query = `INSERT INTO orders (order_id, amount, charge_id, charge_time, customer_name, customer_email, customer_ip, ref_num, auth_code, source_brand, source_exp_month, source_exp_year, source_first6, source_last4, charge_status, status_transition, live) VALUES ('${charge.id}', ${charge.amount}, '${charge.charge}', NOW(), '${name}', '${email}', '${ip}', '${charge.ref_num}', '${charge.auth_code}', '${charge.source.brand}', ${charge.source.exp_month}, ${charge.source.exp_year}, ${charge.source.first6}, ${charge.source.last4}, '${charge.status}', '${charge.status_transitions.paid}', 1)`
    }
    console.log(query)
    let doIt = await promisePool.query(query)
    let charged_itmes = charge.items
    let live = 0
    if (cloverConfig.server == "live") {
        live = 1
    }
    for (let i = 0; i < charged_itmes.length; i++) {
        query = `INSERT INTO order_items (order_id, name, quantity, amount, charge_time, live) VALUES('${charge.id}', '${charged_itmes[i].description}', ${charged_itmes[i].quantity}, ${charged_itmes[i].amount}, NOW(), ${live})`
        let doIt = await promisePool.query(query)
    }
    return
}

async function sendEmail(emailTo, orderId, customer, items) {
    let taxRate = await getTaxRate()
    let emailContent = `<div width='100%' style='min-width:640px; width:640px; border:15px solid #00000014; font-family:railway; color:black; height:auto; position: relative; display: table'>`
    emailContent += `<table class='header' style= 'width:640px; padding:20px 10px 0px 10px; position: relative; '><tbody>`
    emailContent += `<tr style='width:640px;'><td></td><td style='margin:auto; width:245px;'><a href='https://asahisushiolympia.com/'><img style='display:block; margin:0 auto; width:245px; border-bottom: 1px solid #7e7e7e; padding-bottom:8px;' src='https://asahisushiolympia.com/images/mainLogo.jpg'></a></td><td></td></tr>`
    emailContent += `<tr style='width:640px;'><td></td><td style='margin-top: 8px; width:245px; text-align:center; font-weight: bold; font-size:20px;'>Order Confirmation</td><td></td></tr>`
    emailContent += `</tbody></table>`
    emailContent += `<table style='padding:5px 15px; position: relative;'>`
    emailContent += `<tr class='Notice' style='color: rgb(253,140,0)'><td>`

    emailContent += `</td></tr>`
    emailContent += `<tr style='width:640px;'><td style='color: #2222229e; font-size:20px; text-align:center; width:640px;'>Dear ${customer.toUpperCase()}, Thank you for placing an online order. Your food will be ready within 20 minutes</td></tr>`
    emailContent += `</table>`
    emailContent += `<div style='width:100%; min-height:424px; position: relative;'>`
    emailContent += `<img id='imagefile' class='imagefile' style='width:100%; min-height:424px;' src='https://asahisushiolympia.com/images/home/home2.jpg'>`
    emailContent += `</div>`
    emailContent += `<table style='width:640px; padding:20px 0; position: relative;'><tbody><tr><td></td><td style='width: 400px; margin:auto; padding-bottom: 10px; color:rgb(253,140,0); text-align: center; font-size:27px;' >Order ID: ${orderId}</td><td></td></tr><tr><tr></td><td><td style='width: 400px; margin:auto; padding-bottom: 10px; color:#2222229e; text-align: center; font-size:17px;'>${new Date().toLocaleString(
        "en-US",
        { timeZone: "America/Los_Angeles" }
    )}</td></td></tr></tbody></table>`
    emailContent += `<table style='width: 600px; margin:auto; position: relative; display:table; text-align:center; border-spacing: 0;'>`
    let total = 0
    emailContent += `<tr style='background-color: #dcdcdc;'><th style='padding:15px;font-size:20px;'>Item</th><th style='padding:15px;font-size:20px;'>Qty</th><th style='padding:15px;font-size:20px;'>Price</th></tr>`
    for (let i = 0; i < items.length; i++) {
        total += (items[i].amount / 100) * items[i].quantity
        emailContent += `<tr>`
        emailContent += `<td style='padding:15px; font-size:18px; border-top: 1px solid #dcdcdc;'>${items[i].description}</td>`
        emailContent += `<td style='padding:15px; font-size:18px; border-top: 1px solid #dcdcdc;'>${items[i].quantity}</td>`
        emailContent += `<td style='padding:15px; font-size:18px; border-top: 1px solid #dcdcdc;'>${(
            items[i].amount / 100
        ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })}</td>`
        emailContent += `</tr>`
    }
    emailContent += `</table>`

    emailContent += `<table style='width: 600px; margin:auto; position: relative; display: table; font-size:18px; padding-top:15px;'>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 70%;'></td>`
    emailContent += `<td style='font-weight:600;'>Sub total</td>`
    emailContent += `<td>${total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}</td>`
    emailContent += `</tr>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 70%;'></td>`
    emailContent += `<td style='font-weight:600;'>Tax</td>`
    emailContent += `<td>${(total * taxRate).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}</td>`
    emailContent += `</tr>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 70%;'></td>`
    emailContent += `<td style='font-weight:600;'>Total</td>`
    emailContent += `<td>${(total * taxRate + total).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}</td>`
    emailContent += `</tr>`
    emailContent += `</table>`

    emailContent += `</div>`
    //console.log(`emailContent = ${emailContent}`)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: emailConfig
    })
    mailOptions = {
        from: "asahisushioly@gmail.com",
        to: emailTo,
        //to: 'dannydannyl@me.com',
        bcc: "dannydannyl@me.com",
        subject: "Asahi Sushi :: Order Confirmation",
        replyTo: "asahisushioly@gmail.com",
        html: emailContent
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return 0
        } else {
            return 1
        }
    })
}

module.exports = router
