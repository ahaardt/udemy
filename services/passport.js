const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require ('mongoose');

// Import User schema from User js as Model Class
const User = mongoose.model('users');

passport.serializeUser ((user,done) => {
    //callback after process done (error,object), turns user into id
    // user.id != profile.id, but rather the mongoDB unique record id, to enable using multiple authenticator- ever use has a user id, but not a google id necessarily
    done(null, user.id);
});

// turns id into user (Mongoose model instance)
passport.deserializeUser((id, done) => {
        User.findById(id)
        .then(user => {
            done (null, user);
        });

});

//Call password and create new Strategy
//Passport integration
passport.use (new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    //callback url
    callbackURL:'/auth/google/callback',
    // add so google strategy trusts proxy
    proxy:true
 },
    (accessToken, refreshToken, profile, done) => {
        // Find user with profile Id asynchronously (using promises)
        User.findOne({googleId: profile.id}).then ((existingUser) => {
                //Check if user exists already and only add if not
                if (existingUser) {
                    // record exists
                    //nothing to do, passes back existingUser
                    done(null, existingUser);

                } else {
                    //Create new user and save
                    new User ({googleId: profile.id}).save()
                    //need to chain promise to make user has been created - getting back user from DB and passing back to passport
                    .then(user => done(null,user));
                }
            })


    }
));

