import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    idUser: Schema.Types.ObjectId;
}

const UserSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    telefone: String,
    senha: String,
    resetPasswordExpires: { type: Schema.Types.Mixed, default: null },
    resetPasswordToken: { type: String, default: '' }
});

export default mongoose.model('User', UserSchema, 'Users');
