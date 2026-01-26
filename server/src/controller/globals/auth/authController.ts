
import type {Request,Response} from "express"
import User from "../../../database/models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateJWTToken from "../../../service/generateJWTToken.js"

class AuthController{
  
  async registerUser(req: Request, res:Response){
    try{

      if(req.body === undefined){
        return res.status(400).json({
          "message" : "please send some data"
        })
      }
      const {username, email, password} = req.body
      if(!username || !email || !password){
        return res.status(400).json({
          "message" : "Please provide all the data"
        })

      }
    
      await User.create({
        username,
        email,
        password : bcrypt.hashSync(password, 12)
      })
      return res.status(201).json({
        "message" : "Data inserted successfully"
      })
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        "message" : "something went wrong. Please try later!!"
      })
    }
  }

  async loginUser(req: Request, res: Response){
    try{
      if(req.body === undefined){
        return res.status(400).json({
          "message" : "please send some data"
        })
      }
      const{email, password} = req.body
      if(!email || !password){
        return res.status(404).json({
          "message" : "Please provide all the data"
        })

      }

      const user = await User.findOne({where: {
        email : email
      }})

      
      if(!user){
        return res.status(404).json({
          "message" : "User not registered"
        })
      }
      const isPassword = bcrypt.compareSync(password, user.password)
      if(isPassword){
        const token = generateJWTToken({id : user.id})
        return res.status(200).json({
          "message" : "login successfully",
          "token" : token
        })
      }else{
        return res.status(400).json({
          "message" : "Incorrect password"
        })
      }
      


    }catch(err){
      console.log(err)
      return res.status(500).json({
        "message" : "something went wrong. Please try later!!"
      })
    }
  }
}

/* you can use static like
 static async registerUser(){}
 if you don't wanna to create instance of the class
 and can export directly like
 export default AuthController
*/
const auth = new AuthController()
export default auth