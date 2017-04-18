var express = require('express');
var router = express.Router();

var Album = require("../models/album")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
         Album.find({})
            .populate('creator')
            .exec(function(err,albums){
                if(err) console.log(err)
                res.render('explorer/default', { title: 'Creator', albums: albums});
            })
    })

router.route('/:tag')
    .get(function(req, res, next){
        if(res.locals.user.username){
            Album.find({gender: req.params.tag})
                .populate('creator')
                .exec(function(err,albums){
                    if(err) console.log(err)
                    res.render('explorer/tag', { title: req.params.tag, albums: albums});
                })
        }else{
            Album.find({gender: req.params.tag, public: true})
                .populate('creator')
                .exec(function(err,albums){
                    if(err) console.log(err)
                    res.render('explorer/tag', { title: req.params.tag, albums: albums});
                })
        }
    })
module.exports = router;