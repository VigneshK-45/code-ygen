import { useState } from 'react';
import { lostFound } from '../data';
import { Card, SectionHeader, Badge, EmptyState } from '../components/ui';
import { Backpack, MapPin, Search, Plus, Mail } from 'lucide-react';

export function LostFound() {
  const [filter, setFilter] = useState<'All' | 'Lost' | 'Found'>('All');
  const [query, setQuery] = useState('');

  const filtered = lostFound.filter((i) => {
    const matchFilter = filter === 'All' || i.status === filter;
    const matchQuery = i.title.toLowerCase().includes(query.toLowerCase()) || i.location.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader
        title="Lost & Found"
        subtitle="Report lost items or claim found ones on campus."
        action={
          <button className="btn-primary !text-sm"><Plus size={16} /> Report item</button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-ink-100 dark:bg-ink-800 px-3 flex-1">
            <Search size={16} className="text-ink-400" />
            <input
              placeholder="Search by item or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full py-2.5 placeholder-ink-400"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Lost', 'Found'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`chip transition-colors ${filter === f ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <Card className="sm:col-span-2"><EmptyState icon={<Backpack size={28} />} title="No items found" subtitle="Try a different search or filter." /></Card>
        ) : (
          filtered.map((item) => (
            <Card key={item.id} hover className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`grid place-items-center h-11 w-11 rounded-xl shrink-0 ${item.status === 'Lost' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'}`}>
                    <Backpack size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{item.category}</p>
                  </div>
                </div>
                <Badge color={item.status === 'Lost' ? 'rose' : 'emerald'}>{item.status}</Badge>
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-300 mb-3">{item.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-ink-500 dark:text-ink-400"><MapPin size={12} /> {item.location} · {item.date}</span>
                <button className="flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700">
                  <Mail size={12} /> Contact
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
