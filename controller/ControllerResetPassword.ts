import { Request, Response, NextFunction } from 'express';
import ModelFactory from '../model/Factory/ModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';
import ControllerEmailFactory from './Factory/ControllerEmailFactory';
import { exit } from 'process';

class ControllerResetPassword implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: any;

    constructor(){
        this._Model = ModelFactory.new().getModelUsers();
    }

    private async SendEmail(email: string){

        if(!this._SendMail){
            exit;
        }

        ControllerEmailFactory
        .new()
        .setEmailParams()
            .Setfrom('PousadaBeiraMar19022024@outlook.com')
            .Setto(email)
            .Setsubject('Senha alterada com sucesso!')
            .Settext(`Sua senha foi redefinida com sucesso!`)
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
        this._Router.post('/reset_password', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await this._Model.UseModel().findOne({ resetPasswordToken: req.body.token});
                const token = user.resetPasswordToken;
                const password = await EncryptUtils.encrypt(req.body.password);
                let currentDate = new Date();
 
                if (!user) {
                    return res.status(400).send('Invalid email');
                } 
       
                if((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {      
                    return res.status(400).send('Token expirado!');    
                }

                await ModelFactory.new().getModelUsers().UseModel().findOneAndUpdate(
                    { resetPasswordToken: token}, 
                    {$set: { 
                        resetPasswordToken: '',
                        resetPasswordExpires: null,
                        senha: password
                    }}, 
                    { new: true }
                );
            
                this.SendEmail(user.email);

                return res.sendStatus(200);        
            } 
            catch (error) {
                console.log(error);
                return res.status(400).send('Falha ao recuperar a senha');
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

export default ControllerResetPassword;