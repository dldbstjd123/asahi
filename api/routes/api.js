var express = require('express');
var router = express.Router();
const request = require('request')


//TESTING KEYS
const merchant_id = '97WKE1CHM2N81'

let client_id = 'SJD3F92ASG2GG'
//const auth_code = '23027da9-74a6-4470-c4a0-7482e451c3b0' //you get this when you request https://sandbox.dev.clover.com/oauth/authorize?client_id={appId}
let auth_code = '8cbc5621-59d0-1ffe-19db-e7eba0a8380c'

//const access_token = '006f59fa-67c9-67ec-6d12-9f6c70a7ac84' //you get this when you request https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=23027da9-74a6-4470-c4a0-7482e451c3b0'
let access_token = '0ab398a7-26ea-a738-9ad4-341883c0199c'
let api_access_key = 'db7b80d37e5b5988c1acff2a385d309d' //you get this when you request https://apisandbox.dev.clover.com/pakms/apikey
let cardToken = ""

/* GET home page. */

router.get('/unauthorized',function(req,res,next){
    console.log('/api/unauthorized')
    res.redirect(`https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/api/authorized`)
})
router.get('/unauthorizedCode',function(req,res,next){
    auth_code = req.query.code
    console.log(`auth_code = ${auth_code}`)
    const request = require('request');

    const options = {
    method: 'GET',
    url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${auth_code}`,
    headers: {accept: 'application/json'}
    };

    console.log(options.url)
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(`body = ${JSON.parse(body).access_token}`)
    access_token = JSON.parse(body).access_token
    console.log(`access_token = ${JSON.parse(body).access_token}`); //return access_token
    res.redirect("/api/getapikey")
    //res.redirect("/api/payOrder")
    })

    //res.redirect('/api/getaccesstoken')
})

router.get('/getaccesstoken', function(req, res, next) {
    console.log('api/getaccesstoken!')

    const request = require('request');

    const options = {
    method: 'GET',
    url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${auth_code}`,
    headers: {accept: 'application/json'}
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    access_token = body.access_token
    console.log(`access_token = ${body.access_token}`); //return access_token
    res.redirect("/api/getapikey")
    //res.redirect("/api/payOrder")
    })
    
});

router.get('/getapikey', function(req, res, next) {
    console.log('api/getapikey!')

    const request = require('request');

    const options = {
    method: 'GET',
    url: 'https://apisandbox.dev.clover.com/pakms/apikey',
    headers: {accept: 'application/json', authorization: `Bearer ${access_token}`}
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    api_access_key = JSON.parse(body).apiAccessKey
    console.log(`api key = ${body}`);
    console.log(`api_access_key = ${api_access_key}`)
    res.redirect("/api/payOrder")
    })
    
});

router.get('/createOrder', function(req, res, next) {
    console.log('api/createOrder!')

    const request = require('request');

    const options = {
    method: 'GET',
    url: 'https://apisandbox.dev.clover.com/pakms/apikey',
    headers: {accept: 'application/json', authorization: 'Bearer {adf538a5-50e3-5a2d-df1a-fe78dd507d2e}'}
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    })
    // const options = {
    //     method: 'POST',
    //     url: 'https://sandbox.dev.clover.com/v3/merchants/97WKE1CHM2N81/orders',
    //     qs:{access_token: '4bfd4113-d7ca-c030-94ec-2fb01f2c788f'},
    //     headers: {'content-type': 'application/json'},
    //     body: {
    //     //   orderType: {
    //     //     taxable: 'false',
    //     //     isDefault: 'false',
    //     //     filterCategories: 'false',
    //     //     isHidden: 'false',
    //     //     isDeleted: 'false'
    //     //   },
    //       taxRemoved: 'false',
    //       currency:'USD',
    //       total: 1000,
    //       paymentState: 'OPEN',
    //       title:'TEST',
    //       testMode: true

    //     },
    //     json: true
    //   };
      
    //   request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
      
    //     console.log(body);
    //   });
});

