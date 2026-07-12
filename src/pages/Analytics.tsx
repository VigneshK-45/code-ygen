import { analyticsPredictions, student } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Brain, Target, Gauge } from 'lucide-react';

const trendIcon: Record<string, typeof TrendingUp> = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor: Record<string, string> = { up: 'emerald', down: 'rose', stable: 'ink' };
const riskColor: Record<string, string> = { low: 'emerald', medium: 'amber', high: 'rose' };

export function Analytics() {
  const avgPredicted = (analyticsPredictions.reduce((a, p) => a + p.predictedGPA, 0) / analyticsPredictions.length).toFixed(2);
  const highRisk = analyticsPredictions.filter((p) => p.risk === 'high').length;
  const lowRisk = analyticsPredictions.filter((p) => p.risk === 'low').length;

  // GPA radar-like data
  const semData = [
    { sem: 'Sem 1', sgpa: 9.4 }, { sem: 'Sem 2', sgpa: 8.9 }, { sem: 'Sem 3', sgpa: 8.74 }, { sem: 'Predicted', sgpa: parseFloat(avgPredicted) },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Predictive Performance Analytics" subtitle="AI-powered grade predictions and risk analysis for your courses." />

      {/* Summary cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><Gauge size={20} /></div><div><p className="text-xs text-ink-500">Predicted SGPA</p><p className="font-display text-xl font-bold">{avgPredicted}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={20} /></div><div><p className="text-xs text-ink-500">Low Risk</p><p className="font-display text-xl font-bold">{lowRisk}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600"><AlertTriangle size={20} /></div><div><p className="text-xs text-ink-500">Medium Risk</p><p className="font-display text-xl font-bold">{analyticsPredictions.filter(p => p.risk === 'medium').length}</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600"><AlertTriangle size={20} /></div><div><p className="text-xs text-ink-500">High Risk</p><p className="font-display text-xl font-bold">{highRisk}</p></div></div></Card>
      </div>

      {/* GPA trend with prediction */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain size={18} className="text-brand-500" />
          <h2 className="font-display text-lg font-bold">SGPA Trend & Prediction</h2>
        </div>
        <p className="text-xs text-ink-500 dark:text-ink-400 mb-6">Past performance with AI-predicted semester outcome</p>
        <div className="flex items-end justify-around gap-4 h-48 px-4">
          {semData.map((s, i) => (
            <div key={s.sem} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-ink-600 dark:text-ink-300">{s.sgpa.toFixed(2)}</span>
              <div className="w-full max-w-[80px] flex items-end h-full">
                <div className={`w-full rounded-t-lg ${s.sem === 'Predicted' ? 'bg-gradient-to-t from-accent-500 to-accent-400 border-2 border-dashed border-accent-600' : 'bg-gradient-to-t from-brand-600 to-brand-400'} animate-fade-up`} style={{ height: `${(s.sgpa / 10) * 100}%`, animationDelay: `${i * 100}ms` }} />
              </div>
              <span className={`text-xs ${s.sem === 'Predicted' ? 'text-accent-600 font-bold' : 'text-ink-500'}`}>{s.sem}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Course predictions */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-brand-500" />
          <h2 className="font-display text-lg font-bold">Course-wise Predictions</h2>
        </div>
        <div className="space-y-4">
          {analyticsPredictions.map((p) => {
            const TrendIcon = trendIcon[p.trend];
            return (
              <div key={p.code} className="rounded-xl border border-ink-200 dark:border-ink-800 p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{p.course} <span className="text-xs text-ink-400 font-mono">· {p.code}</span></p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge color={riskColor[p.risk]}>{p.risk} risk</Badge>
                      <span className="text-xs text-ink-500">Confidence: {p.confidence}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-2xl font-bold">{p.predictedGPA.toFixed(1)}</span>
                      <TrendIcon size={18} className={`text-${trendColor[p.trend]}-500`} />
                    </div>
                    <p className="text-xs text-ink-500">Predicted: {p.predictedGrade}</p>
                  </div>
                </div>
                {/* Confidence bar */}
                <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden mb-3">
                  <div className={`h-full rounded-full bg-${riskColor[p.risk]}-500`} style={{ width: `${p.confidence}%`, transition: 'width 0.8s ease-out' }} />
                </div>
                {/* Factors */}
                <div className="flex flex-wrap gap-1.5">
                  {p.factors.map((f: string, fi: number) => (
                    <span key={fi} className="text-xs rounded-lg bg-ink-100 dark:bg-ink-800 px-2 py-1 text-ink-600 dark:text-ink-300">{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={20} />
          <h2 className="font-display text-lg font-bold">AI Recommendations</h2>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2"><span className="text-white/60">1.</span> Prioritize Software Engineering — attend all remaining classes and submit the overdue UML assignment immediately.</p>
          <p className="flex items-start gap-2"><span className="text-white/60">2.</span> Your OS attendance is at 77% — don't skip more than 2 classes to stay above the 75% threshold.</p>
          <p className="flex items-start gap-2"><span className="text-white/60">3.</span> Networks and DBMS are trending well — maintain your study pace for A+ grades.</p>
          <p className="flex items-start gap-2"><span className="text-white/60">4.</span> Predicted SGPA of {avgPredicted} would bring your CGPA to ~{(student.cgpa + 0.1).toFixed(2)}. Target 9.0+ by scoring A in OS.</p>
        </div>
      </Card>
    </div>
  );
}
