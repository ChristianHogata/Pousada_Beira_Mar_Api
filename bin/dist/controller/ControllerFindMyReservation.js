"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_Reservation_1 = __importDefault(require("../model/model.Reservation"));
const process_1 = require("process");
const ControllerToken_1 = __importDefault(require("./ControllerToken"));
const ControllerFindMyReservation = (router) => {
    router.get('/myReservation', ControllerToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { idUser } = req.query;
        const rooms = yield model_Reservation_1.default.find({ user: idUser });
        if (rooms) {
            return res.status(200).send(rooms);
            process_1.exit;
        }
        res.sendStatus(404);
    }));
    return router;
};
exports.default = ControllerFindMyReservation;
