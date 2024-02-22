"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ControllerFindRooms_1 = __importDefault(require("./ControllerFindRooms"));
const ControllerCancelReservation_1 = __importDefault(require("./ControllerCancelReservation"));
const ControllerFindMyReservation_1 = __importDefault(require("./ControllerFindMyReservation"));
const ControllerLogin_1 = __importDefault(require("./ControllerLogin"));
const ControllerRegisterUser_1 = __importDefault(require("./ControllerRegisterUser"));
const ControllerReservation_1 = __importDefault(require("./ControllerReservation"));
const ControllerRecoveryPassword_1 = __importDefault(require("./ControllerRecoveryPassword"));
const ControllerResetPassword_1 = __importDefault(require("./ControllerResetPassword"));
const ControllerRouter = () => {
    const router = express_1.default.Router();
    (0, ControllerFindRooms_1.default)(router);
    (0, ControllerCancelReservation_1.default)(router);
    (0, ControllerFindMyReservation_1.default)(router);
    (0, ControllerLogin_1.default)(router);
    (0, ControllerRegisterUser_1.default)(router);
    (0, ControllerReservation_1.default)(router);
    (0, ControllerRecoveryPassword_1.default)(router);
    (0, ControllerResetPassword_1.default)(router);
    return router;
};
exports.default = ControllerRouter;
