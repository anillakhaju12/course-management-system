import express from 'express'
import envConfig from './config/configEnv.js'
import './database/connection.js'
import authRouter from './router/globals/auth/authRouter.js'
import instituteRouter from './router/institute/instituteRouter.js'

const app = express()

const port = envConfig.portNumber

app.use(express.json())
app.use('/api',authRouter)

app.use('/api',instituteRouter)

function startServer(){
  app.listen(port, ()=>{
    console.log(`Server starting at port ${port}`)
  })
}

startServer()