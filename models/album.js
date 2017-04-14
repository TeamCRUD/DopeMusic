var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var album_schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {
        day:{min: 1, max: 31, type: Number, required:true},
        month:{min: 1, max: 12, type: Number, required:true},
        year:{ min: 2017, type: Number, required:true}
    },
    gender: { type: String, required: true }, 
    cover: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    public: Boolean
})

module.exports = mongoose.model('Album' , album_schema);