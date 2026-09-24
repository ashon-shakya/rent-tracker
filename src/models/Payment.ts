import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  rentAgreementId: mongoose.Types.ObjectId;
  utilityId?: mongoose.Types.ObjectId;
  type: "RENT" | "BOND" | "UTILITY";
  utilityTitle?: string;
  utilityCategory?: string;
  utilityIcon?: string;
  periodStartDate?: Date;
  periodEndDate?: Date;
  dueDate?: Date;
  paidAmount?: number;
  paidById?: mongoose.Types.ObjectId;
  paidBy?: string;
  paidDate?: Date;
  status: "PENDING" | "PAID" | "PARTIAL";
  isSettled: boolean;
  settledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    rentAgreementId: { type: Schema.Types.ObjectId, ref: "RentAgreement", required: true },
    utilityId: { type: Schema.Types.ObjectId, ref: "Utility" },
    type: { type: String, enum: ["RENT", "BOND", "UTILITY"], default: "RENT" },
    utilityTitle: { type: String },
    utilityCategory: { type: String },
    utilityIcon: { type: String },
    periodStartDate: { type: Date },
    periodEndDate: { type: Date },
    dueDate: { type: Date },
    paidAmount: { type: Number },
    paidById: { type: Schema.Types.ObjectId, ref: "User" },
    paidBy: { type: String },
    paidDate: { type: Date },
    status: { type: String, enum: ["PENDING", "PAID", "PARTIAL"], default: "PENDING" },
    isSettled: { type: Boolean, default: false },
    settledAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
PaymentSchema.index({ rentAgreementId: 1, periodStartDate: -1 });
PaymentSchema.index({ rentAgreementId: 1, type: 1, periodEndDate: -1 });
PaymentSchema.index({ rentAgreementId: 1, utilityId: 1, type: 1, periodEndDate: -1 });
PaymentSchema.index({ paidDate: -1 });

// Ensure referenced schemas are registered for populate queries
import "./RentAgreement";
import "./Utility";

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;

