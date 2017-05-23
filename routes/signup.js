var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../creators-32557-firebase-adminsdk-tynmc-0e48b61bf0.json");

var defaultConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://creators-32557.firebaseio.com"
}

var defaultApp = admin.initializeApp(defaultConfig);

var defaultAuth = defaultApp.auth()
var defaultDatabase = defaultApp.database()

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
            username: req.body.username,
            password: req.body.password
        })

        user.save().then(function(us){
            defaultAuth.createUser({
                email: req.body.email,
                password: req.body.password,
                displayName: req.body.fullname
            })
            .then(function(userRecord) {
                var ref = defaultDatabase.ref("users/"+ userRecord.uid)
                ref.set({
                    email: req.body.email,
                    name: req.body.fullname
                })
                .then(function() {
                    console.log("Successfully created new user:", userRecord.uid);
                    res.redirect("/login")
                })
            })
        },function(err){
            res.render("signup", {title: "Creators", message: "Datos incorrectos"})
        })
    });

module.exports = router;