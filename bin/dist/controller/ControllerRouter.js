"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ControllerFindRooms_1 = __importDefault(require("./ControllerFindRooms"));
const ControllerLogin_1 = __importDefault(require("./ControllerLogin"));
const ControllerReservation_1 = __importDefault(require("./ControllerReservation"));
const ControllerCancelReservation_1 = __importDefault(require("./ControllerCancelReservation"));
const ControllerRegisterUser_1 = __importDefault(require("./ControllerRegisterUser"));
const ControllerFindMyReservation_1 = __importDefault(require("./ControllerFindMyReservation"));
const ControllerRecoveryPassword_1 = __importDefault(require("./ControllerRecoveryPassword"));
const ControllerResetPassword_1 = __importDefault(require("./ControllerResetPassword"));
const ControllerRouter = () => {
    const router = express_1.default.Router();
    new ControllerRegisterUser_1.default().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();
    new ControllerLogin_1.default().setRouterParams().SetRouter(router)._EndParams().Exec();
    new ControllerFindRooms_1.default().setRouterParams().SetRouter(router).SetAuthentic(true)._EndParams().Exec();
    new ControllerReservation_1.default().setRouterParams().SetRouter(router).SetAuthentic(true).SetSendMail(true)._EndParams().Exec();
    new ControllerFindMyReservation_1.default().setRouterParams().SetRouter(router).SetAuthentic(true)._EndParams().Exec();
    new ControllerCancelReservation_1.default().setRouterParams().SetRouter(router).SetAuthentic(true).SetSendMail(true)._EndParams().Exec();
    new ControllerRecoveryPassword_1.default().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();
    new ControllerResetPassword_1.default().setRouterParams().SetRouter(router).SetSendMail(true)._EndParams().Exec();
    return router;
};
exports.default = ControllerRouter;
