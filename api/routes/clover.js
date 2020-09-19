var express = require('express');
var router = express.Router();

let auth_code = undefined

//const clover = require('clover-ecomm-sdk')(access_token)

router.get('/unauthorized', function(req,res,next){
    let client_id = 'SJD3F92ASG2GG'
    res.redirect(`https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`)
})

router.get('/authorized', async function(req,res,next){
    if(!req.query.code){
        let client_id = 'SJD3F92ASG2GG'
        res.redirect(`https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/clover/authorized`)
    }else{
        auth_code = req.query.code
        //res.json({auth_code : req.query.code})
    }
})

router.post('/proceed', async function(req,res,next){

        //let auth_code = await getAuthCode()
        let access_token = await getAccessToken(auth_code)
        let api_key = await getApiKey(access_token)
        let source = await getSourceCode(api_key, req)
        let orderId = await createOrder(req.body.cart, access_token)
        let charge = await chargeOrder(access_token, source, orderId)
        console.log(`final reuslt auth_code = ${auth_code}`)
        console.log(`final reuslt access_token = ${JSON.stringify(access_token)}`)
        console.log(`final reuslt api_key = ${JSON.stringify(api_key)}`)
        console.log(`final reuslt source = ${JSON.stringify(source)}`)

})

async function getAuthCode(){
    const request = require('request-promise');

    const options = {
            method: 'GET',
            url: `https://asahisushiolympia.com/clover/authorized`,
            headers: {accept: 'application/json'}
        };
    var result = await request(options);
    console.log(`getAuthCode result = ${result}`)
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
        headers: {accept: 'application/json', apiKey: 'db7b80d37e5b5988c1acff2a385d309d', 'content-type':'application/json'},
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
    let source_code = await request(options)
    return source_code.id
}

async function createOrder(cart, access_token){
    console.log(`cart = ${JSON.stringify(cart)}`)
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
          items: [{amount: 3000, currency: 'usd', description: 'salmon roll', quantity: 3}],
          currency: 'usd'
        },
        json: true
    };
    let result = await request(options)
    console.log(`result of create order = ${JSON.stringify(result)}`)
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
            //email: 'dannydannyl@me.com',
            source: source
        },
        json: true
    };
    let result = await request(options)
    console.log(`result of chargeOrder = ${JSON.stringify(result)}`)
    return result
}

module.exports = router;