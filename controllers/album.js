var Album = require('../models/album');
var fs = require("fs")

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
    Album.find({},function(err,albums){
        if(err){
            return res.redirect("/")
        }
        res.render("album/index",{title:"Biblioteca", albums: albums})
    })
}

exports.addAlbum =function(req,res){
    if(req.body.public){
        var AlbumPublic = true
    }else{
        var AlbumPublic = false
    }
    console.log(AlbumPublic)
    var data ={
        title: req.body.title,
        description: req.body.description,
        date: req.body.day+","+req.body.month+","+req.body.year,
        year: req.body.year,
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

exports.updateAlbum = function(req,res){
    res.locals.album.title = req.body.title
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
}