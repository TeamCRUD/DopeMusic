var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* GET home page. */
router.route("/")
  .get(function(req, res, next) {
    res.render("login",{title: "Creators", message: "Bienvenido"})
  })
  .post(function(req, res, next) {
    User.findOne({username: req.body.username, password: req.body.password},function(err,user){
      if(err){
        return res.status(500).send()
      }
      if(!user){
        res.render("login",{title: "Creators", message: "Datos incorrectos"})
        return res.status(404).send()
      }else{
        req.session.user_id = user._id
        res.redirect("/")
      }
    })
  });

module.exports = router;