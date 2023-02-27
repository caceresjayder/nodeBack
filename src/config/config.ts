const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
}



export {config}