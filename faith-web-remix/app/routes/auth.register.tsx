import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight, Mail, Lock, User, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registeruser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const password = watch('password') || '';

  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[0-9]/, text: "One number" },
    { regex: /[^A-Za-z0-9]/, text: "One special character" },
  ];

  const onRegister = async (data: RegisterForm) => {
    try {
      setError('');
      await registeruser(data.email, data.password, data.fullName);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <div className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-3xl font-bold text-white text-center mb-2 font-quicksand">
          Create Account
        </h2>
        <p className="text-white/60 text-center mb-8 font-montserrat text-sm">
          Join Unified Faith Service today
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                {...register('fullName')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-300 text-xs ml-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                {...register('email')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="john@example.com"
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
                placeholder="Create a strong password"
              />
            </div>
            {dirtyFields.password && (
               <div className="grid grid-cols-2 gap-2 mt-2 pl-1">
                 {requirements.map((req, idx) => (
                   <div key={idx} className="flex items-center space-x-1.5">
                     {req.regex.test(password) ? (
                       <CheckCircle2 className="w-3 h-3 text-green-400" />
                     ) : (
                       <XCircle className="w-3 h-3 text-white/20" />
                     )}
                     <span className={`text-xs ${req.regex.test(password) ? 'text-green-400' : 'text-white/40'}`}>
                       {req.text}
                     </span>
                   </div>
                 ))}
               </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white/80 text-sm font-medium ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                {...register('confirmPassword')}
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs ml-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
          >
            {isSubmitting || isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-1 text-sm text-white/60">
            <span>Already have an account?</span>
            <Link to="/auth/login" className="text-gold-light hover:text-gold font-bold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
