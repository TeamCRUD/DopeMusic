var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var album_schema = new Schema({
    title: {type: String, required: true}
})

module.exports = mongoose.model('User' , user_schema);