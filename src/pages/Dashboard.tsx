import { useApp } from '../store';
import { student, courses, attendance, notifications, events, timetable } from '../data';
import { Card, StatCard, ProgressRing, Badge } from '../components/ui';
import {
  TrendingUp,
  CalendarCheck,
  BookOpen,
  CreditCard,
  Sparkles,
  Clock,
  MapPin,
  ArrowRight,
  Bell,
} from 'lucide-react';

export function Dashboard() {
  const { setPage } = useApp();
  const today = 'Mon';
  const todayClasses = timetable.filter((t) => t.day === today);

  const overallAttendance =
    Math.round(
      (attendance.reduce((a, c) => a + c.attended, 0) / attendance.reduce((a, c) => a + c.total, 0)) * 100,
    );

  const pendingFees = 142400;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Hero greeting */}
      <Card className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
        <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm">Good morning,</p>
            <h1 className="font-display text-3xl font-bold mt-1">{student.name}</h1>
            <p className="text-white/80 text-sm mt-2">
              {student.program} · {student.regNo}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <ProgressRing value={student.cgpa * 10} size={92} stroke={7} color="#ffffff" label={student.cgpa.toFixed(2)} sublabel="CGPA" />
            </div>
            <div className="text-center">
              <ProgressRing value={overallAttendance} size={92} stroke={7} color="#fb923c" label={`${overallAttendance}%`} sublabel="Attendance" />
            </div>
          </div>
        </div>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={20} />} label="Current CGPA" value={student.cgpa.toFixed(2)} trend="↑ 0.12 from last sem" color="brand" />
        <StatCard icon={<CalendarCheck size={20} />} label="Avg Attendance" value={`${overallAttendance}%`} trend="Above 75% threshold" color="emerald" />
        <StatCard icon={<BookOpen size={20} />} label="Active Courses" value={`${courses.length}`} trend={`${student.creditsCompleted}/${student.creditsTotal} credits`} color="accent" />
        <StatCard icon={<CreditCard size={20} />} label="Pending Fees" value={`₹${(pendingFees / 1000).toFixed(0)}K`} trend="Due 15 Aug 2025" color="rose" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-bold">Today's Schedule</h2>
              <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">Monday · {todayClasses.length} classes</p>
            </div>
            <button onClick={() => setPage('timetable')} className="btn-ghost !text-xs !py-2">
              Full timetable <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-ink-200 dark:border-ink-800 p-3.5 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <div className="flex flex-col items-center justify-center w-14 shrink-0">
                  <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">{c.start}</span>
                  <span className="text-[10px] text-ink-400">{c.end}</span>
                </div>
                <div className={`h-10 w-1 rounded-full bg-${c.color}-500`} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate">{c.title} · {c.code}</p>
                  <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-400 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {c.room}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {c.faculty}</span>
                  </div>
                </div>
                <Badge color={c.color}>{c.code.slice(0, 4)}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick AI assistant */}
        <Card className="p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold">AI Assistant</h2>
              <p className="text-xs text-ink-500 dark:text-ink-400">Ask anything about your academics</p>
            </div>
          </div>
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-4">
            "Hey VTOP, what's my attendance in Operating Systems?"
          </p>
          <div className="space-y-2 mb-4">
            {['When is my next class?', 'How much fee is pending?', 'Show my CGPA trend'].map((q) => (
              <button key={q} onClick={() => setPage('assistant')} className="w-full text-left text-xs rounded-lg bg-ink-100 dark:bg-ink-800 px-3 py-2 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                {q}
              </button>
            ))}
          </div>
          <button onClick={() => setPage('assistant')} className="btn-primary mt-auto !text-sm">
            Open Assistant <ArrowRight size={14} />
          </button>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course progress */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">Course Progress</h2>
            <button onClick={() => setPage('courses')} className="btn-ghost !text-xs !py-2">
              All courses <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {courses.slice(0, 4).map((c) => (
              <div key={c.code}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">{c.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                  <div className={`h-full rounded-full bg-${c.color}-500`} style={{ width: `${c.progress}%`, transition: 'width 0.8s ease-out' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications + Events */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-base font-bold flex items-center gap-2">
                <Bell size={16} /> Recent
              </h2>
              <button onClick={() => setPage('notifications')} className="text-xs text-brand-600 font-semibold">View all</button>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="flex gap-3">
                  <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-ink-300' : 'bg-brand-500'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{n.title}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-base font-bold mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              {events.slice(0, 2).map((e) => (
                <button key={e.id} onClick={() => setPage('events')} className="flex gap-3 w-full text-left hover:bg-ink-50 dark:hover:bg-ink-800 rounded-lg p-2 -m-2 transition-colors">
                  <img src={e.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{e.title}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{e.date} · {e.venue}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
