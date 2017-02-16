var path = require('path');
var Song = require('../models/song');

// render
exports.renderNewSong = function(req,res){
    res.render("app/song/new",{title: "Nuevo cancion"})
}

exports.renderShowSong = function(req,res){
    var name_song = req.params.nombre + ".mp3"
    var cancion = path.join(__dirname , "songs" , name_song)
    mediaserver.pipe(req, res, cancion)
}

// rest
exports.addSong = function(req,res){
    var data ={
        number: req.body.number,
        title: req.body.title,
        artist: req.body.artist,
        album: req.params.id
    }
    var song = new Song(data)
    song.save().then(function(us){
        res.send("Guardamos el album")
    },function(err){
        res.send("No pudimos guardar el album")
    })
}