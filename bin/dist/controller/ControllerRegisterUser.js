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
class ControllerRegisterUser {
    constructor() {
        this._authentic = false;
        this._SendMail = false;
        this._Model = ModelFactory_1.default.new().getModelUsers();
    }
    ExistUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelFactory_1.default.new().getModelUsers().UseModel().findOne({ email: email });
        });
    }
    SendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._SendMail) {
                process_1.exit;
            }
            const user = yield this._Model.UseModel().findOne({ token: this._token });
            ControllerEmailFactory_1.default
                .new()
                .setEmailParams()
                .Setfrom('PousadaBeiraMar19022024@outlook.com')
                .Setto(user.email)
                .Setsubject('Sua conta foi criada com sucesso!')
                .Settext('Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!')
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
        this._Router.post('/register', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.ExistUser(req.body.email)) {
                    return res.status(400).send('E-mail já está cadastrado');
                }
                const password = yield Encrypt_1.default.encrypt(req.body.senha);
                if (!password) {
                    return res.status(500).send('Erro ao criptografar a senha');
                }
                const User = this._Model.UseModel();
                const newUser = new User(Object.assign(Object.assign({}, req.body), { senha: password }));
                yield newUser.save();
                yield this.SendEmail();
                res.sendStatus(200);
            }
            catch (error) {
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
exports.default = ControllerRegisterUser;
/*const ControllerRegisterUser = (router: any)=>{
    
    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        // Verifique se já existe um usuário com este e-mail
        const existingUser = await ModelFactory.new().getModelUsers().UseModel().findOne({ email: req.body.email });
        const email = existingUser?.email;
    
        if (existingUser) {
        // Se um usuário existente for encontrado, retorne um erro
            return res.status(400).send('E-mail já está cadastrado');
        }

    
        // Criptografe a senha antes de salvar o usuário
        bcrypt.hash(req.body.senha, 10, async function(err, hash) {
        // Se ocorrer um erro durante a criptografia, retorne um erro
        if (err) {

            return res.status(500).send('Erro ao criptografar a senha');
        }
    
        // Se nenhum usuário existente for encontrado, crie uma nova instância do seu modelo com os dados do req.body
        const newUser = ModelFactory.new().getModelUsers().UseModel().new({
            ...req.body,
            senha: hash,  // Substitua a senha em texto simples pela senha criptografada
        });
    
        try {
            // Salve a nova instância no banco de dados
            try {
                await newUser.save();
            }
            catch (error) {
                console.error('Erro ao salvar o usuário:', error);
            }
    
            // Envie o status HTTP 200
            res.sendStatus(200);

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Sua conta foi criada com sucesso!',
                text: 'Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!'
            }

            SendEmail({ mailOptions: MailOptions });

        }
        catch (error) {
            // Trate qualquer erro que possa ocorrer
            res.sendStatus(500); // Envie o status HTTP 500 se ocorrer um erro
        }
        });
    });

    return router;
}

export default ControllerRegisterUser; */
