import { fees } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { CreditCard, CheckCircle2, AlertCircle, Clock, Download, Wallet } from 'lucide-react';

const statusMap: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  Paid: { color: 'emerald', icon: CheckCircle2 },
  Pending: { color: 'amber', icon: Clock },
  Overdue: { color: 'rose', icon: AlertCircle },
};

export function Fees() {
  const pending = fees.filter((f) => f.status !== 'Paid').reduce((a, f) => a + f.amount, 0);
  const paid = fees.filter((f) => f.status === 'Paid').reduce((a, f) => a + f.amount, 0);

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Fee Payment" subtitle="Manage and track your fee payments." />

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
          <Wallet size={22} className="mb-3" />
          <p className="text-white/70 text-xs">Pending amount</p>
          <p className="font-display text-3xl font-bold mt-1">₹{pending.toLocaleString('en-IN')}</p>
          <p className="text-xs text-white/60 mt-2">Due 15 Aug 2025</p>
        </Card>
        <Card className="p-6">
          <CheckCircle2 size={22} className="mb-3 text-emerald-500" />
          <p className="text-xs text-ink-500 dark:text-ink-400">Total paid</p>
          <p className="font-display text-3xl font-bold mt-1">₹{paid.toLocaleString('en-IN')}</p>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-2">This academic year</p>
        </Card>
        <Card className="p-6">
          <Clock size={22} className="mb-3 text-accent-500" />
          <p className="text-xs text-ink-500 dark:text-ink-400">Overdue items</p>
          <p className="font-display text-3xl font-bold mt-1">{fees.filter((f) => f.status === 'Overdue').length}</p>
          <p className="text-xs text-rose-500 mt-2">Pay immediately</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-5 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Fee History</h2>
          <button className="btn-primary !text-xs !py-2"><CreditCard size={14} /> Pay pending</button>
        </div>
        <div className="divide-y divide-ink-200 dark:divide-ink-800">
          {fees.map((f) => {
            const st = statusMap[f.status];
            const Icon = st.icon;
            return (
              <div key={f.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className={`grid place-items-center h-10 w-10 rounded-xl bg-${st.color}-50 dark:bg-${st.color}-500/10 text-${st.color}-600 dark:text-${st.color}-400 shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{f.description}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{f.category} · Due {new Date(f.due).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold">₹{f.amount.toLocaleString('en-IN')}</span>
                  <Badge color={st.color}>{f.status}</Badge>
                  {f.status === 'Paid' && (
                    <button className="btn-ghost !p-2" aria-label="Download receipt"><Download size={16} /></button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
