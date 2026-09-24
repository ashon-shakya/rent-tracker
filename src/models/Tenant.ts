import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITenant extends Document {
  userId?: mongoose.Types.ObjectId;
  email: string;
  name: string;
  rentAgreementId: mongoose.Types.ObjectId;
  bondShareParts: number;
  rentShareParts: number;
  utilityShareParts: number;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    name: { type: String, required: true },
    rentAgreementId: { type: Schema.Types.ObjectId, ref: "RentAgreement", required: true },
    bondShareParts: { type: Number, required: true, default: 1 },
    rentShareParts: { type: Number, required: true, default: 1 },
    utilityShareParts: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

// Indexes
TenantSchema.index({ rentAgreementId: 1 });
TenantSchema.index({ email: 1 });
TenantSchema.index({ userId: 1 }, { sparse: true });

const Tenant: Model<ITenant> =
  mongoose.models.Tenant || mongoose.model<ITenant>("Tenant", TenantSchema);

export default Tenant;

