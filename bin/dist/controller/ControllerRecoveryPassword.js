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
class ControllerRecoveryPassword {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ControllerModelFactory_1.default.new().ModelUser();
    }
    SendEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = `http://localhost:3000/reset_password?token=${token}`;
            if (!this._SendMail) {
                return false;
            }
            const response = yield ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(email)
                .Setsubject('Solicitação de redefinição de senha')
                .Settext(`Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`)
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
        this._Router.post('/RecoveryPassword', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._Model.UseModel().findOne({ email: req.body.login });
                let currentDate = new Date();
                if (!user) {
                    return res.status(400).send('Invalid email');
                }
                if ((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {
                    return res.status(400).send('Token expirado!');
                }
                const token = yield Encrypt_1.default.RandomToken();
                if (yield this.SendEmail(req.body.login, token)) {
                    yield this._Model.UseModel().findOneAndUpdate({ email: req.body.login }, { $set: {
                            resetPasswordExpires: new Date(Date.now() + 3600000),
                            resetPasswordToken: token
                        } }, { new: true });
                    return res.sendStatus(200);
                }
                else {
                    return res.status(500).send('Falha ao recuperar a senha');
                }
            }
            catch (error) {
                return res.status(500).send('Falha ao recuperar a senha');
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
exports.default = ControllerRecoveryPassword;
