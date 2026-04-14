import mongoose, { Schema, Document } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  founderName: string;
  about: string;
  websiteUrl: string;
  industry: 'AI & Deep Tech' | 'Fintech' | 'Healthtech' | 'SaaS' | 'Pharma' | 'Others';
  foundedYear: number;
  fundingStage: 'Pre-seed' | 'Seed' | 'Series A+' | 'Bootstrapped';
  status: 'pending' | 'approved';
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StartupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    founderName: { type: String, required: true },
    about: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    industry: {
      type: String,
      enum: ['AI & Deep Tech', 'Fintech', 'Healthtech', 'SaaS', 'Pharma', 'Others'],
      required: true,
    },
    foundedYear: { type: Number },
    fundingStage: {
      type: String,
      enum: ['Pre-seed', 'Seed', 'Series A+', 'Bootstrapped'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'approved',
    },
    logoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IStartup>('Startup', StartupSchema);
