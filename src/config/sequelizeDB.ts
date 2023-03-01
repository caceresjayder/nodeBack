import { Sequelize } from "sequelize";
require("dotenv").config();

const db_url = process.env.DB_URL as string

const sequelize = new Sequelize(db_url)

const DB_Connect = async () => {
    try{
        const result = await sequelize.authenticate()
        console.log(`The result is ${result}`)
    }
    catch(err){
        console.error("Connection with database: errored", err)
    }
}

export default DB_Connect;