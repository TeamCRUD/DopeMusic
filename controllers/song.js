var path = require('path');
var fs = require("fs")
var Song = require('../models/song');
var multer = require("multer")

var opcionesMulter = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, "../songs"))
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

var upload = multer({storage: opcionesMulter})

// render
exports.renderNewSong = function(req,res){
    res.render("song/new",{title: "Nuevo cancion"})
}

exports.renderEditSong= function(req,res){
    res.render("app/song/edit",{title: "Editar Cancion "+res.locals.album.title})
}

// rest
exports.addSong = function(req,res){
    var song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        song: req.file.filename,
        album: req.params.id,
    })
    
    song.save().then(function(us){
        res.redirect("/album")
    },function(err){
        res.redirect("/album/"+req.params.id+"/song/"+req.params.song)
    })
}

exports.uploadSong = upload.single("song")

exports.updateSong = function(req,res){
    res.locals.song.title = req.body.title
    res.locals.song.save().then(function(us){
        res.redirect("/album")
    },function(err){
        res.redirect("/album/"+req.params.id+"/song/"+req.params.song)
    })
}

exports.deleteSong = function(req,res){
    Song.findByIdAndRemove({_id: req.params.song},function(err){
        if(!err){
            res.redirect("/album/"+req.params.id)
        }
    })

    fs.unlink("./songs/"+res.locals.song.song)
}