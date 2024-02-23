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
class ControllerResetPassword {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ModelFactory_1.default.new().getModelUsers();
    }
    SendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._SendMail) {
                process_1.exit;
            }
            ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar19022024@outlook.com')
                .Setto(email)
                .Setsubject('Senha alterada com sucesso!')
                .Settext(`Sua senha foi redefinida com sucesso!`)
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
        this._Router.post('/reset_password', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._Model.UseModel().findOne({ resetPasswordToken: req.body.token });
                const token = user.resetPasswordToken;
                const password = yield Encrypt_1.default.encrypt(req.body.password);
                let currentDate = new Date();
                if (!user) {
                    return res.status(400).send('Invalid email');
                }
                if ((user.resetPasswordExpires) && (!currentDate.getTime() > user.resetPasswordExpires.getTime())) {
                    return res.status(400).send('Token expirado!');
                }
                yield ModelFactory_1.default.new().getModelUsers().UseModel().findOneAndUpdate({ resetPasswordToken: token }, { $set: {
                        resetPasswordToken: '',
                        resetPasswordExpires: null,
                        senha: password
                    } }, { new: true });
                this.SendEmail(user.email);
                res.sendStatus(200);
            }
            catch (error) {
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
/*const ControllerResetPassword = (router: any)=>{

    router.post('/reset_password', async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = await ModelFactory.new().getModelUsers().UseModel().findOne({ resetPasswordToken: req.body.token });
            const email = user?.email;
            const token = user?.resetPasswordToken;
   
            let currentDate = new Date();

            if (!user) {
                return res.status(400).send('Invalid login or password');
            }


            // Verifica se a data de expiração do token já passou
           
            if(currentDate.getTime() > user.resetPasswordExpires.getTime()) {
                
                bcrypt.hash(req.body.password, 10, async function(err, hash) {
                    // Se ocorrer um erro durante a criptografia, retorne um erro
                    if (err) {
            
                        return res.status(500).send('Erro ao criptografar a senha');
                    }
                    
                    try {
                        const updatedUser = await ModelFactory.new().getModelUsers().UseModel().findOneAndUpdate(
                            { resetPasswordToken: token},
                            {$set: {
                                resetPasswordToken: '',
                                resetPasswordExpires: null,
                                senha: hash
                            }},
                            { new: true }
                        );
                    }
                    catch (error) {
                        console.error('Erro ao redefinir senha:', error);
                    }
                });
            }

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Senha alterada com sucesso!',
                text: `Sua senha foi redefinida com sucesso!`
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

export default ControllerResetPassword; */
