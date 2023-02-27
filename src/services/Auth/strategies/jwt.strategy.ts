const {Strategy, ExtractJwt} = require('passport-jwt');
import { config } from '../../../config/config'

const opts = {
    secretOrKey : `${config.JWT_SECRET}`,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}



const JWTStrategy = new Strategy(opts, async (jwt_payload: any, done: any)  => {
    return done(null, jwt_payload)
})

module.exports = JWTStrategy;