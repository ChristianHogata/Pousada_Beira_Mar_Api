import express from 'express';
import ControllerFindRooms from './ControllerFindRooms';
import ControllerCancelReservation from './ControllerCancelReservation';
import ControllerFindMyReservation from './ControllerFindMyReservation';
import ControllerLogin from './ControllerLogin';
import ControllerRegisterUser from './ControllerRegisterUser';
import ControllerReservation from './ControllerReservation';

const ControllerRouter = () => {
    const router = express.Router();

    ControllerFindRooms(router); 
    ControllerCancelReservation(router);
    ControllerFindMyReservation(router);
    ControllerLogin(router);
    ControllerRegisterUser(router); 
    ControllerReservation(router); 

    return router;
}

export default ControllerRouter;
