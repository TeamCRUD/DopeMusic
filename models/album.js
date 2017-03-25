var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var album_schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    year: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    private: Boolean
})

module.exports = mongoose.model('Album' , album_schema);