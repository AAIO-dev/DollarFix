import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // حالات تسجيل الدخول بالرمز (OTP)
  const [isOtpMode, setIsOtpMode] = useState(false); // للتبديل بين وضع كلمة المرور ووضع طلب الرمز
  const [isOtpStep, setIsOtpStep] = useState(false); // لإظهار خانة الـ 8 أرقام
  const [otpValue, setOtpValue] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  // 1. الدخول الكلاسيكي بكلمة المرور
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate({ to: '/' });
    }
  };

  // 2. إرسال رمز الدخول (OTP)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // حماية: منع إنشاء حساب جديد من هنا
      }
    });

    if (otpError) {
      setError(otpError.message);
      setLoading(false);
      return;
    }

    setSuccessMsg("Success! We've sent a login code to your email.");
    setIsOtpStep(true);
    setLoading(false);
  };

  // 3. التحقق من الرمز المدخل
  const handleVerifyOtp = async (token: string) => {
    setOtpLoading(true);
    setError(null);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email', // نوع التحقق الخاص بتسجيل الدخول
    });

    if (verifyError) {
      setError(verifyError.message);
      setOtpLoading(false);
      return;
    }

    navigate({ to: '/' });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOtpValue(val);
    
    // التحقق التلقائي عند اكتمال الـ 8 أرقام
    if (val.length === 8) {
      handleVerifyOtp(val);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isOtpStep ? 'Enter Login Code' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500">
            {isOtpStep ? 'Check your email for the 8-digit code' : 'Log in to DollarFix'}
          </p>
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
          // واجهة إدخال الإيميل وكلمة المرور (أو طلب الرمز)
          <form onSubmit={isOtpMode ? handleSendOtp : handlePasswordLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            {!isOtpMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                
                {/* رابط نسيان كلمة المرور / الدخول السريع */}
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpMode(true);
                      setError(null);
                    }}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Forgot password? Sign in with a code
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 mt-2"
            >
              {loading 
                ? (isOtpMode ? 'Sending code...' : 'Logging in...') 
                : (isOtpMode ? 'Send Login Code' : 'Log In')}
            </button>

            {isOtpMode && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOtpMode(false);
                    setError(null);
                  }}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Back to password login
                </button>
              </div>
            )}
          </form>
        ) : (
          // واجهة إدخال الـ OTP (بعد إرسال الرمز)
          <div className="space-y-5">
            <div>
              <input
                type="text"
                maxLength={8}
                value={otpValue}
                onChange={handleOtpChange}
                disabled={otpLoading}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-center tracking-widest text-lg font-bold disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {otpLoading && (
              <p className="text-center text-sm text-gray-500">Verifying code...</p>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleResendCode}
                disabled={otpLoading}
                className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                Didn't receive the code? Resend
              </button>
              
              <button
                onClick={() => {
                  setIsOtpStep(false);
                  setOtpValue('');
                  setError(null);
                  setSuccessMsg(null);
                }}
                disabled={otpLoading}
                className="text-gray-400 hover:text-gray-700 text-xs transition-colors"
              >
                Change email address
              </button>
            </div>
          </div>
        )}

        {!isOtpStep && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gray-900 hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}