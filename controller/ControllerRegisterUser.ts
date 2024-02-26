import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';
import ControllerEmailFactory from './Factory/ControllerEmailFactory';
import { exit } from 'process';


class ControllerRegisterUser implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: any;

    constructor(){
        this._Model = ControllerModelFactory.new().ModelUser();
    }
  
    private async ExistUser(email: string){
        return await ControllerModelFactory.new().ModelUser().UseModel().findOne({ email: email });
    }

    private async SendEmail(email: string){

        if(!this._SendMail){
            return false
        }

        const response =
            await ControllerEmailFactory
            .new()
            .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(email)
                .Setsubject('Sua conta foi criada com sucesso!')
                .Settext('Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!')
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
        this._Router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
            try {

                if (await this.ExistUser(req.body.email)) {
                    return res.status(400).send('E-mail já está cadastrado');
                }
 
                const password = await EncryptUtils.encrypt(req.body.senha);
         
                if (!password) {
                    return res.status(500).send('Erro ao criptografar a senha');
                }
 

                if(await this.SendEmail(req.body.email)){

                    const User = this._Model.UseModel();

                    const newUser = new User({
                        ...req.body,
                        senha: password, 
                    });
      
                    await newUser.save();

                    return res.sendStatus(200);
                }
                else{
                    return res.sendStatus(500);
                }
    
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500);
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

export default ControllerRegisterUser;