import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  BookOpen,
  CreditCard,
  MessageSquare,
  Bell,
  CalendarHeart,
  Search,
  Sparkles,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Backpack,
  Briefcase,
  ClipboardList,
  Contact,
  Building2,
  Bus,
  UtensilsCrossed,
  HeartPulse,
  FileText,
  Award,
  MapPin,
  QrCode,
  Brain,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../store';
import type { PageId } from '../types';
import { student } from '../data';

const NAV: { id: PageId; label: string; icon: typeof LayoutDashboard; group: string; badge?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, group: 'Overview' },
  { id: 'qrattendance', label: 'QR Attendance', icon: QrCode, group: 'Overview' },
  { id: 'timetable', label: 'Timetable', icon: CalendarDays, group: 'Overview' },
  { id: 'academics', label: 'Academics', icon: GraduationCap, group: 'Academics' },
  { id: 'courses', label: 'Courses', icon: BookOpen, group: 'Academics' },
  { id: 'assignments', label: 'Assignment Tracker', icon: ClipboardList, group: 'Academics' },
  { id: 'analytics', label: 'Performance Analytics', icon: TrendingUp, group: 'Academics' },
  { id: 'aiadvisor', label: 'AI Academic Advisor', icon: Brain, group: 'Academics' },
  { id: 'fees', label: 'Fee Payment', icon: CreditCard, group: 'Academics' },
  { id: 'scholarship', label: 'Scholarships', icon: Award, group: 'Academics' },
  { id: 'feedback', label: 'Faculty Feedback', icon: MessageSquare, group: 'Academics' },
  { id: 'placements', label: 'Placement Portal', icon: Briefcase, group: 'Career' },
  { id: 'idcard', label: 'Digital ID Card', icon: Contact, group: 'Campus Life' },
  { id: 'hostel', label: 'Hostel Management', icon: Building2, group: 'Campus Life' },
  { id: 'transport', label: 'Transport', icon: Bus, group: 'Campus Life' },
  { id: 'mess', label: 'Mess Menu', icon: UtensilsCrossed, group: 'Campus Life' },
  { id: 'medical', label: 'Medical Records', icon: HeartPulse, group: 'Campus Life' },
  { id: 'leave', label: 'Leave Application', icon: FileText, group: 'Campus Life' },
  { id: 'navigation', label: 'Campus Navigation', icon: MapPin, group: 'Campus Life' },
  { id: 'notifications', label: 'Notifications', icon: Bell, group: 'Campus' },
  { id: 'events', label: 'Event Board', icon: CalendarHeart, group: 'Campus' },
  { id: 'lostfound', label: 'Lost & Found', icon: Backpack, group: 'Campus' },
  { id: 'assistant', label: 'AI Assistant', icon: Sparkles, group: 'Campus' },
  { id: 'profile', label: 'Profile', icon: User, group: 'Campus' },
];

export function Sidebar() {
  const { page, setPage, sidebarOpen, setSidebarOpen } = useApp();

  const groups = [...new Set(NAV.map((n) => n.group))];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0 border-r border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-ink-200 dark:border-ink-800">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-bold text-sm shadow-glow">
              V
            </div>
            <div>
              <p className="font-display font-bold text-sm leading-none">VTOP</p>
              <p className="text-[10px] text-ink-500 dark:text-ink-400 mt-0.5">VIT Chennai Campus</p>
            </div>
          </div>
          <button className="lg:hidden btn-ghost !p-2" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-5">
          {groups.map((g) => (
            <div key={g}>
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500">{g}</p>
              <div className="space-y-0.5">
                {NAV.filter((n) => n.group === g).map((n) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setPage(n.id)}
                      className={`nav-item w-full ${page === n.id ? 'nav-item-active' : ''}`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="truncate">{n.label}</span>
                      {n.badge && (
                        <span className="ml-auto chip bg-brand-600 text-white !px-1.5 !py-0.5 text-[9px]">{n.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-ink-200 dark:border-ink-800">
          <button onClick={() => setPage('profile')} className="nav-item w-full">
            <img src={student.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            <div className="text-left min-w-0">
              <p className="text-sm font-semibold truncate">{student.name}</p>
              <p className="text-[11px] text-ink-500 dark:text-ink-400 truncate">{student.regNo}</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

export function Topbar({ title }: { title: string }) {
  const { setSidebarOpen, dark, toggleDark, logout } = useApp();
  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-ink-900/80 backdrop-blur-xl border-b border-ink-200 dark:border-ink-800 flex items-center gap-3 px-4 sm:px-6">
      <button className="lg:hidden btn-ghost !p-2" onClick={() => setSidebarOpen(true)}>
        <Menu size={20} />
      </button>
      <h1 className="font-display text-lg font-semibold hidden sm:block">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-ink-100 dark:bg-ink-800 px-3 py-2 w-64">
          <Search size={16} className="text-ink-400" />
          <input
            placeholder="Search courses, events…"
            className="bg-transparent text-sm outline-none w-full placeholder-ink-400"
          />
        </div>
        <button onClick={toggleDark} className="btn-ghost !p-2.5" aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={logout} className="btn-ghost !p-2.5" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
