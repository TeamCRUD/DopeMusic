var express = require('express');
var router = express.Router();

var Album = require("../models/album")

router.get("/new",function(req,res){
    res.render("app/album/new",{title: "Nuevo album"})
})

router.get("/:id/edit",function(req,res){

})

router.route("/:id")
    .get(function(req,res){
        Album.findById(req.params.id,function(err, album){
            res.render("app/album/show",{album: album})
        })
    })
    .put(function(req,res){

    })
    .delete(function(req,res){

    })

router.route("/")
    .get(function(req,res){

    })
    .post(function(req,res){
        var data ={
            title: req.body.title
        }
        var album = new Album(data)
        album.save(function(err){
            if(!err){
                res.redirect("/album/"+album._id)
            }else{
                res.render(err)
            }
        })
    })

module.exports = router;