var express = require('express');
var router = express.Router();

router.get("/new",function(req,res){
    res.render("app/album/new",{title: "Nuevo album"})
})

router.get("/:id/edit",function(req,res){

})

router.route("/:id")
    .get(function(req,res){

    })
    .put(function(req,res){

    })
    .delete(function(req,res){

    })

router.route("/")
    .get(function(req,res){

    })
    .post(function(req,res){

    })

module.exports = router;