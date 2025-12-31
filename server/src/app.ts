import express from 'express'
import envConfig from './config/configEnv.js'
import './database/connection.js'

const app = express()

const port = envConfig.portNumber

function startServer(){
  app.listen(port, ()=>{
    console.log(`Server starting at port ${port}`)
  })
}

startServer()