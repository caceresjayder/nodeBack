const UserController = require('../Users.controller');
const {PasswordsVerify} = require('../../services/Passwords');
const {config} = require('../../config/config');

const JWT_SECRET = config.JWT_SECRET;

const User = new UserController();

interface ILogin {
    email: string,
    password: string
}

class LoginController {
    constructor(){}

    async doLogin(login: ILogin){
        const user = await User.findByEmail(login.email);
        if(!user){
            return {
                status: 404,
                message: "Not Found"
            }
        }
        if(PasswordsVerify(login.password, user.dataValues.password)){

        }
    }
}

export {LoginController};