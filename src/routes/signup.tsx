import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
});

function SignupComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // حالات الـ OTP الجديدة
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // الانتقال لخطوة الـ OTP بدلاً من تحويله للصفحة الرئيسية
    setSuccessMsg("Success! Please check your email to verify your account.");
    setIsOtpStep(true);
    setLoading(false);
  };

  const handleVerifyOtp = async (token: string) => {
    setOtpLoading(true);
    setError(null);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });

    if (verifyError) {
      setError(verifyError.message);
      setOtpLoading(false);
      return;
    }

    // نقل الرصيد يتم الآن بعد التأكد من صحة الكود!
    if (data?.user) {
      const appKeys = [
        'pitchping_credits',
        'codeping_credits',
        'resumeping_credits',
        'paperping_credits',
        'bandping_credits'
      ];
      
      let totalLocalCredits = 0;
      appKeys.forEach(key => {
        const val = parseInt(localStorage.getItem(key) || '0', 10);
        if (!isNaN(val) && val > 0) {
          totalLocalCredits += val;
          localStorage.removeItem(key);
        }
      });

      if (totalLocalCredits > 0) {
        await supabase
          .from('profiles')
          .update({ ping_credits: totalLocalCredits })
          .eq('id', data.user.id);
      }

      navigate({ to: '/' });
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOtpValue(val);
    
    // التحقق التلقائي بمجرد وصول الكود لـ 8 أرقام
    if (val.length === 8) {
      handleVerifyOtp(val);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg("A new code has been sent to your email.");
    }
  };

  return (
    <div className="py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-500">Join DollarFix ecosystem</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 text-sm text-center font-medium">
            {successMsg}
          </div>
        )}

        {!isOtpStep ? (
          // واجهة التسجيل العادية
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          // واجهة إدخال الـ OTP (تظهر فقط بعد نجاح التسجيل)
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Enter the 8-digit code sent to your email
              </label>
              <input
                type="text"
                maxLength={8}
                value={otpValue}
                onChange={handleOtpChange}
                disabled={otpLoading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-center tracking-widest text-lg font-bold"
                placeholder="••••••••"
              />
            </div>

            {otpLoading && (
              <p className="text-center text-sm text-gray-500">Verifying code...</p>
            )}

            <button
              onClick={handleResendCode}
              className="w-full text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mt-4"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        )}

        {!isOtpStep && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-900 hover:underline font-semibold">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}