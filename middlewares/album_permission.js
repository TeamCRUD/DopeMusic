var Album = require("../models/album")

module.exports = function(album,req,res){
    if(typeof album.creator == "undefined") return false
    if(req.method === "GET" && req.path.indeOf("edit") < 0){
        return true
    }
    if(album.creator._id.toString() == res.locals.user._id){
        return true
    }
    return false
}