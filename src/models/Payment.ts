import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  rentAgreementId: mongoose.Types.ObjectId;
  type: 'RENT' | 'BOND';
  periodStartDate?: Date;
  periodEndDate?: Date;
  dueDate?: Date;
  paidAmount?: number;
  paidById?: mongoose.Types.ObjectId;
  paidBy?: string;
  paidDate?: Date;
  status: 'PENDING' | 'PAID' | 'PARTIAL';
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  rentAgreementId: { type: Schema.Types.ObjectId, ref: 'RentAgreement', required: true },
  type: { type: String, enum: ['RENT', 'BOND'], default: 'RENT' },
  periodStartDate: { type: Date },
  periodEndDate: { type: Date },
  dueDate: { type: Date },
  paidAmount: { type: Number },
  paidById: { type: Schema.Types.ObjectId, ref: 'User' },
  paidBy: { type: String },
  paidDate: { type: Date },
  status: { type: String, enum: ['PENDING', 'PAID', 'PARTIAL'], default: 'PENDING' },
}, { timestamps: true });

if (mongoose.models.Payment) {
  delete mongoose.models.Payment;
}
const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
