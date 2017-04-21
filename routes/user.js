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

router.route('/following')
    .put(UserCtrl.following)

router.route('/unfollowing')
    .put(function(req, res, next){

        var foo = res.locals.user.following
        var user = req.body.unfollowing
        
        function removeItemFromArr ( arr, item ) {
            var i = arr.indexOf( item );
         
            if ( i !== -1 ) {
                arr.splice( i, 1 );
            }
        }

        removeItemFromArr( foo, user );
        console.info( foo );

        res.locals.user.save().then(function(us){
            res.redirect('/artist/'+ user)
        },function(err){
            res.redirect('/artist/'+ user)
        })
    })

module.exports = router;