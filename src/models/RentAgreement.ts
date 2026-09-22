import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRentAgreement extends Document {
  address: string;
  icon: string;
  startDate: Date;
  endDate?: Date;
  rentAmount: number;
  bondAmount: number;
  rentDueDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const RentAgreementSchema: Schema = new Schema({
  address: { type: String, required: true },
  icon: { type: String, required: true, default: "Home" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  rentAmount: { type: Number, required: true },
  bondAmount: { type: Number, required: true },
  rentDueDays: { type: Number, required: true }, // e.g., 7 for weekly
}, { timestamps: true });

const RentAgreement: Model<IRentAgreement> = mongoose.models.RentAgreement || mongoose.model<IRentAgreement>('RentAgreement', RentAgreementSchema);

export default RentAgreement;
