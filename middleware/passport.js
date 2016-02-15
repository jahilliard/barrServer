var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var User = require('../models/User.js');
var UserController = require('../controllers/UserController.js');
var config = require('../config/config.js');

const FACEBOOK_APP_ID = "240059072994113";
const FACEBOOK_APP_SECRET = "d2b25c515e72fc81b32a7fec0865e49e";

function getAttributesFromProfile(profile){
  var attributes = 
    {
      "fbId": profile.id
    }

  return attributes;
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function(email, password, done) { 
    UserController.checkLoginCredentials(email, password, done);
  }));

passport.use(new FacebookTokenStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
  },

  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.getByFbId(profile.id, function(err, returnedUser) {
        if (err) {
          return done(err);
        }
        if (returnedUser) {
          return done(null, returnedUser);
        } else {
          var attributes = getAttributesFromProfile(profile);
          var newUser = new User(attributes);
          newUser.saveUser(function(err, newUser){
            if (err){
              return done(err, null);
            } else {
              return done(null, newUser);
            }
          });
        }
      });
    });
  }
));

module.exports = passport;  