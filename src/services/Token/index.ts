import jwt from "jsonwebtoken";
import {config} from '../../config/config';

const Secret = `${config.JWT_SECRET}`

const jwtConfig = {
    expiresIn: '2h'
}

interface Ipayload {
    issuer: number,
    role: string
}

const signToken = (payload: Ipayload) => {
    return jwt.sign(payload, Secret, jwtConfig);
}

export {signToken}


