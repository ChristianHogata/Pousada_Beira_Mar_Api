import { Request, Response, NextFunction } from 'express';
import ControllerModelFactory from './Factory/ControllerModelFactory';
import { IRouterParams, IRouters } from './Interfaces/ControllerInterface';
import { IModel } from '../model/Interfaces/ModelInterfaces';
import EncryptUtils from './Utils/Encrypt';
import ControllerEmailFactory from './Factory/ControllerEmailFactory';
import { exit } from 'process';


class ControllerReservation implements IRouterParams, IRouters{

    private _authentic: boolean = false;
    private _SendMail: boolean = false;
    private _Router: any;
    private _ModelReservation: IModel;
    private _token: string = '';

    constructor(){
        this._ModelReservation = ControllerModelFactory.new().ModelReservation();
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

    private async SendEmail(userId: any){

        if(!this._SendMail){
            exit;
        }

        const user = await ControllerModelFactory.new().ModelUser().get().UseModel().findOne({_id: userId});
     
        ControllerEmailFactory
        .new()
        .setEmailParams()
            .Setfrom('PousadaBeiraMar19022024@outlook.com')
            .Setto(user.email)
            .Setsubject('Reserva realizada!')
            .Settext('Sua reserva foi realizada com sucesso!')
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
        this._Router.post('/reservation/success', async (req: Request, res: Response, next: NextFunction) => {
            try {
                this._token = req.headers.authorization?.split(' ')[1] || '';

                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }

                const idRoom = req.body.idRoom;
                const userId = req.body.loggedIn.user;
     
                await this._ModelReservation.UseModel().findOneAndUpdate(
                    { _id: idRoom },
                    {$set: { 
                        user: userId,
                        initReservationDate: req.body.initDate,
                        endReservationDate: req.body.finishDate
                    }},
                    { new: true } 
                );

                await this.SendEmail(userId);

                return res.status(200).send(idRoom);
            
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

export default ControllerReservation;