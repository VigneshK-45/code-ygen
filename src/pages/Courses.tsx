import { courses } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { BookOpen, MapPin, User, Clock } from 'lucide-react';

export function Courses() {
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="My Courses" subtitle={`${courses.length} courses this semester · ${courses.reduce((a, c) => a + c.credits, 0)} credits`} />

      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map((c) => (
          <Card key={c.code} hover className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`grid place-items-center h-11 w-11 rounded-xl bg-${c.color}-50 dark:bg-${c.color}-500/10 text-${c.color}-600 dark:text-${c.color}-400 shrink-0`}>
                  <BookOpen size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{c.title}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">{c.code}</p>
                </div>
              </div>
              <Badge color={c.color}>{c.type}</Badge>
            </div>

            <div className="space-y-1.5 text-xs text-ink-500 dark:text-ink-400 mb-4">
              <p className="flex items-center gap-2"><User size={12} /> {c.faculty}</p>
              <p className="flex items-center gap-2"><MapPin size={12} /> {c.room} · Slot {c.slot}</p>
              <p className="flex items-center gap-2"><Clock size={12} /> {c.credits} credits</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-ink-500 dark:text-ink-400">Syllabus progress</span>
                <span className="text-xs font-bold">{c.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                <div className={`h-full rounded-full bg-${c.color}-500`} style={{ width: `${c.progress}%`, transition: 'width 0.8s ease-out' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
