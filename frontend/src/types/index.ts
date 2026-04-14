export interface Startup {
  _id?: string;
  name: string;
  founderName: string;
  about: string;
  websiteUrl: string;
  industry: 'AI & Deep Tech' | 'Fintech' | 'Healthtech' | 'SaaS' | 'Pharma' | 'Others';
  foundedYear: number;
  fundingStage: 'Pre-seed' | 'Seed' | 'Series A+' | 'Bootstrapped';
  status?: 'pending' | 'approved';
  logoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Industry = Startup['industry'];
export type FundingStage = Startup['fundingStage'];

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}
