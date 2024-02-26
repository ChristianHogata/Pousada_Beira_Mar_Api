import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
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
        this._Model = ControllerModelFactory.new().ModelUser();
    }

    private async SendEmail(email: string){

        if(!this._SendMail){
            return false;
        }
        
        const response =
            await ControllerEmailFactory
            .new()
            .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(email)
                .Setsubject('Senha alterada com sucesso!')
                .Settext(`Sua senha foi redefinida com sucesso!`)
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
        this._Router.post('/reset_password', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await this._Model.UseModel().findOne({ resetPasswordToken: req.body.token});
            
                if(!user.resetPasswordToken){
                    return res.status(400).send('Não foi solicitado alteração de senha');    
                }

                const token = user.resetPasswordToken;
                const password = await EncryptUtils.encrypt(req.body.password);
                let currentDate = new Date();
 
                if (!user) {
                    return res.status(400).send('Invalid email');
                } 
       
                if((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {      
                    return res.status(400).send('Token expirado!');    
                }
                      
                if(await this.SendEmail(user.email)){
                   
                    await ControllerModelFactory.new().ModelUser().UseModel().findOneAndUpdate(
                        { resetPasswordToken: token}, 
                        {$set: { 
                            resetPasswordToken: '',
                            resetPasswordExpires: null,
                            senha: password
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