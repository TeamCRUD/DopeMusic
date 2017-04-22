var express = require('express');
var router = express.Router();

var Album = require('../models/album');

router.route("/")
    .get(function(req, res, next){
        res.render("collection/default")
    })

module.exports = router;