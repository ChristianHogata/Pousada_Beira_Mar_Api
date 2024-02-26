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
class ControllerRegisterUser {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ControllerModelFactory_1.default.new().ModelUser();
    }
    ExistUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ControllerModelFactory_1.default.new().ModelUser().UseModel().findOne({ email: email });
        });
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
                .Setsubject('Sua conta foi criada com sucesso!')
                .Settext('Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!')
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
        this._Router.post('/register', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.ExistUser(req.body.email)) {
                    return res.status(400).send('E-mail já está cadastrado');
                }
                const password = yield Encrypt_1.default.encrypt(req.body.senha);
                if (!password) {
                    return res.status(500).send('Erro ao criptografar a senha');
                }
                if (yield this.SendEmail(req.body.email)) {
                    const User = this._Model.UseModel();
                    const newUser = new User(Object.assign(Object.assign({}, req.body), { senha: password }));
                    yield newUser.save();
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(500);
                }
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
exports.default = ControllerRegisterUser;
