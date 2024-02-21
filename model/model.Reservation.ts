import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  img: string;
  pousada: number;
  roomsName: string;
  description: string;
  personLimit: number;
  initReservationDate: Date;
  endReservationDate: Date;
  user: string;
}

const ReservationSchema = new Schema<IReservation>({
  img: String,
  pousada: Number,
  roomsName: String,
  description: String,
  personLimit: Number,
  initReservationDate: Date,
  endReservationDate: Date,
  user: String
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema, 'ReservationRooms');
