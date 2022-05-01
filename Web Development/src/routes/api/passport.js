var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../../app/models/userModel')

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                await userModel.findOne({userName: email}).then(async(user) => {
                    if (!user) {
                    
                        return done(null, false);
                    }
                    else {
                        if (user.password == password) {
                            return done(null, user, null)
                        } else {
                            return done(null, false)
                        }
                    }
                });
            } catch (err) {
                // console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id).then((user) => {
        return done(null, user);

    }).catch(error => {
        console.log(error)
        return done(error, null)
    });
});

module.exports = initPassportLocal;