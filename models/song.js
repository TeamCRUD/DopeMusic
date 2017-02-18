var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var song_schema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    song: {type: String, required: true},
    album: {type: Schema.Types.ObjectId, ref: "Album"},
})

module.exports = mongoose.model('Song' , song_schema);