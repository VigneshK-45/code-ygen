import { placements } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Briefcase, TrendingUp, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';

const statusColor: Record<string, string> = {
  Applied: 'ink', Shortlisted: 'brand', Interview: 'accent', Offered: 'emerald', Rejected: 'rose',
};
const roundColor: Record<string, string> = {
  Cleared: 'emerald', Pending: 'amber', Failed: 'rose',
};
const roundIcon: Record<string, typeof CheckCircle2> = {
  Cleared: CheckCircle2, Pending: Clock, Failed: XCircle,
};

export function Placements() {
  const offered = placements.filter((p) => p.status === 'Offered');
  const active = placements.filter((p) => p.status === 'Interview' || p.status === 'Shortlisted' || p.status === 'Applied');

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Placement Portal" subtitle="Track your placement applications and interview rounds." />

      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><Briefcase size={20} /></div><div><p className="text-xs text-ink-500">Total Applied</p><p className="font-display text-xl font-bold">{placements.length}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600"><Clock size={20} /></div><div><p className="text-xs text-ink-500">In Progress</p><p className="font-display text-xl font-bold">{active.length}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={20} /></div><div><p className="text-xs text-ink-500">Offers</p><p className="font-display text-xl font-bold">{offered.length}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600"><TrendingUp size={20} /></div><div><p className="text-xs text-ink-500">Highest Package</p><p className="font-display text-xl font-bold">₹{Math.max(...placements.map(p => p.package))}L</p></div></div></Card>
      </div>

      {offered.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-0">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 size={24} />
            <h2 className="font-display text-lg font-bold">Congratulations! You have an offer!</h2>
          </div>
          {offered.map((o) => (
            <div key={o.id} className="flex items-center gap-4 mt-3">
              <img src={o.logo} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="font-bold">{o.company} — {o.role}</p>
                <p className="text-white/80 text-sm">₹{o.package}LPA · Offer Date: {new Date(o.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          ))}
        </Card>
      )}

      <div className="space-y-4">
        {placements.map((p) => (
          <Card key={p.id} hover className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={p.logo} alt="" className="h-12 w-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{p.company} · {p.role}</p>
                  <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    <span>₹{p.package}LPA</span>
                  </div>
                </div>
              </div>
              <Badge color={statusColor[p.status]}>{p.status}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.rounds.map((r: typeof p.rounds[0], i: number) => {
                const Icon = roundIcon[r.status];
                return (
                  <div key={i} className={`flex items-center gap-1.5 chip bg-${roundColor[r.status]}-50 dark:bg-${roundColor[r.status]}-500/10 text-${roundColor[r.status]}-700 dark:text-${roundColor[r.status]}-300`}>
                    <Icon size={12} />
                    <span>{r.name}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
