import {Sequelize} from 'sequelize-typescript'
import User from './models/userModel.js';
// import path from 'path';
// import { fileURLToPath } from "url";

// Fix __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//validate env variable
function requiredEnv(name: string, allowEmpty:boolean = false): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  if (!allowEmpty && value === "") {
    throw new Error(`Environment variable ${name} cannot be empty`);
  }
  return value;
}


const sequelize = new Sequelize({
  database : requiredEnv("DB_NAME"),
  username : requiredEnv("DB_USERNAME"),
  password : requiredEnv("DB_PASSWORD",true),
  host : requiredEnv("DB_HOST"),
  dialect : "mysql",
  port : Number(requiredEnv("DB_PORT") ?? 3306),
  models : [User]
})

sequelize.authenticate().then(()=>{
  console.log(`Database Connect successfully`)
}).catch(err =>{
  console.log(`Error : ${err}`)
})

//migrating table
sequelize.sync({force:false}).then(()=>{
  console.log("Migration succcessful")
}).catch( err =>{
  console.log(`Error : ${err}`)
})


export default sequelize