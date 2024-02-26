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
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
class ControllerEmailFactory {
    constructor() {
        this._from = '';
        this._to = '';
        this._subject = '';
        this._text = '';
        this._MailOptions = {
            from: '',
            to: '',
            subject: '',
            text: '',
        };
    }
    setEmailParams() {
        return this;
    }
    ;
    SendEmail() {
        this._MailOptions.from = this._from;
        this._MailOptions.to = this._to;
        this._MailOptions.subject = this._subject;
        this._MailOptions.text = this._text;
        const mailer = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secureConnection: false,
            auth: {
                user: "PousadaBeiraMar2024@outlook.com",
                pass: "PousadaBeiraMar"
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            mailer.sendMail(this._MailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(false);
                }
                else {
                    console.log('Email enviado: ' + info);
                    resolve(true);
                }
            });
        }));
    }
    ;
    Setfrom(from) {
        this._from = from;
        return this;
    }
    Setto(to) {
        this._to = to;
        return this;
    }
    Setsubject(subject) {
        this._subject = subject;
        return this;
    }
    Settext(text) {
        this._text = text;
        return this;
    }
    _EndParams() {
        return this;
    }
    static new() {
        return new this;
    }
}
exports.default = ControllerEmailFactory;
