var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { 
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
}; 

mongoose.Promise = global.Promise

var mongodbUri = 'mongodb://jairperezs:D1e560*9c@ds147789.mlab.com:47789/dopemusic'
mongoose.connect(mongodbUri, options)

var conn = mongoose.connection;  

conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
    console.log('Conectado a DB')
});

var user_schema = new Schema({
    name: String,
    lastname: String,
    email: String,
    username: {type: String, required: true, maxlength: 10, unique: true},
    password: {type: String, required: true, minlength: 6}
})

module.exports = mongoose.model('User' , user_schema);