const LocalStrategy = require('passport-local').Strategy;
const Admin = require('./mongoose').Admins

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('login', new LocalStrategy({
        usernameField:'login',
        passwordField:'password',
        passReqToCallback:true
    },
        function (req,login, password, done) {
            Admin.findOne({ login: login }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect username.' ));
                }
                if (req.body.password !== user.password) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password!' ));
                }
                return done(null, user);
            });
        }
    ));
}