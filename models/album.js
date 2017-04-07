var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var album_schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {
        day:{type: Number, required:true},
        month:{type: Number, required:true},
        year:{type: Number, required:true}
    },
    gender: { type: String, required: true }, 
    cover: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    public: Boolean
})

module.exports = mongoose.model('Album' , album_schema);