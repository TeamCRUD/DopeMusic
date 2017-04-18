var Album = require('../models/album');
var fs = require("fs")
var path = require('path')
var multer = require("multer")

var d=  new Date()
var covername = d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() 

var opcionesMulter = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, "../covers"))
  },
  filename: function(req, file, cb){
    cb(null, covername+''+file.originalname)
  }
})

var upload = multer({storage: opcionesMulter})

// render
exports.renderShowAlbum = function(req,res){
    res.render("album/show",{title: "Album "+res.locals.album.title, url: req.params.id})
}

exports.renderNewAlbum = function(req,res){
    res.render("album/new",{title: "Nuevo album"})
}

exports.renderEditAlbum = function(req,res){
    res.render("album/edit",{title: "Editar Album "+res.locals.album.title})
}

// rest
exports.allAlbum = function(req,res){
    Album.find({creator: res.locals.user._id},function(err,albums){
        if(err){
            return res.redirect("/")
        }
        res.render("collection/albums",{title:"Mis Albums", albums: albums})
    })
}

exports.addAlbum = function(req,res){
    if(req.body.public){
        var AlbumPublic = true
    }else{
        var AlbumPublic = false
    }
    if(req.file.mimetype != 'image/png' || req.file.mimetype != 'image/png' && req.file.size >= 47236){
        fs.unlink("./covers/"+ covername + req.file.originalname)
        res.redirect('/album/new')
    }else{
        var data ={
            title: req.body.title,
            description: req.body.description,
            cover: covername + '' + req.file.originalname,
            date:{
                day: req.body.day,
                month: req.body.month,
                year: req.body.year
            },
            gender: req.body.gender,
            creator: res.locals.user._id,
            public: AlbumPublic
        }

        var album = new Album(data)
        
        album.save().then(function(us){
            res.redirect("/album")
        },function(err){
            res.redirect("/album/new")
        })
    }
}

exports.uploadCover = upload.single("cover")

exports.updateAlbum = function(req,res){
    if(req.body.public){
        var AlbumPublic = true
    }else{
        var AlbumPublic = false
    }
    res.locals.album.title = req.body.title
    res.locals.album.description = req.body.description
    res.locals.album.date.day = req.body.day
    res.locals.album.date.month = req.body.month
    res.locals.album.date.year = req.body.year
    res.locals.album.gender = req.body.gender
    res.locals.album.public = AlbumPublic

    res.locals.album.save().then(function(us){
        res.redirect("/album")
    },function(err){
        res.redirect("/album/"+req.params.id+"/edit")
    })
}

exports.deleteAlbum = function(req,res){
    Album.findByIdAndRemove({_id: req.params.id},function(err){
        if(!err){
            res.redirect("/album")
        }
    })
    
    fs.unlink("./covers/"+res.locals.album.cover)
}