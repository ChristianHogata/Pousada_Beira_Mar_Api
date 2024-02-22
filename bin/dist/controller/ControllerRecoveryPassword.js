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
const model_Users_1 = __importDefault(require("../model/model.Users"));
const crypto_1 = __importDefault(require("crypto"));
const ControllerEmail_1 = __importDefault(require("./ControllerEmail"));
const ControllerRecoveryPassword = (router) => {
    router.post('/RecoveryPassword', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield model_Users_1.default.findOne({ email: req.body.login });
            const email = user === null || user === void 0 ? void 0 : user.email;
            let token = '';
            let currentDate = new Date();
            if (!user) {
                return res.status(400).send('Invalid login or password');
            }
            // Verifica se a data de expiração do token já passou
            if (currentDate.getTime() > user.resetPasswordExpires.getTime()) {
                token = crypto_1.default.randomBytes(20).toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = new Date(Date.now() + 3600000);
                try {
                    yield user.save();
                }
                catch (error) {
                    console.error('Erro ao salvar o usuário:', error);
                }
            }
            else {
                token = user.resetPasswordToken;
            }
            const link = `http://localhost:8082/reset_password?token=${token}`;
            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Solicitação de redefinição de senha',
                text: `Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`
            };
            (0, ControllerEmail_1.default)({ mailOptions: MailOptions });
            res.sendStatus(200);
        }
        catch (error) {
            res.sendStatus(500);
        }
    }));
    return router;
};
exports.default = ControllerRecoveryPassword;
