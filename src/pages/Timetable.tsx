import { timetable } from '../data';
import { Card, SectionHeader } from '../components/ui';
import { MapPin, User } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00'];

export function Timetable() {
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Timetable" subtitle="Your weekly class schedule at a glance." />

      {/* Desktop grid */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="grid grid-cols-[80px_repeat(5,1fr)]">
          <div className="border-b border-r border-ink-200 dark:border-ink-800 p-3 text-xs font-bold text-ink-400">Time</div>
          {days.map((d) => (
            <div key={d} className="border-b border-r border-ink-200 dark:border-ink-800 p-3 text-center font-display font-bold text-sm last:border-r-0">{d}</div>
          ))}
          {timeSlots.map((t) => (
            <div key={t} className="contents">
              <div className="border-b border-r border-ink-200 dark:border-ink-800 p-3 text-xs font-semibold text-ink-500 dark:text-ink-400">{t}</div>
              {days.map((d) => {
                const slot = timetable.find((s) => s.day === d && s.start === t);
                return (
                  <div key={d + t} className="border-b border-r border-ink-200 dark:border-ink-800 p-2 last:border-r-0">
                    {slot && (
                      <div className={`rounded-lg bg-${slot.color}-50 dark:bg-${slot.color}-500/10 border-l-4 border-${slot.color}-500 p-2.5 h-full`}>
                        <p className="text-xs font-bold truncate">{slot.title}</p>
                        <p className="text-[10px] text-ink-500 dark:text-ink-400 truncate">{slot.code}</p>
                        <p className="text-[10px] text-ink-500 dark:text-ink-400 mt-1 flex items-center gap-1"><MapPin size={9} /> {slot.room}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {/* Mobile day-by-day */}
      <div className="lg:hidden space-y-4">
        {days.map((d) => {
          const slots = timetable.filter((s) => s.day === d).sort((a, b) => a.start.localeCompare(b.start));
          return (
            <Card key={d} className="p-4">
              <h3 className="font-display font-bold text-sm mb-3">{d === 'Mon' ? 'Monday' : d === 'Tue' ? 'Tuesday' : d === 'Wed' ? 'Wednesday' : d === 'Thu' ? 'Thursday' : 'Friday'}</h3>
              {slots.length === 0 ? (
                <p className="text-xs text-ink-400 py-4 text-center">No classes</p>
              ) : (
                <div className="space-y-2">
                  {slots.map((s, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="text-[10px] font-semibold text-ink-500 w-10 pt-1">{s.start}</div>
                      <div className={`flex-1 rounded-lg bg-${s.color}-50 dark:bg-${s.color}-500/10 border-l-4 border-${s.color}-500 p-2.5`}>
                        <p className="text-xs font-bold">{s.title}</p>
                        <div className="flex items-center gap-3 text-[10px] text-ink-500 dark:text-ink-400 mt-1">
                          <span className="flex items-center gap-1"><MapPin size={9} /> {s.room}</span>
                          <span className="flex items-center gap-1"><User size={9} /> {s.faculty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
