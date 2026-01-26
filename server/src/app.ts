import express from 'express'
import envConfig from './config/configEnv.js'
import './database/connection.js'
import authRoute from './router/globals/auth/authRoute.js'
import instituteRoute from './router/institute/instituteRoute.js'
import courseRoute from './router/institute/course/courseRoute.js'
import catagoryRoute from './router/institute/catagory/catagoryRoute.js'
import teacherInstituteRoute from './router/institute/teacher/teacherRoute.js'
import teacherRoute from './router/teacher/teacherRoute.js'

const app = express()

const port = envConfig.portNumber

app.use(express.json())
//GLOBAL ROUTE
app.use('/api',authRoute)

//INSTITUTE ROUTE
app.use('/api/institute',instituteRoute)
app.use('/api/institute', courseRoute)
app.use('/api/institute', catagoryRoute)
app.use('./api/institute', teacherInstituteRoute)

//TEACHER ROUTE

app.use('/api/teacher/login', teacherRoute)

function startServer(){
  app.listen(port, ()=>{
    console.log(`Server starting at port ${port}`)
  })
}

startServer()