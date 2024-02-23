import mongoose, { Document, Schema } from 'mongoose';
import { IModel } from './Interfaces/ModelInterfaces';

interface IReservation extends Document {
  img: string;
  pousada: number;
  roomsName: string;
  description: string;
  personLimit: number;
  initReservationDate: Date;
  endReservationDate: Date;
  user: string;
}

class ModelReservation implements IModel {
  private ReservationSchema: Schema;
  private ReservationModel: mongoose.Model<IReservation>;

  constructor() {
    this.ReservationSchema = new Schema<IReservation>({
      img: String,
      pousada: Number,
      roomsName: String,
      description: String,
      personLimit: Number,
      initReservationDate: Date,
      endReservationDate: Date,
      user: String
    });

    if (mongoose.models.Reservation) {
      this.ReservationModel = mongoose.models.Reservation as mongoose.Model<IReservation>;
    } else {
      this.ReservationModel = mongoose.model<IReservation>('Reservation', this.ReservationSchema, 'ReservationRooms');
    }
  }

  get(): IModel{
    return this;
  }

  UseModel() {
    return this.ReservationModel;
  }

  static new(){
    return new this
  }
}

export default ModelReservation;
