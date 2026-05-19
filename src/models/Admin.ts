import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  loginOtp?: string;
  loginOtpExpiry?: Date;
}

const AdminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  loginOtp: { type: String },
  loginOtpExpiry: { type: Date },
});

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
