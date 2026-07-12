import { transportRoutes } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Bus, MapPin, Clock, Plus, CheckCircle2, XCircle } from 'lucide-react';

export function Transport() {
  const active = transportRoutes.filter((r) => r.status === 'Active').length;
  const totalFee = transportRoutes.filter((r) => r.status === 'Active').reduce((a, r) => a + r.fee, 0);

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Transport Management" subtitle="Campus bus routes, schedules and transport fee tracking."
        action={<button className="btn-primary !text-sm"><Plus size={16} /> Apply for route</button>} />

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><Bus size={20} /></div><div><p className="text-xs text-ink-500">Active Routes</p><p className="font-display text-xl font-bold">{active}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><Clock size={20} /></div><div><p className="text-xs text-ink-500">Next Departure</p><p className="font-display text-xl font-bold">5:00 PM</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600"><MapPin size={20} /></div><div><p className="text-xs text-ink-500">Annual Fee</p><p className="font-display text-xl font-bold">₹{(totalFee / 1000).toFixed(0)}K</p></div></div></Card>
      </div>

      <div className="space-y-4">
        {transportRoutes.map((r) => (
          <Card key={r.id} hover className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`grid place-items-center h-12 w-12 rounded-xl shrink-0 ${r.status === 'Active' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' : 'bg-ink-100 dark:bg-ink-800 text-ink-400'}`}>
                  <Bus size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{r.routeName}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">Bus {r.busNo} · ₹{r.fee.toLocaleString('en-IN')}/year</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div><p className="text-ink-400">Boarding</p><p className="font-semibold flex items-center gap-1"><MapPin size={11} /> {r.boarding}</p></div>
                <div><p className="text-ink-400">Departure</p><p className="font-semibold flex items-center gap-1"><Clock size={11} /> {r.departure}</p></div>
                <div><p className="text-ink-400">Drop</p><p className="font-semibold">{r.drop}</p></div>
                <div><p className="text-ink-400">Arrival</p><p className="font-semibold flex items-center gap-1"><Clock size={11} /> {r.arrival}</p></div>
              </div>
              <Badge color={r.status === 'Active' ? 'emerald' : 'ink'}>{r.status === 'Active' ? <><CheckCircle2 size={12} /> Active</> : <><XCircle size={12} /> Inactive</>}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
