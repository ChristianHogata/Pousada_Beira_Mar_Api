"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const ControllerEmail_1 = __importDefault(require("./ControllerEmail"));
const ControllerRegisterUser = (router) => {
    router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Verifique se já existe um usuário com este e-mail
        const existingUser = yield model_Users_1.default.findOne({ email: req.body.email });
        const email = existingUser === null || existingUser === void 0 ? void 0 : existingUser.email;
        if (existingUser) {
            // Se um usuário existente for encontrado, retorne um erro
            return res.status(400).send('E-mail já está cadastrado');
        }
        // Criptografe a senha antes de salvar o usuário
        bcrypt.hash(req.body.senha, 10, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                // Se ocorrer um erro durante a criptografia, retorne um erro
                if (err) {
                    return res.status(500).send('Erro ao criptografar a senha');
                }
                // Se nenhum usuário existente for encontrado, crie uma nova instância do seu modelo com os dados do req.body
                const newUser = new model_Users_1.default(Object.assign(Object.assign({}, req.body), { senha: hash }));
                try {
                    // Salve a nova instância no banco de dados
                    try {
                        yield newUser.save();
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
                    };
                    (0, ControllerEmail_1.default)({ mailOptions: MailOptions });
                }
                catch (error) {
                    // Trate qualquer erro que possa ocorrer
                    res.sendStatus(500); // Envie o status HTTP 500 se ocorrer um erro
                }
            });
        });
    }));
    return router;
};
exports.default = ControllerRegisterUser;
