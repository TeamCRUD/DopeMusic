var express = require('express');
var router = express.Router();

var find_artist = require("../middlewares/find_artist")

/* GET home page. */
router.route("/")
    .get(function(req, res, next) {
        res.send('Artist')
    })

router.route('/:artist')
    .get(find_artist, function(req,res){
        var following = false
        if(res.locals.user.username){
            for(var i=0; i < res.locals.user.following.length; i++){
                if(res.locals.user.following[i] == req.params.artist){
                    following = true
                }
            }
        }
        res.render('user/default', {dashartist: true, following})
    })
    
module.exports = router;