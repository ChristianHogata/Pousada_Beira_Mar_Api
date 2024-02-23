import mongoose, { Document, Schema } from 'mongoose';
import { IModel } from './Interfaces/ModelInterfaces';

interface IUser extends Document {
    idUser: Schema.Types.ObjectId;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    senha: string;
    resetPasswordExpires: Schema.Types.Mixed;
    resetPasswordToken: string;
}

class ModelUser implements IModel {
    private UserSchema: Schema;
    private UserModel: mongoose.Model<IUser>;

    constructor() {
        this.UserSchema = new Schema({
            nome: String,
            sobrenome: String,
            email: String,
            telefone: String,
            senha: String,
            resetPasswordExpires: { type: Schema.Types.Mixed, default: null },
            resetPasswordToken: { type: String, default: '' }
        });

        if (mongoose.models.User) {
            this.UserModel = mongoose.models.User as mongoose.Model<IUser>;
        } else {
            this.UserModel = mongoose.model<IUser>('User', this.UserSchema, 'Users');
        }
    }

    get(): IModel{
        return this;
    }
    
    UseModel() {
        return this.UserModel;
    }
    
    static new(){
        return new this
    }
}

export default ModelUser;