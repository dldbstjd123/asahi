var express = require('express');
var router = express.Router();

let auth_code = undefined //|| '3a149af4-2c25-ea26-f992-97b1a2852306'

//const clover = require('clover-ecomm-sdk')(access_token)

router.get('/unauthorized', function(req,res,next){
    let client_id = 'SJD3F92ASG2GG'
    res.redirect(`https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`)
})

router.get('/authorized', async function(req,res,next){
    if(!req.query.code){
        //Change Client_ID WHEN SWITCHING TO PRODUCTION
        let client_id = 'SJD3F92ASG2GG'
        res.redirect(`https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`)
    }else{
        auth_code = req.query.code
        console.log('*****************STORE THIS ACCESS TOKEN ****************')
        console.log(auth_code)
        console.log('*****************STORE THIS ACCESS TOKEN ****************')
        //res.json({auth_code : req.query.code})
    }
})

router.post('/proceed', async function(req,res,next){
        let access_token = '96f8d7cd-dc30-1185-47b3-83a2ae91df64'
        console.log(`final reuslt access_token = ${JSON.stringify(access_token)}`)
        let api_key = await getApiKey(access_token)
        console.log(`final reuslt api_key = ${JSON.stringify(api_key)}`)
        let source = await getSourceCode(api_key, req)
        console.log(`final reuslt source = ${JSON.stringify(source)}`)
        let orderId = await createOrder(req.body.cart, access_token)
        console.log(`final reuslt orderId = ${orderId}`)
        let charge = await chargeOrder(access_token, source, orderId)
        console.log(`final reuslt charge = ${JSON.stringify(charge)}`)

})

async function getAuthCode(){
    const request = require('request-promise');
    const options = {
            method: 'GET',
            url: `https://asahisushiolympia.com/clover/authorized`,
            headers: {accept: 'application/json'}
        };
    var result = await request(options);
    return JSON.parse(result)
}

async function getAccessToken(auth_code){
    const request = require('request-promise');

    const options = {
            method: 'GET',
            url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${auth_code}`,
            headers: {accept: 'application/json'}
        };
    var result = await request(options);
    return JSON.parse(result).access_token
}

async function getApiKey(access_token){
    const request = require('request-promise');
    const options = {
    method: 'GET',
    url: 'https://apisandbox.dev.clover.com/pakms/apikey',
    headers: {accept: 'application/json', authorization: `Bearer ${access_token}`}
    };

    let api_access_key = await request(options)
    return JSON.parse(api_access_key).apiAccessKey
}

async function getSourceCode(api_key, req){
    const request = require('request-promise');
    const options = {
        method: 'POST',
        url: 'https://token-sandbox.dev.clover.com/v1/tokens',
        //headers: {accept: 'application/json', apiKey: 'db7b80d37e5b5988c1acff2a385d309d', 'content-type':'application/json'},
        headers: {accept: 'application/json', apiKey: api_key, 'content-type':'application/json'},
        body: {
            card:{
                number: req.body.cardNumber, 
                exp_month: req.body.expMonth,
                exp_year: req.body.expYear,
                cvv: req.body.cvv
            }
        },
        json:true
    };
    try{
        let source_code = await request(options)
        return source_code.id
    }catch(err){
        console.log(`source code error = ${err.message}`)
    }
    
}

async function createOrder(cart, access_token){
    console.log(`cart = ${JSON.stringify(cart)}`)
    let items = []
    for(let key in cart){
        items.push({amount: cart[key].basePrice * 100, currency: 'usd', description: cart[key].name, quantity: cart[key].qty })
    }
    console.log(`items = ${items}`)
    const request = require('request-promise');
    const options = {
        method: 'POST',
        url: 'https://scl-sandbox.dev.clover.com/v1/orders',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${access_token}`
        },
        body: {
          //items: [{amount: 3000, currency: 'usd', description: 'salmon roll', quantity: 3}],
          items: items,
          currency: 'usd',
          email: 'dannydannyl@me.com'
        },
        json: true
    };
    let result = await request(options)
    return result.id
}

async function chargeOrder(access_token, source, orderId){
    console.log(`before charge ${access_token} , ${source}`)
    const request = require('request-promise');
    const options = {
        method: 'POST',
        url: `https://scl-sandbox.dev.clover.com/v1/orders/${orderId}/pay`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${access_token}`
        },
        body: {
            ecomind: 'ecom',
            metadata: {newKey: 'New Value'},
            source: source
        },
        json: true
    };
    let result = await request(options)
    //console.log(`result of chargeOrder = ${JSON.stringify(result)}`)
    return result
}

module.exports = router;