var Album = require("../models/album")
var owner_check = require("./album_permission")
module.exports = function(req,res,next){
    Album.findById(req.params.id)
        .populate("creator")
        .exec(function(err,album){
            if(album != null && owner_check(album,req,res)){
                res.locals.album = album
                next()
            }else{
                res.redirect("/dashboard")
            }
        })
}