import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  fullName: string;
  country: string;
  collegeName: string;
  message?: string;
  fileName: string;
  submittedAt: Date;
}

const ApplicationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  country: { type: String, required: true },
  collegeName: { type: String, required: true },
  message: { type: String },
  fileName: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const Application = mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
