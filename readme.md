TITLE
The Dorchester Community Care Network website is a web app used for the Dorchester neighborhood mutual aid group in Boston, Massachusetts.

GETTING STARTED
In terminal: npm init
clone github project
In terminal: npm install to install dependencies:
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-ensure-login": "^0.1.1",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^3.2.0",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "express-validator": "^6.5.0",
    "method-override": "^3.0.0",
    "mongodb": "^3.5.7",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-http": "^0.3.0",
    "passport-local": "^1.0.0",
    "uuidv4": "^6.1.0", express,

TO RUN
Ask in #tech-tasks for the .env.development file.
Create a .env file in the root folder
Sample .env.development:
    dbName=
    collectionUserForm=
    collectionSession=
    SESSION_SECRET=
    collectionCommunityResourceSubmission=
    collectionBlockCoord=
    collectionHelpSubmissions=

Run locally with 'node start'

DEPLOYMENT
Heroku 

BUILT WITH
Node.js
Express.js
EJS
MongoDB
Passport.js
bcrypt

AUTHORS
Melissa Sawyer

ACKNOWLEDGMENTS
Thanks to the teachers at CodeSquad.org for all their help in getting this project running, especially Kiki, Sonia, Ahmad, Amber, Andrew, Ben, and Khalid.
Thanks to the MAMAS group (Mutual Aid Medford and Somerville) for their work in creating the original tools 