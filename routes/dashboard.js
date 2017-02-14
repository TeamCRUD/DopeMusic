var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        res.render("app/index",{title: "Home", message: "Bienvenidos"})
    })

module.exports = router;