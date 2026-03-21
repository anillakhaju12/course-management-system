import express from 'express'
import envConfig from './config/configEnv.js'
import './database/connection.js'
import authRoute from './route/globals/auth/authRoute.js'
import instituteRoute from './route/institute/instituteRoute.js'
import courseRoute from './route/institute/course/courseRoute.js'
import catagoryRoute from './route/institute/catagory/catagoryRoute.js'
import teacherInstituteRoute from './route/institute/teacher/teacherRoute.js'
import teacherRoute from './route/teacher/teacherRoute.js'
import cors from "cors"


const app = express()

const port = envConfig.portNumber

app.use(express.json())

app.use(cors({origin: "http://localhost:3000"}))

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