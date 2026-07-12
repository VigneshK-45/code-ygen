import { attendance } from '../data';
import { Card, SectionHeader, ProgressRing, Badge } from '../components/ui';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

const colorFor = (pct: number) => {
  if (pct >= 85) return '#10b981';
  if (pct >= 75) return '#3385ff';
  if (pct >= 65) return '#f59e0b';
  return '#ef4444';
};

export function Attendance() {
  const rows = attendance.map((a) => {
    const pct = Math.round((a.attended / a.total) * 100);
    const canBunk = Math.floor((a.attended / 0.75 - a.total + a.attended / (a.attended / a.total)) * 1);
    const need = pct < 75 ? Math.ceil((0.75 * a.total - a.attended) / 0.25) : 0;
    return { ...a, pct, need, canBunk };
  });

  const overall = Math.round(
    (attendance.reduce((a, c) => a + c.attended, 0) / attendance.reduce((a, c) => a + c.total, 0)) * 100,
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Attendance" subtitle="Track your class attendance and plan ahead." />

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 flex items-center gap-5">
          <ProgressRing value={overall} size={110} color={colorFor(overall)} label={`${overall}%`} sublabel="Overall" />
          <div>
            <p className="text-sm text-ink-500 dark:text-ink-400">Total classes</p>
            <p className="font-display text-2xl font-bold">{attendance.reduce((a, c) => a + c.total, 0)}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle2 size={12} /> Above threshold</p>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-ink-500 dark:text-ink-400">Classes attended</p>
          <p className="font-display text-3xl font-bold mt-1">{attendance.reduce((a, c) => a + c.attended, 0)}</p>
          <div className="mt-3 h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overall}%` }} />
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-ink-500 dark:text-ink-400">At-risk courses</p>
          <p className="font-display text-3xl font-bold mt-1">{rows.filter((r) => r.pct < 75).length}</p>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">Below 75% attendance</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-5 border-b border-ink-200 dark:border-ink-800">
          <h2 className="font-display text-lg font-bold">Course-wise Attendance</h2>
        </div>
        <div className="divide-y divide-ink-200 dark:divide-ink-800">
          {rows.map((r) => (
            <div key={r.code} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <ProgressRing value={r.pct} size={64} stroke={6} color={colorFor(r.pct)} label={`${r.pct}%`} />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{r.title}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{r.code} · {r.attended}/{r.total} classes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {r.pct >= 75 ? (
                  <Badge color="emerald"><TrendingUp size={12} /> Can skip {r.canBunk}</Badge>
                ) : (
                  <Badge color="rose"><AlertTriangle size={12} /> Attend {r.need} more</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
