var Song = require("../models/song")

exports.findAll = function(req,res,next){
    Song.find({album: req.params.id},function(err,songs){
        if(err){
            return res.redirect("/")
        }else{
            res.locals.songs = songs
            next()
        }
    })
}

exports.findOne = function(req, res, next){
    Song.findById(req.params.song, function(err, song){
        if(err){
            return res.redirect("/")
        }else{
            res.locals.song = song
            next()
        }
    })
}