import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight, Mail, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, loginWithOTP, requestOTP, isLoading } = useAuth();
  const navigate = useNavigate();
  const [useOTP, setUseOTP] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [error, setError] = React.useState('');
  const [otp, setOtp] = React.useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');

  const onLogin = async (data: LoginForm) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
        console.error(err);
      }
    }
  };

  const handleSendOTP = async () => {
    if (!email || errors.email) {
      setError('Please enter a valid email address first');
      return;
    }

    try {
      setError('');
      await requestOTP(email);
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setError('');
      await loginWithOTP(email, otp);
      navigate('/');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-3xl font-bold text-white text-center mb-2 font-quicksand">
          Welcome Back
        </h2>
        <p className="text-white/60 text-center mb-8 font-montserrat text-sm">
          Sign in to your account
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {!useOTP ? (
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register('email')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-xs ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs ml-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting || isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      value={email}
                      onChange={(e) => {
                        register('email').onChange(e);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium ml-1">Enter OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all tracking-widest text-center text-xl"
                      placeholder="••••••"
                      maxLength={6}
                    />
                  </div>
                </div>
                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Login'}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
                setUseOTP(!useOTP);
                setError('');
                setOtpSent(false);
            }}
            className="w-full text-white/60 text-sm hover:text-white transition-colors"
          >
            {useOTP ? 'Login with Password' : 'Login with OTP'}
          </button>
          
          <div className="flex items-center justify-center space-x-1 text-sm text-white/60">
            <span>Don't have an account?</span>
            <Link to="/auth/register" className="text-gold-light hover:text-gold font-bold transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
