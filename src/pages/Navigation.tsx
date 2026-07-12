import { useState } from 'react';
import { campusPlaces } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Building2, BookOpen, UtensilsCrossed, Trophy, HeartPulse, Home, Music, CreditCard, MapPin, Navigation, Search } from 'lucide-react';

const iconMap: Record<string, typeof Building2> = {
  building: Building2, book: BookOpen, utensils: UtensilsCrossed, trophy: Trophy,
  heart: HeartPulse, home: Home, music: Music, credit: CreditCard,
};
const typeColor: Record<string, string> = {
  Academic: 'brand', Library: 'violet', Food: 'accent', Sports: 'emerald',
  Medical: 'rose', Hostel: 'amber', Auditorium: 'accent', Bank: 'brand',
};

export function NavigationPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = campusPlaces.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Campus Navigation" subtitle="Find your way around the VIT Chennai campus." />

      <Card className="p-4">
        <div className="flex items-center gap-2 rounded-xl bg-ink-100 dark:bg-ink-800 px-3">
          <Search size={18} className="text-ink-400" />
          <input placeholder="Search buildings, blocks, facilities…" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent text-sm outline-none w-full py-2.5 placeholder-ink-400" />
        </div>
      </Card>

      {/* Map placeholder */}
      <Card className="overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-brand-100 via-brand-50 to-accent-50 dark:from-ink-800 dark:via-ink-900 dark:to-ink-800 grid place-items-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #3385ff 2px, transparent 2px), radial-gradient(circle at 70% 60%, #f97316 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
          <div className="relative text-center">
            <Navigation size={40} className="text-brand-500 mx-auto mb-2" />
            <p className="font-display font-bold text-lg">VIT Chennai Campus Map</p>
            <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">Interactive map · Select a place for directions</p>
          </div>
          {selected && (
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white dark:bg-ink-900 p-3 shadow-soft flex items-center gap-3 animate-fade-up">
              <MapPin size={18} className="text-brand-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{selected}</p>
                <p className="text-xs text-ink-500">{campusPlaces.find(p => p.name === selected)?.distance} away</p>
              </div>
              <button className="btn-primary !text-xs !py-2">Navigate</button>
            </div>
          )}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const Icon = iconMap[p.icon] ?? Building2;
          const color = typeColor[p.type] ?? 'brand';
          return (
            <button key={p.id} onClick={() => setSelected(p.name)} className="text-left">
              <Card hover className={`p-4 ${selected === p.name ? 'ring-2 ring-brand-500' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`grid place-items-center h-11 w-11 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 text-${color}-600 shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge color={color}>{p.type}</Badge>
                      <span className="text-xs text-ink-500">{p.distance}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
