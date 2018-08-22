

const express = require('express'); 
const bodyParser = require('body-parser'); 
const competition = require('./routes/competition.route'); // Imports routes for the products
const match = require('./routes/match.route'); 
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://goalbet2019user:Password01!@ds225382.mlab.com:25382/goalbet2019'


const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/competition', competition);
app.use('/match', match);

let port = 3001;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});




