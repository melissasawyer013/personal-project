const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

function initialize (passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);
        if(user == null) {
            return done(err, false, {message: 'No user with that username'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('passwords match')
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))

    passport.serializeUser((user, done) => done(null, user['_id']))
    passport.deserializeUser(async (_id, done) => {
        return done(null, await getUserById(_id))
    })
};

module.exports = initialize;