import { medicalRecords } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { HeartPulse, Stethoscope, Pill, Calendar, Plus, FileText, Syringe } from 'lucide-react';

const typeIcon: Record<string, typeof Stethoscope> = {
  'General Checkup': Stethoscope, 'Sports Injury': HeartPulse, Vaccination: Syringe, Allergy: Pill,
};
const typeColor: Record<string, string> = {
  'General Checkup': 'brand', 'Sports Injury': 'accent', Vaccination: 'emerald', Allergy: 'violet',
};

export function Medical() {
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Medical Records" subtitle="Your health history and campus clinic visits."
        action={<button className="btn-primary !text-sm"><Plus size={16} /> Book appointment</button>} />

      <Card className="p-6 bg-gradient-to-br from-rose-500 to-rose-700 text-white border-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="grid place-items-center h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm"><HeartPulse size={24} /></div>
          <div>
            <p className="font-display text-lg font-bold">Campus Health Summary</p>
            <p className="text-white/70 text-sm">Blood Group: {medicalRecords[0] ? 'B+' : 'B+'} · No active conditions</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl bg-white/10 p-3 text-center"><p className="text-2xl font-bold">{medicalRecords.length}</p><p className="text-xs text-white/70">Total Visits</p></div>
          <div className="rounded-xl bg-white/10 p-3 text-center"><p className="text-2xl font-bold">0</p><p className="text-xs text-white/70">Active Meds</p></div>
          <div className="rounded-xl bg-white/10 p-3 text-center"><p className="text-2xl font-bold">1</p><p className="text-xs text-white/70">Allergies</p></div>
        </div>
      </Card>

      <div className="space-y-4">
        {medicalRecords.map((r) => {
          const Icon = typeIcon[r.type] ?? FileText;
          const color = typeColor[r.type] ?? 'ink';
          return (
            <Card key={r.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <div className={`grid place-items-center h-11 w-11 rounded-xl shrink-0 bg-${color}-50 dark:bg-${color}-500/10 text-${color}-600`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{r.type}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400">{r.doctor}</p>
                    </div>
                    <Badge color={color}>{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</Badge>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p><span className="text-ink-400 text-xs font-semibold uppercase">Diagnosis: </span>{r.diagnosis}</p>
                    <p className="flex items-start gap-1.5"><Pill size={14} className="text-ink-400 mt-0.5 shrink-0" /><span><span className="text-ink-400 text-xs font-semibold uppercase">Rx: </span>{r.prescription}</span></p>
                    {r.followUp && <p className="flex items-center gap-1.5 text-xs text-amber-600"><Calendar size={12} /> Follow-up: {new Date(r.followUp).toLocaleDateString('en-IN')}</p>}
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
