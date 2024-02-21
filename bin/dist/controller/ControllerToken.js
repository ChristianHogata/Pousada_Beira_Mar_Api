"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ControllerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'ACCESS DENIED' });
    }
    try {
        const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (_a) {
        return res.status(400).json({ msg: 'INVALID TOKEN' });
    }
};
exports.default = ControllerToken;
