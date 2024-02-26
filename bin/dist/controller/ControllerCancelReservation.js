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
const ControllerModelFactory_1 = __importDefault(require("./Factory/ControllerModelFactory"));
const Encrypt_1 = __importDefault(require("./Utils/Encrypt"));
const ControllerEmailFactory_1 = __importDefault(require("./Factory/ControllerEmailFactory"));
class ControllerCancelReservation {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._token = '';
        this._Model = ControllerModelFactory_1.default.new().ModelReservation();
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
                return false;
            }
            const user = yield ControllerModelFactory_1.default.new().ModelUser().get().UseModel().findOne({ _id: userId });
            const response = yield ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(user.email)
                .Setsubject('Reserva cancelada!')
                .Settext('Sua reserva foi cancelada com sucesso!')
                ._EndParams()
                .SendEmail();
            if (response) {
                return true;
            }
            else {
                return false;
            }
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
        this._Router.put('/myReservation/cancel', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            this._token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
            try {
                if (!this.CheckToken()) {
                    return res.status(400).send('Invalid login or password');
                }
                const idRoom = req.body.idRoom;
                const userId = req.body.loggedIn.user;
                if (yield this.SendEmail(userId)) {
                    yield this._Model.UseModel().findOneAndUpdate({ _id: idRoom }, { $set: {
                            user: null,
                            initReservationDate: null,
                            endReservationDate: null
                        } }, { new: true });
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(500);
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
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
exports.default = ControllerCancelReservation;
