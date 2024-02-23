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
const ModelFactory_1 = __importDefault(require("../model/Factory/ModelFactory"));
const Encrypt_1 = __importDefault(require("./Utils/Encrypt"));
const ControllerEmailFactory_1 = __importDefault(require("./Factory/ControllerEmailFactory"));
const process_1 = require("process");
class ControllerReservation {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._token = '';
        this._ModelReservation = ModelFactory_1.default.new().getModelReservation();
    }
    CheckToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield Encrypt_1.default.CheckToken(this._authentic, this._token)) {
                    return true;
                }
                return false;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    SendEmail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._SendMail) {
                process_1.exit;
            }
            const user = yield ModelFactory_1.default.new().getModelUsers().get().UseModel().findOne({ _id: userId });
            ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar19022024@outlook.com')
                .Setto(user.email)
                .Setsubject('Reserva realizada!')
                .Settext('Sua reserva foi realizada com sucesso!')
                ._EndParams()
                .SendEmail();
        });
    }
    setRouterParams() {
        return this;
    }
    SetRouter(router) {
        this._Router = router;
        return this;
    }
    ;
    Exec() {
        this._Router.post('/reservation/success', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this._token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }
                const idRoom = req.body.idRoom;
                const userId = req.body.loggedIn.user;
                yield this._ModelReservation.UseModel().findOneAndUpdate({ _id: idRoom }, { $set: {
                        user: userId,
                        initReservationDate: req.body.initDate,
                        endReservationDate: req.body.finishDate
                    } }, { new: true });
                yield this.SendEmail(userId);
                return res.status(200).send(idRoom);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500);
            }
        }));
    }
    SetAuthentic(set) {
        this._authentic = set;
        return this;
    }
    ;
    SetSendMail(set) {
        this._SendMail = set;
        return this;
    }
    ;
    _EndParams() {
        return this;
    }
    ;
}
exports.default = ControllerReservation;
