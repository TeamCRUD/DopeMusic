var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        res.render("signup",{title: "Creators", message: "Datos personales"})
    })
    .post( function(req, res, next) {
        res.redirect("/login")
        /*var user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        user.save().then(function(us){
            res.redirect("/login")
        },function(err){
            res.render("signup", {title: "Creators", message: "Datos incorrectos"})
            console.log(err)
        })*/
    });

module.exports = router;