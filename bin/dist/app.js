"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const ControllerRouter_1 = __importDefault(require("./controller/ControllerRouter"));
const express_session_1 = __importDefault(require("express-session"));
//MongoDb Connection
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect('mongodb://localhost/PousadaBeiraMar').catch((erro) => console.log(`Erro ao estabelecer a conexão com o MongoDB: ${erro}`));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)());
app.use('/api', (0, ControllerRouter_1.default)());
exports.default = app;
