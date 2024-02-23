import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import {IRouters, IRouterParams} from './Interfaces/ControllerInterface'
import { IModel } from '../model/Interfaces/ModelInterfaces';
import ModelFactory from '../model/Factory/ModelFactory';
import EncryptUtils from './Utils/Encrypt';


class ControllerLogin implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: any;

    constructor(){
        this._Model = ModelFactory.new().getModelUsers();
    }

    private async CheckPassword(password1: string, password2: string){
        try {
            if(await EncryptUtils.compare(password1, password2)){
                return true;
            }
            
            return false;
        } 
        catch (err) {
            console.error(err);
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
        this._Router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await this._Model.UseModel().findOne({ email: req.body.login });
        
                if (!user) {
                    return res.status(400).send('Invalid login or password');
                }
                
                if (await this.CheckPassword(req.body.password, user.senha)) {
                    const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';
        
                    this._token = Jwt.sign({
                            id: req.body.login,
                        },secret 
                    );
                            
                    return res.status(200).json({msg: 'success', token: this._token, user: user._id});
                } 
                
                return res.status(400).send('Invalid login or password');
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

export default ControllerLogin;