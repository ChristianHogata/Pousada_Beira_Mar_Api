import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';

interface ISendMail {
  mailOptions: {
    from: string,
    to: any,
    subject: string,
    text: string
  };
}

const SendEmail = (MailParams:ISendMail)=>{
    
  const mailer = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false, 
    auth: {
      user: "PousadaBeiraMar19022024@outlook.com",
      pass: "PousadaBeiraMar2024"
    },
    tls: {
      ciphers:'SSLv3'
    }
  } as TransportOptions);

  mailer.sendMail(MailParams.mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Email enviado: ' + info);
    }
  });
}

export default SendEmail;
  