router.post('/charge', function(req, res, next) {
    console.log('/charge requested')
    try {
        // Parse a JSON
        userData = JSON.parse(JSON.stringify({card: JSON.parse(JSON.stringify(req.body))})); 
        console.log(`user Data = ${JSON.stringify(userData)}`)
    } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the payload
        // So just return that
        console.log(`e = ${e}`)
        userData = req.body;
    }
    
    

    const request = require('request');

    let options = {
        method: 'GET',
        url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${auth_code}`,
        headers: {accept: 'application/json'}
    };
    
    console.log(options.url)
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(`body = ${JSON.parse(body).access_token}`)
        access_token = JSON.parse(body).access_token
        console.log(`access_token = ${JSON.parse(body).access_token}`); //return access_token
        //res.redirect("/api/payOrder")
    })

    options = {
        method: 'GET',
        url: 'https://scl-sandbox.dev.clover.com/v1/orders',
        qs: {created: '[object Object]', status_transitions: '[object Object]'},
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${access_token}`
        }
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(`get Order = ${JSON.stringify(body)}`);
      });


    options = {
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
    console.log(options)

    request(options, function (error, response, body) {
    if (error) throw new Error(`error = ${error}`);
    console.log(`body = ${JSON.stringify(body)}`);
    cardToken = body.id
    console.log(`req.body.cardNumber = ${req.body.cardNumber}`)
    console.log(`cardToken = ${cardToken}`)
    if(cardToken !== undefined){
        //res.redirect('/api/unauthorized')

        options = {
            method: 'POST',
            url: 'https://scl-sandbox.dev.clover.com/v1/orders/BS0PV4S6KN3DG/pay',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${access_token}`
            },
            body: {
                ecomind: 'ecom',
                metadata: {newKey: 'New Value'},
                //email: 'dannydannyl@me.com',
                source: cardToken
            },
            json: true
        };
        
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(`payOrder return = ${JSON.stringify(body)}`);
        });
            
    }
    })
});

router.get("/payOrder", function(req, res, next){
    console.log(`payOrder access_token = ${access_token}`)
    console.log(`payOrder cardToken = ${cardToken}`)
    const request = require('request');

    const options = {
    method: 'POST',
    url: 'https://scl-sandbox.dev.clover.com/v1/orders/BS0PV4S6KN3DG/pay',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${api_access_key}`
    },
    body: {
        ecomind: 'ecom',
        metadata: {newKey: 'New Value'},
        //email: 'dannydannyl@me.com',
        source: cardToken
    },
    json: true
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(`payOrder return = ${JSON.stringify(body)}`);
    });
})

router.get("/payment", function(req, res, next){
    getAuthCode();
});

router.get("/authorized", async function(req, res, next){
    let accessToken = undefined
    if(!req.query.code){
        console.log('unauthorized!!!')
    }else{
        accessToken = await getAccessToken(req.query.code)
        payOrder(accessToken)
    }
});

function getAuthCode(){
    const request = require('request');
    const options = {
        method: 'GET',
        url: `https://sandbox.dev.clover.com/oauth/authorize?client_id=${client_id}&redirect_uri=https://asahisushiolympia.com/api/authorized`,
        headers: {accept: 'application/json'}
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    })
}

function getAccessToken(authCode){
    console.log('order 1 Get Access Token')
    const request = require('request');

    const options = {
        method: 'GET',
        url: `https://sandbox.dev.clover.com/oauth/token?client_id=SJD3F92ASG2GG&client_secret=2b6b918c-8530-942f-c0f8-ea178014c086&code=${authCode}`,
        headers: {accept: 'application/json'}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(`body = ${JSON.parse(body).access_token}`)
        return JSON.parse(body).access_token
    })
}

function payOrder(accessToken){
    console.log('order 2 Pay Order')
    const request = require('request');

    const options = {
    method: 'POST',
    url: 'https://scl-sandbox.dev.clover.com/v1/orders/BS0PV4S6KN3DG/pay',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`
    },
    body: {
        ecomind: 'ecom',
        metadata: {newKey: 'New Value'},
        //email: 'dannydannyl@me.com',
        source: 'clv_1TSTSpU43jZ3cfWP7oFMFgf3'
    },
    json: true
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(`payOrder return = ${JSON.stringify(body)}`);
    });
}
  
module.exports = router;