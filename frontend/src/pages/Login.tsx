import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, ShieldCheck, CheckCircle2, Mail, Fingerprint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type LoginStep = 'credentials' | 'verification';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State
  const [step, setStep] = useState<LoginStep>('credentials');
  const [formData, setFormData] = useState({ email: '' });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
        }
      });
      
      if (signInError) throw signInError;
      
      setStep('verification');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please check your email.');
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // First attempt with type 'email' (for existing users)
      let { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: otp,
        type: 'email'
      });

      // If it fails, fallback to 'signup' (for new users logging in via OTP for the first time)
      if (verifyError) {
        console.warn('verifyOtp with type email failed, attempting type signup', verifyError);
        const signupFallback = await supabase.auth.verifyOtp({
          email: formData.email,
          token: otp,
          type: 'signup'
        });
        
        data = signupFallback.data;
        verifyError = signupFallback.error;
      }

      if (verifyError) throw verifyError;

      if (data.user) {
        setIsSuccess(true);
        setTimeout(() => navigate('/startups'), 1500);
      }
    } catch (err: any) {
      console.error('OTP Verification Error:', err);
      setError(err.message || 'Invalid verification code.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center relative overflow-hidden px-6">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full animate-float-reverse" />
      </div>
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div 
            onClick={() => navigate('/')} 
            className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 mb-8 cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-purple-900/40 relative group"
          >
            <Rocket size={40} className="text-purple-400 group-hover:text-pink-400 transition-colors" />
            <div className="absolute inset-0 rounded-[2rem] bg-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-3">
            {step === 'credentials' ? 'HydPortal Access' : 'Verify Identity'}
          </h1>
          <p className="text-gray-400 font-medium">
            {step === 'credentials' 
              ? 'Enter your email to receive a secure access code.' 
              : `We've sent a 6-digit code to your email.`}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#111827]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F1A]/95 backdrop-blur-md animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Access Granted</h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Entering Directory...</p>
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleCredentialSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@company.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none placeholder:text-gray-700 font-medium"
                />
              </div>

              <button 
                disabled={isLoading}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 disabled:bg-white/5 disabled:text-gray-600 text-white rounded-[2rem] text-base font-black transition-all duration-500 shadow-2xl shadow-purple-900/20 active:scale-95 flex items-center justify-center gap-3 group mt-4"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                ) : (
                  <>
                    Send Access Code
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-8 animate-in slide-in-from-right-10 duration-500">
               {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
                  {error}
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 border border-purple-500/20">
                  <Fingerprint size={32} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-white">Check Your Inbox</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{formData.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Verification Code</label>
                   <span className="text-[10px] font-black text-emerald-400 animate-pulse">Waiting for code...</span>
                </div>
                <input 
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000 000"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-6 text-center text-3xl font-black tracking-[0.5em] text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none placeholder:text-gray-800"
                />
              </div>

              <div className="space-y-4">
                <button 
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white rounded-[2rem] text-base font-black transition-all duration-500 shadow-2xl shadow-purple-900/30 active:scale-95 flex items-center justify-center gap-3"
                >
                   {isLoading ? "Verifying..." : "Verify & Enter Portal"}
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full p-4 text-xs font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Footer Card */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500 font-medium">
              New founder in the city? <a href="#" className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black hover:opacity-80 transition-opacity">Request an Invite</a>
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-purple-500/50" /> Secure Supabase Auth</div>
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <div>HydPortal 2.0</div>
        </div>
      </div>
    </div>
  );
};

export default Login;

