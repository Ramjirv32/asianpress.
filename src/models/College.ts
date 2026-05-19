import mongoose, { Schema, Document } from "mongoose";

export interface ICollege extends Document {
  country: string;
  collegeName: string;
}

const CollegeSchema: Schema = new Schema({
  country: { type: String, required: true },
  collegeName: { type: String, required: true },
});

// Compound index to ensure uniqueness of collegeName within a country
CollegeSchema.index({ country: 1, collegeName: 1 }, { unique: true });

export const College = mongoose.models.College || mongoose.model<ICollege>("College", CollegeSchema);
