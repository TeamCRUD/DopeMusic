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

var posibles_valores = ['Masculino', 'Femenino']
var posibles_typeuser = ['Estandar', 'Artista', 'GoPro']
var posibles_genders =  ['Reggae', 'Electronica', 'Pop']
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Coloca email valido']

var user_schema = new Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, minlenght: 5, maxlength: 10, unique: true},
    password: {type: String, minlength: 8, required: true},
    avatar: {type: String, default: 'default.png'},
    sex: {type: String, required: true, enum: posibles_valores, unique: true},
    email:{type: String, required: true, match: email_match},
    phone:{type: Number, min: 1000000000, max: 9999999999, required: true},
    typeuser:{type: String, required: true, enum: posibles_typeuser},
    gender: {type: String, enum: posibles_genders},
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