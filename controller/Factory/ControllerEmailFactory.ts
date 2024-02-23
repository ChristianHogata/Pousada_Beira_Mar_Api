import { emailParams, emailFactory } from "../Interfaces/ControllerInterface";
import SendEmail from "../ControllerEmail";

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

    SendEmail(): void{

        this._MailOptions.from = this._from;
        this._MailOptions.to = this._to;
        this._MailOptions.subject = this._subject;
        this._MailOptions.text = this._text;
        
        try {
            SendEmail({ mailOptions: this._MailOptions });    
        } 
        catch (error) {
            console.log(error);    
        }     
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