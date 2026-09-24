import mongoose, { Schema, Document, Model } from "mongoose";

export type UtilityBillingPeriod = "weekly" | "fortnightly" | "monthly" | "quarterly" | "annually";

export interface IUtility extends Document {
  rentAgreementId: mongoose.Types.ObjectId;
  title: string;
  category: string;
  icon: string;
  billingPeriod: UtilityBillingPeriod;
  startDate: Date;
  endDate?: Date;
  amount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UtilitySchema: Schema = new Schema(
  {
    rentAgreementId: { type: Schema.Types.ObjectId, ref: "RentAgreement", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true, default: "electricity" },
    icon: { type: String, required: true, default: "Zap" },
    billingPeriod: {
      type: String,
      enum: ["weekly", "fortnightly", "monthly", "quarterly", "annually"],
      required: true,
      default: "monthly",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    amount: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

// Indexes
UtilitySchema.index({ rentAgreementId: 1, createdAt: -1 });

const Utility: Model<IUtility> =
  mongoose.models.Utility || mongoose.model<IUtility>("Utility", UtilitySchema);

export default Utility;

