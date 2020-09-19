var express = require('express');
var router = express.Router();

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
        res.json({auth_code : req.query.code})
    }
})

router.get('/proceed', async function(req,res,next){

        let auth_code = await getAuthCode()
        let access_token = await getAccessToken(auth_code)
        let api_key = await getApiKey(access_token)
        console.log(`final reuslt auth_code = ${auth_code}`)
        console.log(`final reuslt access_token = ${JSON.stringify(access_token)}`)
        console.log(`final reuslt api_key = ${JSON.stringify(api_key)}`)
        const clover = require('clover-ecomm-sdk')(access_token)
    

})

async function getAuthCode(){
    const request = require('request-promise');

    const options = {
            method: 'GET',
            url: `https://asahisushiolympia/clover/authorized`,
            headers: {accept: 'application/json'}
        };
    var result = await request(options);
    return JSON.parse(result).auth_code
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

module.exports = router;