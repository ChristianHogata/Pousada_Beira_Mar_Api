import { Request, Response, NextFunction } from 'express';
import modelReservation from '../model/model.Reservation';
import { exit } from 'process';
import ControllerToken from './ControllerToken';

const ControllerFindRooms = (router: any)=>{
    
    //const router = express.Router();

    router.get('/list', ControllerToken, async (req: Request, res: Response, next: NextFunction) => {
        const {pousada, initReservationDate, endReservationDate } = req.query;
        
        let startDate = typeof initReservationDate === 'string' ? new Date(initReservationDate) : undefined;
        let endDate = typeof endReservationDate === 'string' ? new Date(endReservationDate) : undefined;
    
        const rooms = await modelReservation.find({
        pousada: Number(pousada),
        ...(startDate && endDate ? {
            $or: [
            { initReservationDate: { $gt: endDate } },
            { endReservationDate: { $lt: startDate } },
            { initReservationDate: null, endReservationDate: null }
            ]
        } : {})
        });
    
        if (rooms) {
            return res.status(200).send(rooms);
            exit;
        }
    
        res.sendStatus(404);
    });

    return router;
}

export default ControllerFindRooms;
