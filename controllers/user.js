var User = require('../models/users');

exports.updateUser = function(req,res){
        res.locals.user.fullname = req.body.fullname
        res.locals.user.username = req.body.username
        res.locals.user.email = req.body.email
        res.locals.user.phone = req.body.phone
        res.locals.user.gender = req.body.gender
        res.locals.user.typeuser = req.body.typeuser
        res.locals.user.city = req.body.city
        res.locals.user.network.facebook = req.body.facebook
        res.locals.user.network.twitter = req.body.twitter
        res.locals.user.network.instagram = req.body.instagram
        res.locals.user.network.youtube = req.body.youtube
        res.locals.user.network.other = req.body.other
        res.locals.user.save().then(function(us){
            res.redirect('/user')
        },function(err){
            res.redirect('/user/'+req.paramas.id+'/edit')
        })
    }