const {Strategy} = require('passport-local');
import { UserController } from '../../../controllers/Users.controller';
import { PasswordVerify } from '../../middlewares/Passwords' 

const LocalStrategy = new Strategy(async (email: string, password: string, done: any)  => {
    try{
        const user = await UserController.findByEmail(email);
        if(!user){
            done({status: 401, message: "Invalid username"}, false)
        }
        const isMatch = await PasswordVerify(password, user.password);
        if(!isMatch){
            done({status: 401, message: "Invalid username or password"}, false)
        }
        else{
            delete user.dataValues.password;
            delete user._previousDataValues.password;
            done(null, user)
        }
    }
    catch(err){
        done(err, false)
    }
})

module.exports = LocalStrategy;