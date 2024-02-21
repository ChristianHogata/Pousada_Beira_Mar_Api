import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    idUser: Schema.Types.ObjectId;
}

const UserSchema = new Schema({
    _id: String,
    nome: String,
    sobrenome: String,
    email: String,
    telefone: String,
    senha: String
});

export default mongoose.model('User', UserSchema, 'Users');
