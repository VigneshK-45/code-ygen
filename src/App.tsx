import { AppProvider, useApp } from './store';
import { AuthProvider } from './lib/auth-context';
import { Sidebar, Topbar } from './components/Shell';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Timetable } from './pages/Timetable';
import { Academics } from './pages/Academics';
import { Courses } from './pages/Courses';
import { Fees } from './pages/Fees';
import { Feedback } from './pages/Feedback';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { LostFound } from './pages/LostFound';
import { Assistant } from './pages/Assistant';
import { Profile } from './pages/Profile';
import { Placements } from './pages/Placements';
import { Assignments } from './pages/Assignments';
import { IdCard } from './pages/IdCard';
import { Hostel } from './pages/Hostel';
import { Transport } from './pages/Transport';
import { Mess } from './pages/Mess';
import { Medical } from './pages/Medical';
import { Leave } from './pages/Leave';
import { Scholarship } from './pages/Scholarship';
import { NavigationPage } from './pages/Navigation';
import { QrAttendance } from './pages/QrAttendance';
import { AiAdvisor } from './pages/AiAdvisor';
import { Analytics } from './pages/Analytics';
import type { PageId } from './types';

const titles: Record<PageId, string> = {
  dashboard: 'Dashboard',
  attendance: 'Attendance',
  timetable: 'Timetable',
  academics: 'Academics',
  courses: 'Courses',
  fees: 'Fee Payment',
  feedback: 'Faculty Feedback',
  notifications: 'Notifications',
  events: 'Event Board',
  lostfound: 'Lost & Found',
  assistant: 'AI Assistant',
  profile: 'Profile',
  placements: 'Placement Portal',
  assignments: 'Assignment Tracker',
  idcard: 'Digital ID Card',
  hostel: 'Hostel Management',
  transport: 'Transport Management',
  mess: 'Mess Menu',
  medical: 'Medical Records',
  leave: 'Leave Application',
  scholarship: 'Scholarship Dashboard',
  navigation: 'Campus Navigation',
  qrattendance: 'QR Attendance',
  aiadvisor: 'AI Academic Advisor',
  analytics: 'Predictive Analytics',
};

function Pages() {
  const { page } = useApp();
  switch (page) {
    case 'dashboard': return <Dashboard />;
    case 'attendance': return <Attendance />;
    case 'timetable': return <Timetable />;
    case 'academics': return <Academics />;
    case 'courses': return <Courses />;
    case 'fees': return <Fees />;
    case 'feedback': return <Feedback />;
    case 'notifications': return <Notifications />;
    case 'events': return <Events />;
    case 'lostfound': return <LostFound />;
    case 'assistant': return <Assistant />;
    case 'profile': return <Profile />;
    case 'placements': return <Placements />;
    case 'assignments': return <Assignments />;
    case 'idcard': return <IdCard />;
    case 'hostel': return <Hostel />;
    case 'transport': return <Transport />;
    case 'mess': return <Mess />;
    case 'medical': return <Medical />;
    case 'leave': return <Leave />;
    case 'scholarship': return <Scholarship />;
    case 'navigation': return <NavigationPage />;
    case 'qrattendance': return <QrAttendance />;
    case 'aiadvisor': return <AiAdvisor />;
    case 'analytics': return <Analytics />;
    default: return <Dashboard />;
  }
}

function Shell() {
  const { loggedIn, page } = useApp();
  if (!loggedIn) return <Login />;

  return (
    <div className="min-h-screen flex bg-ink-50 dark:bg-ink-950">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={titles[page]} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Pages />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Shell />
      </AppProvider>
    </AuthProvider>
  );
}
