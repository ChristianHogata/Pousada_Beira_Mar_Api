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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ControllerLogin = (router) => {
    //const router = express.Router();
    router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Procure um usuário com o login fornecido
        const user = yield model_Users_1.default.findOne({ email: req.body.login });
        if (!user) {
            // Se nenhum usuário for encontrado, retorne um erro
            return res.status(400).send('Invalid login or password');
        }
        // Se um usuário for encontrado, compare a senha fornecida com a senha hash armazenada
        if (user && user.senha) {
            bcrypt.compare(req.body.password, user.senha, (err, isMatch) => {
                if (err) {
                    return res.status(500).send('An error occurred');
                }
                if (!isMatch) {
                    // Se as senhas não corresponderem, retorne um erro
                    return res.status(400).send('Invalid login or password');
                }
                try {
                    const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';
                    const token = jsonwebtoken_1.default.sign({
                        id: req.body.login,
                    }, secret);
                    return res.status(200).json({ msg: 'success', token, user: user._id });
                }
                catch (_a) {
                    return res.status(500).send('An error occurred');
                }
            });
        }
        else {
            return res.status(400).send('Invalid login or password');
        }
    }));
    return router;
};
exports.default = ControllerLogin;
