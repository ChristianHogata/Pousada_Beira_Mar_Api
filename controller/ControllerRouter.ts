import express from 'express';
import ControllerFindRooms from './ControllerFindRooms';
import ControllerLogin from './ControllerLogin';
import ControllerReservation from './ControllerReservation';
import ControllerCancelReservation from './ControllerCancelReservation';
import ControllerRegisterUser from './ControllerRegisterUser';
import ControllerFindMyReservation from './ControllerFindMyReservation';
import ControllerRecoveryPassword from './ControllerRecoveryPassword';
import ControllerResetPassword from './ControllerResetPassword';

const ControllerRouter = () => {
    const router = express.Router();

    new ControllerRegisterUser().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();
    new ControllerLogin().setRouterParams().SetRouter(router)._EndParams().Exec();
    new ControllerFindRooms().setRouterParams().SetRouter(router).SetAuthentic(true)._EndParams().Exec();
    new ControllerReservation().setRouterParams().SetRouter(router).SetAuthentic(true).SetSendMail(true)._EndParams().Exec();
    new ControllerFindMyReservation().setRouterParams().SetRouter(router).SetAuthentic(true)._EndParams().Exec();
    new ControllerCancelReservation().setRouterParams().SetRouter(router).SetAuthentic(true).SetSendMail(true)._EndParams().Exec();
    new ControllerRecoveryPassword().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();
    new ControllerResetPassword().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();

    return router;
}

export default ControllerRouter;
