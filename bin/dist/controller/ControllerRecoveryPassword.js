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
class ControllerRecoveryPassword {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ModelFactory_1.default.new().getModelUsers();
    }
    SendEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = `http://localhost:8082/reset_password?token=${token}`;
            if (!this._SendMail) {
                process_1.exit;
            }
            ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar19022024@outlook.com')
                .Setto(email)
                .Setsubject('Solicitação de redefinição de senha')
                .Settext(`Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`)
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
                const token = user.resetPasswordToken = yield Encrypt_1.default.RandomToken();
                user.resetPasswordExpires = new Date(Date.now() + 3600000);
                yield user.save();
                yield this.SendEmail(req.body.login, token);
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
exports.default = ControllerRecoveryPassword;
/*const ControllerRecoveryPassword = (router: any)=>{

    router.post('/RecoveryPassword', async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = await ModelFactory.new().getModelUsers().UseModel().findOne({ email: req.body.login });
            const email = user?.email;
            let token: string = '';
            let currentDate = new Date();
            

            if (!user) {
                return res.status(400).send('Invalid login or password');
            }

            // Verifica se a data de expiração do token já passou
            if(currentDate.getTime() > user.resetPasswordExpires.getTime()) {
                token = crypto.randomBytes(20).toString('hex');
                
                user.resetPasswordToken = token;
                user.resetPasswordExpires = new Date(Date.now() + 3600000);

                try {
                    await user.save();
                }
                catch (error) {
                    console.error('Erro ao salvar o usuário:', error);
                }
            } else {
                token = user.resetPasswordToken;
            }


            const link = `http://localhost:8082/reset_password?token=${token}`;

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Solicitação de redefinição de senha',
                text: `Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`
            }

            SendEmail({ mailOptions: MailOptions });


            res.sendStatus(200);

        }
        catch (error) {
            res.sendStatus(500);
        }
    });

    return router;
}

export default ControllerRecoveryPassword; */
