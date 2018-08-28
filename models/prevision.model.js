var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var standingSchema = new Schema({
    id: Number,
    competitionId: String,
    competitionName: String,
    seasonId:String
});

var Standing = mongoose.model('Prevision', standingSchema);

module.exports = Standing;

