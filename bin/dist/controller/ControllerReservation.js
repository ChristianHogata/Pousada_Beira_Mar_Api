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
const ControllerToken_1 = __importDefault(require("./ControllerToken"));
const ControllerReservation = (router) => {
    router.post('/reservation/success', ControllerToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idRoom = req.body.idRoom;
            const userId = req.body.userId;
            const updatedRoom = yield model_Reservation_1.default.findOneAndUpdate({ _id: idRoom }, { $set: {
                    user: userId,
                    initReservationDate: req.body.initDate,
                    endReservationDate: req.body.finishDate
                } }, { new: true });
            return res.status(200).send(idRoom);
        }
        catch (error) {
            res.sendStatus(500);
        }
    }));
    return router;
};
exports.default = ControllerReservation;
