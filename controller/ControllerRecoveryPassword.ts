import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';
import ControllerEmailFactory from './Factory/ControllerEmailFactory';
import { exit } from 'process';


class ControllerRecoveryPassword implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: any;

    constructor(){
        this._Model = ControllerModelFactory.new().ModelUser();
    }

    private async SendEmail(email: string, token: string){
        
        const link = `http://localhost:3000/reset_password?token=${token}`;
   
        if(!this._SendMail){
            return false
        }

        
        const response =
            await ControllerEmailFactory
            .new()
            .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(email)
                .Setsubject('Solicitação de redefinição de senha')
                .Settext(`Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`)
            ._EndParams()
            .SendEmail()   
        
        if(response){
            return true;
        }
        else{
            return false;
        }
    }

    setRouterParams(): IRouterParams{
        return this;    
    }

    SetRouter(router:any): IRouterParams{
        this._Router = router;
        return this;
    };

    Exec(): void {
        this._Router.post('/RecoveryPassword', async (req: Request, res: Response, next: NextFunction) => {
            try {
           
                const user = await this._Model.UseModel().findOne({ email: req.body.login });
                let currentDate = new Date();
                           
                if (!user) {
                    return res.status(400).send('Invalid email');
                }           

                if((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {      
                    return res.status(400).send('Token expirado!');    
                }
          
                const token = await EncryptUtils.RandomToken();         
          
                if(await this.SendEmail(req.body.login, token)){

                    await this._Model.UseModel().findOneAndUpdate(
                        { email: req.body.login },
                        {$set: { 
                            resetPasswordExpires: new Date(Date.now() + 3600000),
                            resetPasswordToken: token
                        }},
                        { new: true } 
                    );

                    return res.sendStatus(200); 
                }
                else{
                    return res.status(500).send('Falha ao recuperar a senha'); 
                }
                
            } 
            catch (error) {
                return res.status(500).send('Falha ao recuperar a senha');
            }               
        });   
    }
    
    SetAuthentic(set: boolean): IRouterParams{
        this._authentic = set;
        return this;
    };

    SetSendMail(set: boolean): IRouterParams{
        this._SendMail = set;
        return this;
    };

    _EndParams(): IRouters {
        return this;
    };
}

export default ControllerRecoveryPassword;