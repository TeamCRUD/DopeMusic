var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var song_schema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    number: {type: String, required: true},
    album: {type: Schema.Types.ObjectId, ref: "Album"},
})

module.exports = mongoose.model('Album' , song_schema);