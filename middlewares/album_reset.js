var Album = require('../models/album');

// render
exports.renderShowAlbum = function(req,res){
    res.render("app/album/show",{title: "Album "+res.locals.album.title})
}

exports.renderNewAlbum = function(req,res){
    res.render("app/album/new",{title: "Nuevo album"})
}

exports.renderEditAlbum = function(req,res){
    res.render("app/album/edit",{title: "Editar Album "+res.locals.album.title})
}

// rest
exports.allAlbum = function(req,res){
    Album.find({},function(err,albums){
        if(err){
            return res.redirect("/app")
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
        res.send("Guardamos el album")
    },function(err){
        res.send("No pudimos guardar el album")
    })
}

exports.updateAlbum = function(req,res){
    res.locals.album.title = req.body.title
    res.locals.album.save().then(function(us){
        res.send("Guardamos el album")
    },function(err){
        res.send("No pudimos guardar el album")
    })
}

exports.deleteAlbum = function(req,res){
    Album.findByIdAndRemove({_id: req.params.id},function(err){
        if(!err){
            res.redirect("/album")
        }
    })
}