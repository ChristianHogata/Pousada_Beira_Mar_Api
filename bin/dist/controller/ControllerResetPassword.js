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
class ControllerResetPassword {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ControllerModelFactory_1.default.new().ModelUser();
    }
    SendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._SendMail) {
                return false;
            }
            const response = yield ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar2024@outlook.com')
                .Setto(email)
                .Setsubject('Senha alterada com sucesso!')
                .Settext(`Sua senha foi redefinida com sucesso!`)
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
        this._Router.post('/reset_password', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._Model.UseModel().findOne({ resetPasswordToken: req.body.token });
                if (!user.resetPasswordToken) {
                    return res.status(400).send('Não foi solicitado alteração de senha');
                }
                const token = user.resetPasswordToken;
                const password = yield Encrypt_1.default.encrypt(req.body.password);
                let currentDate = new Date();
                if (!user) {
                    return res.status(400).send('Invalid email');
                }
                if ((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {
                    return res.status(400).send('Token expirado!');
                }
                if (yield this.SendEmail(user.email)) {
                    yield ControllerModelFactory_1.default.new().ModelUser().UseModel().findOneAndUpdate({ resetPasswordToken: token }, { $set: {
                            resetPasswordToken: '',
                            resetPasswordExpires: null,
                            senha: password
                        } }, { new: true });
                    return res.sendStatus(200);
                }
                else {
                    return res.status(500).send('Falha ao recuperar a senha');
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).send('Falha ao recuperar a senha');
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
exports.default = ControllerResetPassword;
