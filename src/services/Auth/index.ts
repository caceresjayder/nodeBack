const passport = require("passport");
import JWTStrategy  from "./strategies/jwt.strategy";
const LocalStrategy = require("./strategies/local.strategy");

passport.use('jwt',JWTStrategy);
passport.use('local',LocalStrategy);
