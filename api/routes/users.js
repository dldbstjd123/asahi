var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const {jwt_config} = require('../../ignore/jwt_config');
const User = require('../models/userModel');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    const {email, password} = req.body;
    
    //validate
    if(!email || !password){
      return res.status(400).json({ msg: "Validation failed"})
    }
    const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).json({ msg: "This account is registered."})
    }
    if(user.password != password){
      return res.status(400).json({ msg: "Invalid credentials."})
    }
    const token = jwt.sign({id:user._id}, jwt_config);
    console.log(token)
    res.json({
      toekn,
      user_id: user._id
    })
    
  }catch(err){
    res.status(500).json({err:err.massege});
  }
  res.send('respond with a resource');
});

module.exports = router;
