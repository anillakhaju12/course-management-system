
import nodemailer from 'nodemailer'


interface IMailInfo{
  to : string,
  subject : string,
  text : string
}

const sendMail = async (mailInfo : IMailInfo)=>{
  const transporter = nodemailer.createTransport({
    service :'gmail',
    auth: {
      user :process.env.NODEMAILER_MAIL,
      pass : process.env.NODEMAILER_PASSWORD
    }
  })

  const mailFormatObject = {
    from : `SaaS Project<lakhajuanil12@gmail.com>`,
    to : mailInfo.to,
    subject : mailInfo.subject,
    text : mailInfo.text
  }

  try{
    await transporter.sendMail(mailFormatObject)
  }catch(err){
    console.log(err)
  }
}

export default sendMail
