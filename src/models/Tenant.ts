import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITenant extends Document {
  userId?: mongoose.Types.ObjectId;
  email: string;
  name: string;
  rentAgreementId: mongoose.Types.ObjectId;
  bondShareParts: number;
  rentShareParts: number;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Null if invited but not signed up
  email: { type: String, required: true },
  name: { type: String, required: true },
  rentAgreementId: { type: Schema.Types.ObjectId, ref: 'RentAgreement', required: true },
  bondShareParts: { type: Number, required: true },
  rentShareParts: { type: Number, required: true },
}, { timestamps: true });

const Tenant: Model<ITenant> = mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);

export default Tenant;
