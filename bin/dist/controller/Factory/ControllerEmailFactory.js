"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerEmail_1 = __importDefault(require("../ControllerEmail"));
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
        try {
            (0, ControllerEmail_1.default)({ mailOptions: this._MailOptions });
        }
        catch (error) {
            console.log(error);
        }
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
