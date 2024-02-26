import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';
import ControllerEmailFactory from './Factory/ControllerEmailFactory';
import { exit } from 'process';


class ControllerCancelReservation implements IRouterParams, IRouters{

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
        } catch (err) {
            console.error(err);
        }  
    }

    private async SendEmail(userId: string){

        if(!this._SendMail){
            return false
        }

        const user = await ControllerModelFactory.new().ModelUser().get().UseModel().findOne({_id: userId});

        const response =
            await ControllerEmailFactory
            .new()
            .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(user.email)
                .Setsubject('Reserva cancelada!')
                .Settext('Sua reserva foi cancelada com sucesso!')
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
        
        this._Router.put('/myReservation/cancel', async (req: Request, res: Response, next: NextFunction) => {
            
            this._token = req.headers.authorization?.split(' ')[1] || ''; 

            try {
                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }
    
                const idRoom = req.body.idRoom;
                const userId = req.body.loggedIn.user;
                               
                if(await this.SendEmail(userId)){

                    await this._Model.UseModel().findOneAndUpdate(
                        { _id: idRoom }, 
                        {$set: { 
                            user: null,
                            initReservationDate: null,
                            endReservationDate: null
                        }}, 
                        { new: true }
                    );   
                    
                    return res.sendStatus(200);
                }
                else{
                    return res.sendStatus(500);
                }
            } 
            catch (error) {
                console.log(error);
                res.sendStatus(500); 
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

export default ControllerCancelReservation;