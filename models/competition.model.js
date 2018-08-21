var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var competitionSchema = new Schema({
    id: Number,
    name: String,
    league: String,
    year: String,
    currentMatchday: Number,
    numberOfMatchdays: Number,
    numberOfTeams: Number,
    numberOfGames: Number,
    lastUpdated: Date
});

var Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;

