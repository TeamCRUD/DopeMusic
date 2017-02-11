var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { 
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
}; 

mongoose.Promise = global.Promise

var mongodbUri = 'mongodb://jairperezs:D1e560*9c@ds135519.mlab.com:35519/proschool'
mongoose.connect(mongodbUri, options)

var conn = mongoose.connection;  

conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
    console.log('Conectado a DB')
});

var userSchemaJSON = {
    name: String,
    lastname: String,
    email: String,
    username: String,
    password: String
}

var user_schema = new Schema(userSchemaJSON)

module.exports = mongoose.model('User' , user_schema);