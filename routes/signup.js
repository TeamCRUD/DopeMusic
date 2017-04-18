var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        res.render("signup",{title: "Creators", message: "Datos personales"})
    })
    .post( function(req, res, next) {
        var user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
            password: req.body.password,
            sexo: req.body.sexo
        })

        user.save().then(function(us){
            res.redirect("/login")
        },function(err){
            res.render("signup", {title: "Creators", message: "Datos incorrectos"})
        })
    });

module.exports = router;