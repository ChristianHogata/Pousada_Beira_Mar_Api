import { Request, Response, NextFunction } from 'express';
import modelReservation from '../model/model.Reservation';
import ControllerToken from './ControllerToken';


const ControllerReservation = (router: any)=>{

    router.post('/reservation/success', ControllerToken, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idRoom = req.body.idRoom;
            const userId = req.body.userId;
     
            const updatedRoom = await modelReservation.findOneAndUpdate(
                { _id: idRoom },
                {$set: { 
                    user: userId,
                    initReservationDate: req.body.initDate,
                    endReservationDate: req.body.finishDate
                }},
                { new: true } 
            );
        
            return res.status(200).send(idRoom);

        } 
        catch (error) {
            res.sendStatus(500);
        }
    });

    return router;
}

export default ControllerReservation;
