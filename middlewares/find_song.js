var Song = require("../models/song")

module.exports = function(req,res,next){
    Song.find({album: req.params.id},function(err,songs){
        if(err){
            return res.redirect("/dashboard")
        }else{
            res.locals.songs = songs
            next()
        }
    })
}