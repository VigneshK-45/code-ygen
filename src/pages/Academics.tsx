import { grades, student } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { TrendingUp, Award, BookOpen } from 'lucide-react';

const gradeColor: Record<string, string> = {
  'A+': 'emerald', 'A': 'emerald', 'B+': 'brand', 'B': 'amber', 'C': 'accent', 'F': 'rose',
};

export function Academics() {
  const semesters = [...new Set(grades.map((g) => g.semester))];
  const sgpa = (sem: string) => {
    const rows = grades.filter((g) => g.semester === sem);
    const total = rows.reduce((a, g) => a + g.credits, 0);
    const pts = rows.reduce((a, g) => a + g.gradePoint * g.credits, 0);
    return (pts / total).toFixed(2);
  };

  const trend = [
    { sem: 'Sem 1', sgpa: 9.4 },
    { sem: 'Sem 2', sgpa: 8.9 },
    { sem: 'Sem 3', sgpa: 8.74 },
  ];

  const maxVal = 10;

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Academics" subtitle="Your grades, GPA and academic performance." />

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400"><Award size={20} /></div>
            <div>
              <p className="text-xs text-ink-500 dark:text-ink-400">Current CGPA</p>
              <p className="font-display text-2xl font-bold">{student.cgpa.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><TrendingUp size={20} /></div>
            <div>
              <p className="text-xs text-ink-500 dark:text-ink-400">Credits earned</p>
              <p className="font-display text-2xl font-bold">{student.creditsCompleted}<span className="text-sm text-ink-400">/{student.creditsTotal}</span></p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-11 w-11 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400"><BookOpen size={20} /></div>
            <div>
              <p className="text-xs text-ink-500 dark:text-ink-400">Semesters done</p>
              <p className="font-display text-2xl font-bold">{semesters.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* CGPA trend chart */}
      <Card className="p-6">
        <h2 className="font-display text-lg font-bold mb-1">CGPA Trend</h2>
        <p className="text-xs text-ink-500 dark:text-ink-400 mb-6">Semester-wise SGPA progression</p>
        <div className="flex items-end justify-around gap-4 h-48 px-4">
          {trend.map((t, i) => (
            <div key={t.sem} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-ink-600 dark:text-ink-300">{t.sgpa}</span>
              <div className="w-full max-w-[80px] flex items-end h-full">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 animate-fade-up"
                  style={{ height: `${(t.sgpa / maxVal) * 100}%`, animationDelay: `${i * 100}ms` }}
                />
              </div>
              <span className="text-xs text-ink-500 dark:text-ink-400">{t.sem}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Grade history */}
      {semesters.map((sem) => (
        <Card key={sem} className="overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-ink-200 dark:border-ink-800">
            <h2 className="font-display text-lg font-bold">{sem}</h2>
            <Badge color="brand">SGPA {sgpa(sem)}</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-400 border-b border-ink-200 dark:border-ink-800">
                  <th className="px-5 py-3 font-semibold">Code</th>
                  <th className="px-5 py-3 font-semibold">Course</th>
                  <th className="px-5 py-3 font-semibold">Credits</th>
                  <th className="px-5 py-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                {grades.filter((g) => g.semester === sem).map((g) => (
                  <tr key={g.code} className="hover:bg-ink-50 dark:hover:bg-ink-800/50">
                    <td className="px-5 py-3 font-mono text-xs">{g.code}</td>
                    <td className="px-5 py-3 font-medium">{g.title}</td>
                    <td className="px-5 py-3 text-ink-500">{g.credits}</td>
                    <td className="px-5 py-3"><Badge color={gradeColor[g.grade]}>{g.grade}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
