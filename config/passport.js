const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, cb) => {
    User.findOne({ "googleId": profile.id }, (err, user) => {
        if (err) return cb(err);
        if (user) {
            return cb(null, user);
        } else {
            var newUser = new User({
                // TODO: the profile object will be instrumental in getting avatar
                name: profile.displayName,
                googleId: profile.id
            });
        }
        newUser.save(err => {
            if(err) return cb(err);
            return cb(null, newUser);
        });
    });
}
));

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err, user);
    });
});