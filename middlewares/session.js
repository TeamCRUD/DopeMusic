var User = require("../models/users")

exports.allAccess = function(req, res, next){
    if(!req.session.user_id){
        res.locals = {user : {username: false}}
        next()
        console.log(res.locals.allAccess)
    }
    else{
        User.findById(req.session.user_id,function(err,user){
            if(err){
                res.redirect("/login")
            }else{
                res.locals = {user : user}
                next()
            }
        })
    }
}

exports.session = function(req, res, next){
    if(!req.session.user_id){
        res.redirect('/login')
    }
    else{
        User.findById(req.session.user_id, function(err,user){1
            if(err){
                console.log(err)
                res.redirect('/')
            }else{
                res.locals = { user: user }
                next()
            }
        })
    }
}