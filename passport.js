let passport = require('passport');
const User = require("./models/User");
let GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: "1061445041073-c4r5u0bgudae2noedn2knqjrcr99im21.apps.googleusercontent.com",
            clientSecret: "zb-5A_6w3t_cSD2tsvvFU1Sg"
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                where: {
                    email: profile.emails[0].value
                }
            }).then(user => {
                console.log(profile);
                if (!user) {
                    const today = new Date();
                    const userData = {
                        first_name: profile. _json.given_name,
                        last_name: profile. _json.family_name,
                        email: profile.emails[0].value,
                        created: today
                    };
                    User.create(userData)
                        .then(user => {
                            console.log(user.email + ' registered');
                            return done(null, user);
                        })
                        .catch(err => {
                            console.log('error: ' + err);
                        })
                } else {
                    return done(null, user);
                }
            })
                .catch(err => {
                    return done('error: ' + err);
                })
        }));
};