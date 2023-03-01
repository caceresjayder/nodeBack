import { Sequelize } from "sequelize";
require("dotenv").config();

const db_url = process.env.DB_URL as string

const sequelize = new Sequelize(db_url)

const DB_Connect = async () => {
    try{
        await sequelize.authenticate()
        const {rows}: any = await sequelize.query("SELECT NOW()")
        console.log(`Connection to database succesfully and the time is ${rows[0].now}`)
    }
    catch(err){
        console.error("Connection with database: errored", err)
    }
}

export default DB_Connect;