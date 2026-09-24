import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRentAgreement extends Document {
  ownerEmail: string;
  address: string;
  icon: string;
  startDate: Date;
  endDate?: Date;
  rentAmount: number;
  bondAmount: number;
  rentDueDays: number;
  adminRentShareParts: number;
  adminBondShareParts: number;
  adminUtilityShareParts: number;
  createdAt: Date;
  updatedAt: Date;
}

const RentAgreementSchema: Schema = new Schema(
  {
    ownerEmail: { type: String },
    address: { type: String, required: true },
    icon: { type: String, required: true, default: "Home" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    rentAmount: { type: Number, required: true },
    bondAmount: { type: Number, required: true },
    rentDueDays: { type: Number, required: true },
    adminRentShareParts: { type: Number, default: 1 },
    adminBondShareParts: { type: Number, default: 1 },
    adminUtilityShareParts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Indexes
RentAgreementSchema.index({ ownerEmail: 1, createdAt: -1 });

const RentAgreement: Model<IRentAgreement> =
  mongoose.models.RentAgreement ||
  mongoose.model<IRentAgreement>("RentAgreement", RentAgreementSchema);

export default RentAgreement;

