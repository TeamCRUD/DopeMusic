var Album = require("../models/album")

module.exports = function(req,res,next){
    Album.findById(req.params.id, function(err,album){
        if(album != null){
            res.locals.album = album
            next()
        }else{
            res.redirect("/dashboard")
        }
    })
}