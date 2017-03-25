var express = require('express');
var router = express.Router();

var User = require("../models/users")
var Album = require("../models/album")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        Album.find({},function(err, albums){
            res.render("app/index",{title: "Incio", message: "Bienvenidos", albums: albums})
        })
    })

module.exports = router;