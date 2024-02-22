import express from 'express';
import ControllerFindRooms from './ControllerFindRooms';
import ControllerCancelReservation from './ControllerCancelReservation';
import ControllerFindMyReservation from './ControllerFindMyReservation';
import ControllerLogin from './ControllerLogin';
import ControllerRegisterUser from './ControllerRegisterUser';
import ControllerReservation from './ControllerReservation';
import ControllerRecoveryPassword from './ControllerRecoveryPassword';
import ControllerResetPassword from './ControllerResetPassword';

const ControllerRouter = () => {
    const router = express.Router();

    ControllerFindRooms(router); 
    ControllerCancelReservation(router);
    ControllerFindMyReservation(router);
    ControllerLogin(router);
    ControllerRegisterUser(router); 
    ControllerReservation(router);
    ControllerRecoveryPassword(router); 
    ControllerResetPassword(router);

    return router;
}

export default ControllerRouter;
