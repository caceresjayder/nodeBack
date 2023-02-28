import jwt from "jsonwebtoken";

const Secret = `${process.env.JWT_SECRET}`;

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


