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
        res.render('user/default')
    })
    
module.exports = router;