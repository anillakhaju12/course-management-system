import axios from "axios";

const token = typeof window !== "undefined" ? localStorage.getItem('token') : null

const APIWithToken = axios.create({
  baseURL:"http://localhost:3300/api",
  headers:{
    "Authorization" : token ? token : null,
    "Content-Type" : "application/json",
    "Accept" : "application/json"
  }

})

export default APIWithToken