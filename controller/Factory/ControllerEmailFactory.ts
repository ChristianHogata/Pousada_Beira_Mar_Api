import { emailParams, emailFactory } from "../Interfaces/ControllerInterface";
import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';

class ControllerEmailFactory implements emailFactory, emailParams{
    
    private _from: string = '';
    private _to: string = '';
    private _subject: string = '';
    private _text: string = '';

    private  _MailOptions = {
        from: '',
        to: '',
        subject:  '',
        text:  '',   
    }

    setEmailParams(): emailParams{
        return this;
    };

    SendEmail(): Promise<boolean>{

        this._MailOptions.from = this._from;
        this._MailOptions.to = this._to;
        this._MailOptions.subject = this._subject;
        this._MailOptions.text = this._text;

        const mailer = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secureConnection: false, 
            auth: {
              user: "PousadaBeiraMar2024@outlook.com",
              pass: "PousadaBeiraMar"
            },
            tls: {
              ciphers:'SSLv3'
            }
        } as TransportOptions);

        return new Promise(async (resolve, reject) => {

            mailer.sendMail( this._MailOptions, (error, info)=>{
                if (error) {
                    console.log(error);
                    reject(false);
                } 
                else {
                    console.log('Email enviado: ' + info);
                    resolve(true);
                }
            });
        })
    };
    
    Setfrom(from: string): emailParams{
        this._from = from;
        return this;
    }

    Setto(to:string): emailParams{
        this._to = to;
        return this;
    }

    Setsubject(subject: string): emailParams{
        this._subject = subject;
        return this;
    }

    Settext(text: string): emailParams{
        this._text = text;
        return this;
    }

    _EndParams(): emailFactory{
        return this;
    }

    static new(){
        return new this;
    }
}

export default ControllerEmailFactory;