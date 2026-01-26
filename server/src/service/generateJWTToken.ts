import jwt from 'jsonwebtoken'


function generateJWTToken(userData : {
  id : string, 
  instituteNumber?: string
}){
   const secretKey = process.env.TOKEN_SECRET_KEY
   const expriedTime =  process.env.TOKEN_EXPIRY_TIME

   if(!secretKey || !expriedTime){
    throw new Error("JWT Secret key and expired time not define")
   }

  const token = jwt.sign(userData,secretKey,{expiresIn: Number(expriedTime)})
  return token   
}

export default generateJWTToken