var express = require('express');
var router = express.Router();

var User = require("../models/users")
var Album = require("../models/album")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        if(res.locals.user.username){
            Album.find({})
                .populate('creator')
                .exec(function(err,albums){
                    if(err) console.log(err)
                    res.render('index', { title: 'Creator', albums: albums});
                })
        }else{
            Album.find({public: true})
                .populate('creator')
                .exec(function(err,albums){
                    if(err) console.log(err)
                    res.render('index', { title: 'Creator', albums: albums});
                })
        }
    })

module.exports = router;