
import type {Request,Response} from "express"
import User from "../../../database/models/userModel.js"

class AuthController{
  
  async registerUser(req: Request, res:Response){
    try{
      const {username, email, password} = req.body
      if(!username || !email || !password){
        return res.status(400).json({
          "message" : "Please provide all the data"
        })

      }
    
      await User.create({
        username,
        email,
        password
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
}

/* you can use static like
 static async registerUser(){}
 if you don't wanna to create instance of the class
 and can export directly like
 export default AuthController
*/
const auth = new AuthController()
export default auth