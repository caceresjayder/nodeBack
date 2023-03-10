const { Sequelize } = require("sequelize");
require("dotenv").config();
const db_url = process.env.DB_URL as string


const sequelize = new Sequelize(db_url)

const DB_Connect = async () => {
    try{
        const res: any = await sequelize.query("select now()");
        console.log(`Succesfully Connected to database and the hour is ${res[0][0].now}`)
    }
    catch(err){
        console.error("Connection with database: errored", err)
    }
}

export default DB_Connect;