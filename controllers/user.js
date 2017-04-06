var User = require('../models/users')
var fs = require("fs")
var path = require('path')
var multer = require("multer")

var d=  new Date()
var avatarname = d.getHours()+''+d.getMinutes()

var opcionesMulter = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, "../avatars"))
  },
  filename: function(req, file, cb){
    cb(null, avatarname+''+file.originalname)
  }
})

var upload = multer({storage: opcionesMulter})

exports.updateUser = function(req,res){
        
        if(res.locals.user.avatar != 'default.png'){

          //fs.unlink("./avatars/"+res.locals.user.avatar)
        }

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
        //res.locals.user.avatar = avatarname + req.file.originalname
        res.locals.user.avatar = 'default.png'

        res.locals.user.save().then(function(us){
            res.redirect('/user')
        },function(err){
            res.redirect('/user/'+req.paramas.id+'/edit')
        })
    }

    exports.uploadAvatar = upload.single("avatar")