var Album = require('../models/album');

var fs = require("fs")

// render
exports.renderShowAlbum = function(req,res){
    res.render("app/album/show",{title: "Album "+res.locals.album.title, url: req.params.id})
}

exports.renderNewAlbum = function(req,res){
    if(res.locals.user.typeuser == "admin" ){
        res.render("app/album/new",{title: "Nuevo album"})
    }else{
        res.redirect("/dashboard")
    }
}

exports.renderEditAlbum = function(req,res){
    if(res.locals.user.typeuser == "admin" ){
        res.render("app/album/edit",{title: "Editar Album "+res.locals.album.title})
    }else{
        res.redirect("/dashboard")
    }
}

// rest
exports.allAlbum = function(req,res){
    Album.find({},function(err,albums){
        if(err){
            return res.redirect("/dashboard")
        }
        res.render("app/album/index",{title:"Biblioteca", albums: albums})
    })
}

exports.addAlbum =function(req,res){
    var data ={
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        creator: res.locals.user._id
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