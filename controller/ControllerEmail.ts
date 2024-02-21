import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';

const SendEmail = (Useremail: string)=>{
    
    const mailer = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secureConnection: false, // TLS requires secureConnection to be false
        auth: {
          user: "PousadaBeiraMar19022024@outlook.com",
          pass: "PousadaBeiraMar2024"
        },
        tls: {
          ciphers:'SSLv3'
        }
    } as TransportOptions);

    let mailOptions = {
        from: 'PousadaBeiraMar19022024@outlook.com',
        to: Useremail,
        subject: 'Sua conta foi criada com sucesso!',
        text: 'Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!'
    };

    mailer.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info);
        }
    });
}

export default SendEmail;
  