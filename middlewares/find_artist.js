var User = require("../models/users")
module.exports = function(req,res,next){
    User.findOne({username: req.params.artist}, function(err, user){
        if(err){
            return res.redirect("/")
        }else{
            res.locals.user = user
            next()
        }
    })
}