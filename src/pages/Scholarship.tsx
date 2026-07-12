import { scholarships } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Award, CheckCircle2, Clock, XCircle, Star, Calendar, Building2 } from 'lucide-react';

const statusColor: Record<string, string> = {
  Applied: 'amber', Awarded: 'emerald', Rejected: 'rose', Eligible: 'brand',
};
const statusIcon: Record<string, typeof Clock> = {
  Applied: Clock, Awarded: CheckCircle2, Rejected: XCircle, Eligible: Star,
};

export function Scholarship() {
  const awarded = scholarships.filter((s) => s.status === 'Awarded').reduce((a, s) => a + s.amount, 0);
  const eligible = scholarships.filter((s) => s.status === 'Eligible' || s.status === 'Applied').length;

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Scholarship Dashboard" subtitle="Discover, apply for and track your scholarships." />

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-0">
          <CheckCircle2 size={24} className="mb-2" />
          <p className="text-white/70 text-xs">Total Awarded</p>
          <p className="font-display text-2xl font-bold mt-1">₹{awarded.toLocaleString('en-IN')}</p>
        </Card>
        <Card className="p-6">
          <Star size={24} className="mb-2 text-brand-500" />
          <p className="text-xs text-ink-500">Eligible / Applied</p>
          <p className="font-display text-2xl font-bold mt-1">{eligible}</p>
        </Card>
        <Card className="p-6">
          <Award size={24} className="mb-2 text-accent-500" />
          <p className="text-xs text-ink-500">Total Scholarships</p>
          <p className="font-display text-2xl font-bold mt-1">{scholarships.length}</p>
        </Card>
      </div>

      <div className="space-y-4">
        {scholarships.map((s) => {
          const Icon = statusIcon[s.status];
          return (
            <Card key={s.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <div className={`grid place-items-center h-12 w-12 rounded-xl shrink-0 bg-${statusColor[s.status]}-50 dark:bg-${statusColor[s.status]}-500/10 text-${statusColor[s.status]}-600`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{s.name}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-1 mt-0.5"><Building2 size={11} /> {s.provider}</p>
                    </div>
                    <Badge color={statusColor[s.status]}>{s.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-500 dark:text-ink-400 mt-2">
                    <span className="font-display font-bold text-base text-ink-800 dark:text-ink-100">₹{s.amount.toLocaleString('en-IN')}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {new Date(s.deadline).toLocaleDateString('en-IN')}</span>
                    <span>Criteria: {s.criteria}</span>
                  </div>
                </div>
              </div>
              {(s.status === 'Eligible' || s.status === 'Applied') && (
                <div className="mt-3 flex justify-end">
                  <button className="btn-primary !text-xs !py-2">{s.status === 'Eligible' ? 'Apply now' : 'Track status'}</button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
