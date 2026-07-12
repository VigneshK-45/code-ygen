import { useState } from 'react';
import { leaveApplications } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Calendar, CheckCircle2, XCircle, Clock, Plus, User } from 'lucide-react';


const statusColor: Record<string, string> = { Pending: 'amber', Approved: 'emerald', Rejected: 'rose' };
const statusIcon: Record<string, typeof Clock> = { Pending: Clock, Approved: CheckCircle2, Rejected: XCircle };

export function Leave() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Home Visit', from: '', to: '', reason: '' });

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Leave Application" subtitle="Apply for leave and track approval status."
        action={<button onClick={() => setShowForm(!showForm)} className="btn-primary !text-sm"><Plus size={16} /> Apply for leave</button>} />

      {showForm && (
        <Card className="p-6 animate-scale-in">
          <h3 className="font-display font-bold text-base mb-4">New Leave Application</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">Leave Type</label>
              <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Home Visit</option><option>Medical Leave</option><option>Academic</option><option>Personal</option>
              </select>
            </div>
            <div><label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">Approver</label>
              <select className="input"><option>Warden — M Block</option><option>Faculty Advisor</option></select></div>
            <div><label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">From Date</label>
              <input type="date" className="input" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></div>
            <div><label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">To Date</label>
              <input type="date" className="input" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></div>
          </div>
          <div className="mt-4"><label className="text-xs font-semibold text-ink-600 dark:text-ink-300 mb-1.5 block">Reason</label>
            <textarea className="input min-h-[80px]" placeholder="Brief reason for leave…" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setShowForm(false)} className="btn-primary">Submit application</button>
            <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {leaveApplications.map((l) => {
          const Icon = statusIcon[l.status];
          return (
            <Card key={l.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <div className={`grid place-items-center h-11 w-11 rounded-xl shrink-0 bg-${statusColor[l.status]}-50 dark:bg-${statusColor[l.status]}-500/10 text-${statusColor[l.status]}-600`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{l.type}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{l.reason}</p>
                    </div>
                    <Badge color={statusColor[l.status]}>{l.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-500 dark:text-ink-400 mt-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(l.from).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} → {new Date(l.to).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {l.approver}</span>
                    <span>Applied: {new Date(l.appliedOn).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
