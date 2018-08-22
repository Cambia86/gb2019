var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Team = require('./common'); 
const Score = require('./common'); 


// create a schema
var matchSchema = new Schema({
    id: Number,
    SeasonId: String,
    competitionId: String,
    competitionName: String,
    matchday: Number,
    homeTeam: Object,
    awayTeam : Object,
    score:Object
});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;

