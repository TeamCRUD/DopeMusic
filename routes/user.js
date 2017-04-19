var express = require('express');
var router = express.Router();

var UserCtrl = require('../controllers/user')

router.route("/")
    .get(function(req, res, next){
        res.render("user/default",{title: res.locals.user.fullname, profile: true})
    })


router.route('/edit')
    .get(function(req, res, next){
        res.render("user/edit",{title: res.locals.user.fullname})
    })
    .put(UserCtrl.uploadAvatar, UserCtrl.updateUser)

module.exports = router;