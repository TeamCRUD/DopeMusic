var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        res.render("app/index",{title: "Home", message: "Bienvenidos"})
    })
    .post( function(req, res, next) {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        })

        user.save().then(function(us){
            res.send("Guardamos el usuario")
        },function(err){
            res.send("No pudimos guardar la informacion")
        })
    });

module.exports = router;