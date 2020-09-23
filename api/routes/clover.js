var express = require("express")
var router = express.Router()
var mysql = require("mysql")
const { mysqlconfig, emailConfig } = require("../../ignore/config.js")
var nodemailer = require("nodemailer")

let auth_code = undefined //|| '3a149af4-2c25-ea26-f992-97b1a2852306'

//const clover = require('clover-ecomm-sdk')(access_token)

router.get("/unauthorized", function (req, res, next) {
    let client_id = "SJD3F92ASG2GG"
    res.redirect(
        `https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`
    )
})

router.get("/authorized", async function (req, res, next) {
    if (!req.query.code) {
        //Change Client_ID WHEN SWITCHING TO PRODUCTION
        let client_id = "SJD3F92ASG2GG"
        res.redirect(
            `https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`
        )
    } else {
        auth_code = req.query.code
        console.log("*****************STORE THIS ACCESS TOKEN ****************")
        console.log(auth_code)
        console.log("*****************STORE THIS ACCESS TOKEN ****************")
        //res.json({auth_code : req.query.code})
    }
})

router.post("/proceed", async function (req, res, next) {
    let access_token = "96f8d7cd-dc30-1185-47b3-83a2ae91df64"
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
    console.log(`final reuslt charge = ${JSON.stringify(charge)}`)
    if (charge.id) {
        res.json({ status: 1, items: charge.items, id: charge.id })
        sendEmail(req.body.email, charge.id, req.body.name)
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
        "yoon jung"
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

    const options = {
        method: "GET",
        url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${auth_code}`,
        headers: { accept: "application/json" }
    }
    var result = await request(options)
    return JSON.parse(result).access_token
}

async function getApiKey(access_token) {
    const request = require("request-promise")
    const options = {
        method: "GET",
        url: "https://apisandbox.dev.clover.com/pakms/apikey",
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
    const options = {
        method: "POST",
        url: "https://token-sandbox.dev.clover.com/v1/tokens",
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
        return source_code.id
    } catch (err) {
        let splited = err.message.split("-")
        let errorMessage = JSON.parse(splited[1].trim()).error.message
        return { error: errorMessage }
        //console.log(`source code error = ${JSON.stringify(err.message)}`)
    }
}

function getTaxRate() {
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect()
    connection.query(`SELECT rate FROM asahi.tax WHERE id=1`, function (
        error,
        results
    ) {
        return results[0].rate
    })
    connection.end()
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
    const options = {
        method: "POST",
        url: "https://scl-sandbox.dev.clover.com/v1/orders",
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
    const options = {
        method: "POST",
        url: `https://scl-sandbox.dev.clover.com/v1/orders/${orderId}/pay`,
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
    let result = await request(options)
    //console.log(`result of chargeOrder = ${JSON.stringify(result)}`)
    return result
}

function sendEmail(emailTo, orderId, customer) {
    let emailContent = `<div width='100%' style='min-width:640px; width:640px; border:15px solid #00000014; font-family:railway; color:black; height:auto; position: relative; display: table'>`
    emailContent += `<table class='header' style= 'width:640px; padding:20px 10px 0px 10px; position: relative; '><tbody>`
    emailContent += `<tr style='width:640px;'><td></td><td style='margin:auto; width:245px;'><a href='https://asahisushiolympia.com/'><img style='display:block; margin:0 auto; width:245px; border-bottom: 1px solid #7e7e7e; padding-bottom:8px;' src='https://asahisushiolympia.com/images/mainLogo.svg'></a></td><td></td></tr>`
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
    emailContent += `<table style='width:640px; padding:20px 0; position: relative;'><tbody><tr><td></td><td style='width: 400px; margin:auto; padding-bottom: 10px; color:rgb(253,140,0); text-align: center; font-size:27px;' >${orderId}</td><td></td></tr><tr><tr></td><td><td style='width: 400px; margin:auto; padding-bottom: 10px; color:#2222229e; text-align: center; font-size:17px;'>${new Date().toLocaleString(
        "en-US",
        { timeZone: "America/Los_Angeles" }
    )}</td></td></tr></tbody></table>`
    emailContent += `<table class='fabricList' style='width: 600px; margin:auto; position: relative; display:table-row'>`

    emailContent += `<tr>`
    emailContent += `<td style='width:171px; height: 144px;'>`
    emailContent += `<a href="https://asahisushiolympia.com"><img src="theLink" style='width: 171px; height: 144px; margin-left:10px;'></a>`
    emailContent += `</td>`
    emailContent += `<td style='width:350px; height: 72px; vertical-align: top;'>`
    emailContent += `<span style='color:rgb(253,140,0); font-family:railway; font-size:25px;'>Item Name</span>`
    emailContent += `<br>`
    emailContent += `<span style='font-size:11px; font-family:railway; font-size:20px;'>Price: $13.00</span>`
    emailContent += `<br>`
    emailContent += `<span style='font-size:11px; font-family:railway; font-size:20px;'>Quantity: 2</span>`
    emailContent += `<br>`
    emailContent += `</td>`
    emailContent += `</tr>`
    emailContent += `</table>`

    emailContent += `<table style='width: 600px; margin:auto; position: relative; display: table-row;'>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 80%;'></td>`
    emailContent += `<td>Sub total</td>`
    emailContent += `<td>$26.00</td>`
    emailContent += `</tr>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 80%;'></td>`
    emailContent += `<td>Tax</td>`
    emailContent += `<td>$2.35</td>`
    emailContent += `</tr>`
    emailContent += `<tr>`
    emailContent += `<td style='width: 80%;'></td>`
    emailContent += `<td>Total</td>`
    emailContent += `<td>$28.35</td>`
    emailContent += `</tr>`
    emailContent += `</table>`

    emailContent += `</div>`
    console.log(`emailContent = ${emailContent}`)
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
