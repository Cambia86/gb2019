var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var standingSchema = new Schema({
    id: Number,
    competitionId: String,
    competitionName: String,
    seasonId:String,
    draw: String,
    goalDifference: String,
    goalsAgainst: String,
    goalsFor: String,
    lost: String,
    playedGames: String,
    points: String,
    position: String
});

var Standing = mongoose.model('Standing', standingSchema);

module.exports = Standing;

