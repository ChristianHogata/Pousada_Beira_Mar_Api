import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import ControllerRouter from './controller/ControllerRouter';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { json } from 'body-parser';

//MongoDb Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PousadaBeiraMar').catch((erro: any) => console.log(`Erro ao estabelecer a conexão com o MongoDB: ${erro}`));

const app = express();

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api', ControllerRouter());

export default app;
