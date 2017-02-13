var express = require('express');
var router = express.Router();

var Album = require("../models/album")

router.get("/new",function(req,res){
    res.render("app/album/new",{title: "Nuevo album"})
})

router.get("/:id/edit",function(req,res){
    Album.findById(req.params.id,function(err, album){
            res.render("app/album/edit",{title: "Editar Album "+album.title, album: album})
        })
})

router.route("/:id")
    .get(function(req,res){
        Album.findById(req.params.id,function(err, album){
            res.render("app/album/show",{title: "Album "+album.title, album: album})
        })
    })
    .put(function(req,res){
         Album.findById(req.params.id,function(err, album){
            album.title = req.body.title
            album.save().then(function(us){
                res.send("Guardamos el album")
            },function(err){
                res.send("No pudimos guardar el album")
            })
            })
    })
    .delete(function(req,res){
        Album.findByIdAndRemove({_id: req.params.id},function(err){
            if(!err){
                res.redirect("/album")
            }
        })
    })

router.route("/")
    .get(function(req,res){
        Album.find({},function(err,albums){
            if(err){
                return res.redirect("/app")
            }
            res.render("app/album/index",{title:"Biblioteca", albums: albums})
        })
    })
    .post(function(req,res){
        var data ={
            title: req.body.title
        }
        var album = new Album(data)
        album.save().then(function(us){
            res.send("Guardamos el album")
        },function(err){
            res.send("No pudimos guardar el album")
        })
    })

module.exports = router;