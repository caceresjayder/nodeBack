const {Strategy, ExtractJwt} = require('passport-jwt');

const opts = {
    secretOrKey : process.env.JWT_SECRET,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}



const JWTStrategy = new Strategy(opts, async (jwt_payload: any, done: any)  => {
    return done(null, jwt_payload)
})

export default JWTStrategy;