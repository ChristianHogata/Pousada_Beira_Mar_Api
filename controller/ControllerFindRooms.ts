import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';

class ControllerFindRooms implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _Model: IModel;
    private _token: any;

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
        this._Router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
            try {
                this._token = req.headers.authorization?.split(' ')[1]; 

                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }
              

                const {pousada, initReservationDate, endReservationDate } = req.query;

                let startDate = (initReservationDate ? new Date(initReservationDate as string) : null);
                let endDate = (endReservationDate ? new Date(endReservationDate as string) : null);
                
                if (startDate && endDate) {
                    const rooms = 
                    await this._Model.UseModel().find({
                        pousada: Number(pousada),
                        ...(startDate && endDate ? {
                            $or: [
                                { initReservationDate: { $gt: endDate } },
                                { endReservationDate: { $lt: startDate } },
                                { initReservationDate: null, endReservationDate: null }
                            ]
                        } : {})
                    });

                    return res.status(200).send(rooms);
                }

                return res.sendStatus(404);   
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

export default ControllerFindRooms;