import axios from "axios";

const AuthAPI = axios.create({
  baseURL:"http://localhost:3300/api",
  headers:{
    "Content-Type" : "application/json",
    "Accept" : "application/json"
  }

})

export default AuthAPI