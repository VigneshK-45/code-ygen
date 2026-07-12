import { hostelInfo } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Building2, BedDouble, Users, Calendar, Wrench, CheckCircle2, Clock, Wifi, Snowflake, Droplets, BookOpen, WashingMachine, Shield, Plus } from 'lucide-react';

const amenityIcon: Record<string, typeof Wifi> = {
  'Wi-Fi': Wifi, AC: Snowflake, Geyser: Droplets, 'Study Table': BookOpen, 'Washing Machine': WashingMachine, '24/7 Security': Shield,
};
const statusColor: Record<string, string> = { Open: 'rose', 'In Progress': 'amber', Resolved: 'emerald' };

export function Hostel() {
  const m = hostelInfo.maintenanceRequests;
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Hostel Management" subtitle="Your hostel details, room info and maintenance requests." />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 bg-gradient-to-br from-brand-700 to-brand-900 text-white border-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm"><Building2 size={24} /></div>
            <div>
              <p className="font-display text-xl font-bold">{hostelInfo.block}</p>
              <p className="text-white/70 text-sm">Room {hostelInfo.room} · {hostelInfo.type}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl bg-white/10 p-3"><div className="flex items-center gap-2 text-white/70 text-xs mb-1"><BedDouble size={14} /> Room Type</div><p className="font-semibold text-sm">{hostelInfo.type}</p></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="flex items-center gap-2 text-white/70 text-xs mb-1"><Users size={14} /> Roommates</div><p className="font-semibold text-sm truncate">{hostelInfo.roommate}</p></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="flex items-center gap-2 text-white/70 text-xs mb-1"><Calendar size={14} /> Check-in</div><p className="font-semibold text-sm">{hostelInfo.checkIn}</p></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="flex items-center gap-2 text-white/70 text-xs mb-1">Semester Fee</div><p className="font-semibold text-sm">₹{hostelInfo.fee.toLocaleString('en-IN')}</p></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-base mb-4">Amenities</h3>
          <div className="space-y-3">
            {hostelInfo.amenities.map((a: string) => {
              const Icon = amenityIcon[a] ?? CheckCircle2;
              return (
                <div key={a} className="flex items-center gap-3">
                  <div className="grid place-items-center h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><Icon size={16} /></div>
                  <span className="text-sm font-medium">{a}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600"><Wrench size={18} /></div>
            <h3 className="font-display font-bold text-base">Maintenance Requests</h3>
          </div>
          <button className="btn-primary !text-xs !py-2"><Plus size={14} /> New request</button>
        </div>
        <div className="rounded-xl border border-ink-200 dark:border-ink-800 p-4 flex items-center gap-3">
          <div className={`grid place-items-center h-10 w-10 rounded-xl shrink-0 bg-${statusColor[m.status]}-50 dark:bg-${statusColor[m.status]}-500/10 text-${statusColor[m.status]}-600`}>
            {m.status === 'Resolved' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{m.issue}</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Reported on {new Date(m.date).toLocaleDateString('en-IN')}</p>
          </div>
          <Badge color={statusColor[m.status]}>{m.status}</Badge>
        </div>
      </Card>
    </div>
  );
}
