var express = require('express');
var router = express.Router();

router.route("/")
    .get(function(req, res, next){
        res.render("user/default",{title: res.locals.user.fullname})
    })

router.route('/:id/edit')
    .get(function(req, res, next){
        res.render("user/edit",{title: res.locals.user.fullname})
    })
module.exports = router;