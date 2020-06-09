// Import the Express module and 
// Create an instance of Express
const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session')


const app = express();
const PORT = process.env.PORT || 5500;

app.set('view engine', 'ejs');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(PATH.join(__dirname, 'public')));
router.use(session({
    secret: 'codesquad',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true}
}));
// app.use(require('express-session')({
//     secret: 'codesquad',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
const route = require('./routes/routes');
app.use('/', route);

//GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    next();
});

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
            console.log('You are connected to the database!')
            dbHandler = dbClient.db(dbName);
        };
    });
});

