import {hashSync} from 'bcrypt'


function randomPasswordGenerator(teacherName : string){
  const randomNumber = Math.floor(Math.random()*90000) + 10000
  const passwordVersion = {
    hashedVersion : hashSync(`${teacherName}_${randomNumber}`,10),
    plainVersion : `${teacherName}_${randomNumber}`
  }
  
  return passwordVersion
}

export default randomPasswordGenerator



