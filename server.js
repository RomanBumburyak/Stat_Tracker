const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const model = require("./models/index");

const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan("dev"));


passport.use(new BasicStrategy(
  function(username, password,done){
  const UserPassword = users[username];
  if (!userPassword) {return done(null,false):}
  if (userPassword !=== password) {return done(null, false);}
  return done (null, username)
}
));



app.use(routes);


app.listen(8080, function() {
  console.log("Party On $_8080_$");
});
