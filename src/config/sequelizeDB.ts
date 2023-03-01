import { Sequelize } from "sequelize";
require("dotenv").config();
console.log("db_variable is: ", process.env.DB_URL)
const db_url = process.env.DB_URL as string
console.log("const: ", db_url)


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