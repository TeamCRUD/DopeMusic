var express = require('express');
var router = express.Router();

var User = require("../models/users")
var Album = require("../models/album")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        Album.find({})
            .populate('creator')
            .exec(function(err,albums){
                if(err) console.log(err)
                res.render('index', { title: 'Creator', albums: albums});
})
    })

module.exports = router;