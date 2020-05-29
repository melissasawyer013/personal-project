// Import the Express module and 
// Create an instance of Express
const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const PORT = 5500;



//configuring EJS
// This is the function that is triggered each time our server receives a request from the client
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(PATH.join(__dirname, 'public')));

app.use(router);
const route = require('./routes/routes');
app.use('/', route);

let dbHandler;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'DCCN';
const collectionUserForm = 'userFormData';
const collectionDataSearch = 'dataSearch';

// Starts the app's server by listening to port 5500
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
    //Connects to database
    mongoClient = mongodb.MongoClient;
    mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(`There was an error connecting to the database. Error: ${err}`);
        } else {
            console.log('You are connected to the database!')
            dbHandler = dbClient.db(dbName);
        };
    });
});

