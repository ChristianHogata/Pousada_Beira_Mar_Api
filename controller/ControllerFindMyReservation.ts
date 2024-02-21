import { Request, Response, NextFunction } from 'express';
import modelReservation from '../model/model.Reservation';
import { exit } from 'process';
import ControllerToken from './ControllerToken';

const ControllerFindMyReservation = (router: any)=>{

    router.get('/myReservation', ControllerToken, async (req: Request, res: Response, next: NextFunction) => {
        const {idUser} = req.query;
        console.log(idUser);
        const rooms = await modelReservation.find({user: idUser});
    
        if (rooms) {
            return res.status(200).send(rooms);
            exit;
        }
        
        res.sendStatus(404); 
    });
    return router;
}

export default ControllerFindMyReservation;
