import { useState } from 'react';
import { assignments } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Calendar, Plus } from 'lucide-react';

const statusColor: Record<string, string> = {
  Pending: 'amber', Submitted: 'brand', Graded: 'emerald', Overdue: 'rose',
};
const priorityColor: Record<string, string> = { Low: 'ink', Medium: 'accent', High: 'rose' };

export function Assignments() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Graded' | 'Overdue'>('All');
  const filtered = filter === 'All' ? assignments : assignments.filter((a) => a.status === filter);

  const counts = {
    pending: assignments.filter((a) => a.status === 'Pending').length,
    overdue: assignments.filter((a) => a.status === 'Overdue').length,
    submitted: assignments.filter((a) => a.status === 'Submitted').length,
    graded: assignments.filter((a) => a.status === 'Graded').length,
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Assignment Tracker" subtitle="Never miss a deadline — track all your assignments in one place."
        action={<button className="btn-primary !text-sm"><Plus size={16} /> Add assignment</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600"><Clock size={20} /></div><div><p className="text-xs text-ink-500">Pending</p><p className="font-display text-xl font-bold">{counts.pending}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600"><AlertCircle size={20} /></div><div><p className="text-xs text-ink-500">Overdue</p><p className="font-display text-xl font-bold">{counts.overdue}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><ClipboardList size={20} /></div><div><p className="text-xs text-ink-500">Submitted</p><p className="font-display text-xl font-bold">{counts.submitted}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={20} /></div><div><p className="text-xs text-ink-500">Graded</p><p className="font-display text-xl font-bold">{counts.graded}</p></div></div></Card>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(['All', 'Pending', 'Submitted', 'Graded', 'Overdue'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`chip transition-colors ${filter === f ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <Card key={a.id} hover className="p-4">
            <div className="flex items-start gap-3">
              <div className={`grid place-items-center h-10 w-10 rounded-xl shrink-0 bg-${statusColor[a.status]}-50 dark:bg-${statusColor[a.status]}-500/10 text-${statusColor[a.status]}-600`}>
                {a.status === 'Graded' ? <CheckCircle2 size={18} /> : a.status === 'Overdue' ? <AlertCircle size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{a.title}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{a.course} · {a.code} · {a.weight}% weight</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {a.grade && <Badge color="emerald">Grade: {a.grade}</Badge>}
                    <Badge color={priorityColor[a.priority]}>{a.priority}</Badge>
                    <Badge color={statusColor[a.status]}>{a.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400 mt-2">
                  <Calendar size={12} /> Due {new Date(a.due).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
