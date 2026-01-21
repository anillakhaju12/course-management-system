import express from 'express'
import envConfig from './config/configEnv.js'
import './database/connection.js'
import authRouter from './router/globals/auth/authRouter.js'
import instituteRouter from './router/institute/instituteRouter.js'
import courseRouter from './router/institute/course/courseRouter.js'
import catagoryRouter from './router/institute/catagory/catagoryRouter.js'

const app = express()

const port = envConfig.portNumber

app.use(express.json())
app.use('/api',authRouter)

app.use('/api',instituteRouter)
app.use('/api', courseRouter)
app.use('/api',catagoryRouter)

function startServer(){
  app.listen(port, ()=>{
    console.log(`Server starting at port ${port}`)
  })
}

startServer()