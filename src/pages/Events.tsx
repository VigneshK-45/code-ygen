import { events } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { CalendarHeart, MapPin, Clock, Users, ArrowUpRight } from 'lucide-react';

const catColor: Record<string, string> = {
  Cultural: 'violet', Technical: 'brand', Talk: 'emerald', Sports: 'accent',
};

export function Events() {
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Event Board" subtitle="Discover and register for campus events." />

      <div className="grid sm:grid-cols-2 gap-5">
        {events.map((e) => (
          <Card key={e.id} hover className="overflow-hidden">
            <div className="relative h-44 overflow-hidden">
              <img src={e.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
              <div className="absolute top-3 left-3"><Badge color={catColor[e.category]}>{e.category}</Badge></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="font-display text-lg font-bold leading-tight">{e.title}</p>
                <p className="text-xs text-white/80 mt-1">by {e.club}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-ink-600 dark:text-ink-300 mb-3">{e.description}</p>
              <div className="flex items-center gap-4 text-xs text-ink-500 dark:text-ink-400 mb-4">
                <span className="flex items-center gap-1"><CalendarHeart size={13} /> {e.date}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {e.time}</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> {e.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
                  <Users size={14} /> {e.going} going
                </span>
                <button className="btn-primary !text-xs !py-2">
                  Register <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
