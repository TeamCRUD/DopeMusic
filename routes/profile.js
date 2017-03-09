var express = require('express');
var router = express.Router();

router.route("/")
    .get(function(req, res, next){
        res.render("app/profile",{title: res.locals.user.fullname})
    })

module.exports = router;