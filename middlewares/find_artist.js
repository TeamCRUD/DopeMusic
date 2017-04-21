var User = require("../models/users")
module.exports = function(req,res,next){
    User.findOne({username: req.params.artist}, function(err, artist){
        if(err){
            return res.redirect("/")
        }else{
            res.locals.artist = artist
            next()
        }
    })
}