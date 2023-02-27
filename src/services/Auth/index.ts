const passport = require("passport");
const JWTStrategy = require("./strategies/jwt.strategy");
const LocalStrategy = require("./strategies/local.strategy");

passport.use('jwt',JWTStrategy);
passport.use('local',LocalStrategy);
