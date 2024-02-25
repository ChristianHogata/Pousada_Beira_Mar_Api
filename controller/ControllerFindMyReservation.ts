import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';

class ControllerFindMyReservation implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: string = '';

    constructor(){
        this._Model = ControllerModelFactory.new().ModelReservation();
    }

    private async CheckToken(){
        try {
            if(await EncryptUtils.CheckToken(this._authentic, this._token)){
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
        this._Router.get('/myReservation', async (req: Request, res: Response, next: NextFunction) => {
            try {
                this._token = req.headers.authorization?.split(' ')[1] || ''; 

                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }

                const {idUser} = req.query;
       
                const rooms = await this._Model.UseModel().find({user: idUser});
    
                if (rooms) {
                    return res.status(200).send(rooms);
                }

                return res.status(400);

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

export default ControllerFindMyReservation;
