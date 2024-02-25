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
        
        const link = `http://localhost:8082/reset_password?token=${token}`;

        if(!this._SendMail){
            exit;
        }

        ControllerEmailFactory
        .new()
        .setEmailParams()
            .Setfrom('PousadaBeiraMar19022024@outlook.com')
            .Setto(email)
            .Setsubject('Solicitação de redefinição de senha')
            .Settext(`Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`)
        ._EndParams()
        .SendEmail()
            
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
          
                const token = user.resetPasswordToken = await EncryptUtils.RandomToken();
                user.resetPasswordExpires = new Date(Date.now() + 3600000); 
            
                await user.save();
          
                await this.SendEmail(req.body.login, token);

                return res.status(200);
            } 
            catch (error) {
                console.log(error);
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