const express = require("express");
const router = express.Router();
const models= require("../models/index");
const Activity = require("../models/index").Activity;
const Stat = require("../models/index").Stat;

const passport = require('passport')


///////////////////////////////////

router.get('/api/auth',
passport.authenticate('basic', {session: false}),
function (req,res){
  res.json({"hello": req.user})
}
);
/////////////////////////////

////////////////////////////


router.get("/activities", passport.authenticate('basic', {session: false}), function (req,res){
  Activity.findAll({})
  .then (function (data){
     res.json({data: data })
  })
  .catch(function(err){
         res.json(err)
    })

})
//////////////////////////
// POST	/activities	Create a new activity for me to track.
router.post("/activities", passport.authenticate('basic', {session: false}), function(req,res){
  Activity.create({
    name: req.body.name,
    measurement: req.body.measurement
  })
  .then(function (data) {
    res.json({data:data })
  })
})
////////////////////////////////////
// GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.

router.get("/activities/:id",passport.authenticate('basic', {session: false}), function(req,res){
  Activity.findAll({
    include: [{
    model: model.Stat,
    as: 'Activity' // specifies how we want to be able to access our joined rows on the returned data
  }]
  .then(function(data){
    res.json({data:data })
  })
  })

})
////////////////////////////////
// PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
 router.put("/activities/:id", passport.authenticate('basic', {session: false}), function(req, res) {
   models.Activity.update({
     name: req.body.name,
     measurement: req.body.measurement},
     {
       where: {id: req.params.id}
     })
     .then(function(data) {
       data = {"status": "success", data: data};
       res.setHeader("Content-Type", "application/json");
       res.status(201).json(data);
     })
     .catch(function(err) {
       err = {"status": "fail", error: err};
       res.status(500).send(err);
     })
   });








////////////////////////////////
// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.post("/activities/:id/stats",passport.authenticate('basic', {session: false}),function (req,res){
  Activity.findOne({
    where: {
      id: req.params.id
    }
    .then(function(data){
      Stat.create({
        activityId: req.params.activityId,
        quantity: req.body.quantity
      })
      .then(function(data){

      })
    })
  })


})






// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.



















// DELETE	/stats/{id}	Remove tracked data for a day.

router.delete("/stats/:id", passport.authenticate('basic', {session: false}), function(req, res) {
  Stat.destroy(
    {where: {id: req.params.id}}
  )
  .then(function(data) {
    data = {"status": "success", data: data};
    res.setHeader("Content-Type", "application/json");

  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).send(err);
  })
});






module.exports = router;
