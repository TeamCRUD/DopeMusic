var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')
var User = require('./models/user')

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "d*o*p*e*1*2*3",
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'jade');

app.get(('/') , function(req, res){
    res.render('index')
});

app.get(('/about') , function(req, res){
    res.render('about')
});

app.use('/admin', session_middleware)

app.get(('/admin') , function(req, res){
    res.render('admin')
});

app.get(('/login') , function(req, res){
    res.render('login')
});

app.post(('/users') , function(req, res){
    var user = new User({name: req.body.name, lastname: req.body.lastname, email: req.body.email , username: req.body.username, password: req.body.password});
    user.save(function(){
        res.redirect('/admin')
    })
});

app.post(('/sessions') , function(req, res){
    if(req.body.username == 'alejoadmin' && req.body.password == 'admin'){
        res.redirect('/admin')
    }
    else{
        User.findOne({username: req.body.username, password: req.body.password},function(err,user){
            req.session.user_id = user._id;
            res.redirect('/app')
        })
    }
});

app.get(('/logout'), function(req, res){
    req.session.destroy();
    res.redirect('/login')
})

app.use('/app', session_middleware)
app.use('/app', router_app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});