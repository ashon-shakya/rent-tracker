import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  rentAgreementId: mongoose.Types.ObjectId;
  periodStartDate: Date;
  periodEndDate: Date;
  dueDate: Date;
  paidAmount?: number;
  paidById?: mongoose.Types.ObjectId;
  paidDate?: Date;
  status: 'PENDING' | 'PAID' | 'PARTIAL';
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  rentAgreementId: { type: Schema.Types.ObjectId, ref: 'RentAgreement', required: true },
  periodStartDate: { type: Date, required: true },
  periodEndDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  paidAmount: { type: Number },
  paidById: { type: Schema.Types.ObjectId, ref: 'User' },
  paidDate: { type: Date },
  status: { type: String, enum: ['PENDING', 'PAID', 'PARTIAL'], default: 'PENDING' },
}, { timestamps: true });

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
