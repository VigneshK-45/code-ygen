import { AppProvider, useApp } from './store';
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
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
