const express = require("express");
const router = express.Router();
const models= require("../models/index");

///////////////////////////////////

var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
const users = {
  'roman': 'password'
}


///////////////////////////////////

//this is how you authorize an endpoint
app.get('/api/auth',
passport.authenticate(basic, {session: false});
function (req,res){
  res.json({"hello": req.user})
}
);
/////////////////////////////
 //GET	/activities	Show a list of all activities I am tracking, and links to their individual pages

 router.get(
