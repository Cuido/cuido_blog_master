const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/keys');
const User = require('../database/models/User');
const logger = require('../logger');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
        clientID: config.googleOAuth.googleClientID,
        clientSecret: config.googleOAuth.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({
                googleId: profile.id
            })
            .then((exisitingUser) => {
                if (exisitingUser) {
                    done(null, exisitingUser);
                } else {
                    let profileData = profile._json;
                    let user = new User({
                        name: profile.displayName,
                        email: profileData.email || '',
                        picture: profileData.picture || '',
                        googleId: profile.id
                    });
                    user.save((err) => {
                        if (err) {
                            logger.error("Error saving record " + err);
                        } else {
                            logger.info("Record created " + user);
                            done(null, user);
                        }
                    });
                }
            })
    }
));