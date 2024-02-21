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
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const SendEmail = (Useremail) => {
    const mailer = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secureConnection: false, // TLS requires secureConnection to be false
        auth: {
            user: "PousadaBeiraMar19022024@outlook.com",
            pass: "PousadaBeiraMar2024"
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
    let mailOptions = {
        from: 'PousadaBeiraMar19022024@outlook.com',
        to: Useremail,
        subject: 'Sua conta foi criada com sucesso!',
        text: 'Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!'
    };
    mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email enviado: ' + info);
        }
    });
};
exports.default = SendEmail;