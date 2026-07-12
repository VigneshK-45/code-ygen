import { useState } from 'react';
import { useApp } from '../store';
import { GraduationCap, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, CalendarDays, TrendingUp } from 'lucide-react';

export function Login() {
  const { login } = useApp();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
    }, 1100);
  };

  return (
    <div className="min-h-screen flex bg-ink-50 dark:bg-ink-950">
      {/* Left visual panel */}
      <div className="hidden lg:flex w-[46%] relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15), transparent 35%)' }} />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="font-display font-bold text-lg leading-none">VTOP Chennai</p>
              <p className="text-xs text-white/70 mt-1">Reimagined Portal</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-4xl font-bold leading-tight">
              Your campus life,<br />beautifully connected.
            </h2>
            <p className="text-white/80 text-lg max-w-md">
              Attendance, academics, events, fees and a smart assistant — all in one elegant dashboard.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md pt-4">
              {[
                { icon: TrendingUp, label: 'CGPA Tracker' },
                { icon: CalendarDays, label: 'Smart Timetable' },
                { icon: Sparkles, label: 'AI Assistant' },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4">
                  <f.icon size={20} className="mb-2" />
                  <p className="text-xs font-medium text-white/90 leading-tight">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/50">VIT Chennai · A reimagined student experience. Not affiliated with VIT.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-bold">V</div>
            <p className="font-display font-bold">VTOP Chennai</p>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-2">Sign in to access your student portal.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">Username / Registration Number</label>
              <input
                className="input"
                placeholder="23BCE1142"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  className="input pr-11"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-ink-600 dark:text-ink-300">Remember me</span>
              </label>
              <button type="button" className="font-semibold text-brand-600 hover:text-brand-700">Forgot password?</button>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-xs text-ink-400">
            <ShieldCheck size={14} />
            <span>Secured with VIT single sign-on. This is a demo — any credentials work.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
