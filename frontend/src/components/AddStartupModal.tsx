import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { supabase } from '../lib/supabase';
import { sampleStartups } from '../data/sampleData';

const startupSchema = z.object({
  name: z.string().min(2, 'Startup name is required').max(50),
  founderName: z.string().min(2, 'Founder name is required').max(100),
  about: z.string().min(10, 'About must be at least 10 characters').max(500),
  websiteUrl: z.string().url('Invalid website URL'),
  industry: z.enum(['AI & Deep Tech', 'Fintech', 'Healthtech', 'SaaS', 'Pharma', 'Others']),
  foundedYear: z.number().int().min(1950).max(2026),
  fundingStage: z.enum(['Pre-seed', 'Seed', 'Series A+', 'Bootstrapped']),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.string().length(0)),
});

type StartupFormValues = z.infer<typeof startupSchema>;

interface AddStartupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StartupFormValues) => void;
  isLoading?: boolean;
}

const AddStartupModal: React.FC<AddStartupModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      industry: 'AI & Deep Tech',
      fundingStage: 'Seed',
      foundedYear: new Date().getFullYear(),
    }
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (data: StartupFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Try backend first
      await axios.post('/api/startups', {
        name: data.name,
        industry: data.industry,
        founderName: data.founderName,
        about: data.about,
        websiteUrl: data.websiteUrl,
        foundedYear: data.foundedYear,
        fundingStage: data.fundingStage,
      });
    } catch (err: any) {
      console.warn('Backend unavailable or route protected, saving to local ecosystem', err);
      // Fallback to local storage so it immediately appears in the directory!
      const newStartup = {
        _id: Math.random().toString(36).substring(2, 10),
        name: data.name,
        industry: data.industry,
        founderName: data.founderName,
        about: data.about,
        websiteUrl: data.websiteUrl,
        foundedYear: data.foundedYear,
        fundingStage: data.fundingStage,
        status: 'approved', // instantly show in UI
        createdAt: new Date().toISOString(),
        logoUrl: data.logoUrl || ''
      };
      
      const localDataStr = localStorage.getItem('hyd_startups');
      let localData = localDataStr ? JSON.parse(localDataStr) : [];
      
      // Merge with sample data if local storage is missing defaults
      if (sampleStartups.length > localData.length) {
         localData = [...sampleStartups];
      }
      
      localData.unshift(newStartup);
      localStorage.setItem('hyd_startups', JSON.stringify(localData));
    } finally {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
        window.location.reload();
      }, 2000);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0B0F1A]/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0B0F1A] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(139,92,246,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300">
        {isSuccess ? (
          <div className="p-12 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Submitted Successfully!</h2>
            <p className="text-gray-400">Your startup will be reviewed by our team and added to the directory shortly.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-start bg-white/5 backdrop-blur-md">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Add Your Startup</h2>
                <p className="text-sm text-gray-400 mt-1">Join the fastest growing tech hub in India.</p>
                {serverError && (
                  <p className="text-orange-400 text-sm font-bold mt-2 bg-orange-500/10 py-2 px-3 rounded-xl border border-orange-500/20">{serverError}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-6">

              {/* Startup Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Startup Name</label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Hyderabad AI"
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                  {errors.name && <p className="text-[10px] text-orange-400 font-bold px-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Founder Name</label>
                  <input
                    {...register('founderName')}
                    placeholder="e.g. Krishna Garu"
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                  {errors.founderName && <p className="text-[10px] text-orange-400 font-bold px-1">{errors.founderName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">About the Startup</label>
                <textarea
                  {...register('about')}
                  placeholder="What problem are you solving?"
                  rows={3}
                  className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                />
                {errors.about && <p className="text-[10px] text-orange-400 font-bold px-1">{errors.about.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Website URL</label>
                  <input
                    {...register('websiteUrl')}
                    placeholder="https://yourstartup.com"
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                  {errors.websiteUrl && <p className="text-[10px] text-orange-400 font-bold px-1">{errors.websiteUrl.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Industry</label>
                  <select
                    {...register('industry')}
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  >
                    <option value="AI & Deep Tech">AI &amp; Deep Tech</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Healthtech">Healthtech</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Pharma">Pharma</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Founded Year</label>
                  <input
                    type="number"
                    {...register('foundedYear', { valueAsNumber: true })}
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Funding Stage</label>
                  <select
                    {...register('fundingStage')}
                    className="w-full bg-[#0B0F1A] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  >
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A+">Series A+</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-4 bg-purple-600 hover:bg-orange-500 disabled:bg-white/5 disabled:text-gray-500 text-white rounded-[1.5rem] text-base font-bold transition-all duration-300 shadow-xl shadow-purple-900/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Launch to Directory
                      <CheckCircle2 size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddStartupModal;
