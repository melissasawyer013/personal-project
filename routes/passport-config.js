const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const session = require('express-session');


function initialize (passport, getUserByUsername, getUserById) {
    const authenticateUser = async (req, username, password, done) => {
        const user = await getUserByUsername(username);
        if(user == null) {
            return done(null, false, req.flash('messages', 'No user with that username.')
            )
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, req.flash('messages', 'Password incorrect.')
                )
            }
        } catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy(
        {passReqToCallback: true,
        usernameField: 'username'}, 
        authenticateUser))

    passport.serializeUser((user, done) => done(null, user['_id']))
    passport.deserializeUser(async (_id, done) => {
        // req.flash('success', 'You have successfully logged out.');
        return done(null, await getUserById(_id))
    })
};

module.exports = initialize;