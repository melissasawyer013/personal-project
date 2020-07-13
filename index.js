const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const initializePassport = require('./routes/passport-config');
dotenv.config();

initializePassport(
    passport, 
    getUserByUsername,
    getUserById,
)

async function getUserByUsername(username, req) {
    return await dbHandler.collection(collectionUserForm).findOne({username: username})
}

async function getUserById(_id, req) {
    return await dbHandler.collection(collectionUserForm).findOne({"_id" : mongodb.ObjectID(_id)})
}

const app = express();
const PORT = process.env.PORT || 5500;

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: process.env.SECRET,
    resave: true,                   //save unmodified sessions
    saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(PATH.join(__dirname, 'public')));

app.use(flash());
router.use(router);
const route = require('./routes/routes');
app.use('/', route);

let dbHandler;
const dbURL = process.env.dbURL;
const dbName = process.env.dbName;
const collectionUserForm = process.env.collectionUserForm;

// Starts the app's server by listening to port 5500
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
    //Connects to database
    mongoClient = mongodb.MongoClient;
    mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(`There was an error connecting to the database. Error: ${err}`);
        } else {
            // console.log('You are connected to the database!')
            dbHandler = dbClient.db(dbName);
        };
    });
});

