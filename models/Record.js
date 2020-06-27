var mongoose = require("mongoose");

//Record model for records in given MongoDb collection
var RecordSchema = new mongoose.Schema({
    key:{type:String, required: true},
    totalCount: {type:Number, required:true},
    counts: {type:[Number], required:true},
    value: {type:String, required: true}
},{timestamps:true}, {collection: 'records'});

module.exports = mongoose.model('records', RecordSchema);