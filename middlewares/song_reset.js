var path = require('path');
var Song = require('../models/song');

var path = require('path');
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
    res.render("app/song/new",{title: "Nuevo cancion"})
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
        res.send("Guardamos la cancion")
    },function(err){
        res.send("No guardamos la cancion")
    })
}

exports.uploadSong = upload.single("song")