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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ControllerModelFactory_1 = __importDefault(require("./Factory/ControllerModelFactory"));
const Encrypt_1 = __importDefault(require("./Utils/Encrypt"));
class ControllerLogin {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ControllerModelFactory_1.default.new().ModelUser();
    }
    CheckPassword(password1, password2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield Encrypt_1.default.compare(password1, password2)) {
                    return true;
                }
                return false;
            }
            catch (err) {
                console.error(err);
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
        this._Router.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._Model.UseModel().findOne({ email: req.body.login });
                if (!user) {
                    return res.status(400).send('Invalid login or password');
                }
                if (yield this.CheckPassword(req.body.password, user.senha)) {
                    const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';
                    this._token = jsonwebtoken_1.default.sign({
                        id: req.body.login,
                    }, secret);
                    return res.status(200).json({ msg: 'success', token: this._token, user: user._id });
                }
                return res.status(400).send('Invalid login or password');
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
exports.default = ControllerLogin;
