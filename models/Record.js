var mongoose = require("mongoose");

var RecordSchema = new mongoose.Schema({
    key:{type:String, required: true},
    totalCount: {type:Number, required:true},
    counts: {type:[Number], required:true},
    value: {type:String, required: true}
},{timestamps:true}, {collection: 'records'});

module.exports = mongoose.model('records', RecordSchema);