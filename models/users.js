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
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sex: {type: String, required: true},
    email:{type: String, required: true},
    phone:{type: String, required: true},
    typeuser:{type: String, required: true},
    gender: String,
    city: String,
    network: {
        facebook: String,
        twitter: String,
        instagram: String,
        youtube: String,
        other: String,
    }
})

module.exports = mongoose.model('User' , user_schema);