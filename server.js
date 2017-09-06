const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

const model = require("./models/index");



const BasicStrategy = require('passport-http').BasicStrategy
const app = express();

const users = {
  'isaac': 'password'
}



// app.use(bodyParser.urlencoded({
//     extended: false
// }));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan("dev"));


passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));


 passport.serializeUser(function(user, done) {
   done(null, user.id)})


app.use("/api",routes);
app.use(routes);


app.listen(8080, function() {
  console.log("Party On $_8080_$")
})
