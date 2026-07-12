import { useState } from 'react';
import { facultyFeedback } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { CheckCircle2, Star, Send } from 'lucide-react';

const questions = [
  'Clarity of teaching',
  'Punctuality & availability',
  'Course material quality',
  'Fairness in assessment',
  'Approachability for doubts',
];

export function Feedback() {
  const [ratings, setRatings] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState(facultyFeedback.find((f) => !f.submitted)?.id ?? facultyFeedback[0].id);

  const current = facultyFeedback.find((f) => f.id === active)!;
  const currentRatings = ratings[current.id] ?? [0, 0, 0, 0, 0];

  const setRating = (qIdx: number, val: number) => {
    setRatings((r) => ({ ...r, [current.id]: currentRatings.map((v, i) => (i === qIdx ? val : v)) }));
  };

  const submit = () => {
    setSubmitted((s) => ({ ...s, [current.id]: true }));
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Faculty Feedback" subtitle="Share anonymous feedback for your course faculty." />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-4 lg:col-span-1 h-fit">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-3 px-2">Faculty</p>
          <div className="space-y-1">
            {facultyFeedback.map((f) => {
              const done = f.submitted || submitted[f.id];
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${active === f.id ? 'bg-brand-50 dark:bg-brand-500/10' : 'hover:bg-ink-100 dark:hover:bg-ink-800'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{f.name}</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400 truncate">{f.course} · {f.code}</p>
                    </div>
                    {done && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6">
          {current.submitted || submitted[current.id] ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="grid place-items-center h-16 w-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p className="font-display text-lg font-bold">Feedback submitted</p>
              <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Thank you for your feedback for {current.name}.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold">{current.name}</h2>
                <p className="text-sm text-ink-500 dark:text-ink-400">{current.course} · {current.code}</p>
              </div>

              <div className="space-y-5">
                {questions.map((q, qi) => (
                  <div key={q}>
                    <p className="text-sm font-medium mb-2">{q}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => setRating(qi, v)}
                          className={`grid place-items-center h-10 w-10 rounded-lg border transition-all ${currentRatings[qi] >= v ? 'bg-accent-500 border-accent-500 text-white' : 'border-ink-200 dark:border-ink-700 text-ink-400 hover:border-accent-400'}`}
                        >
                          <Star size={16} fill={currentRatings[qi] >= v ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Badge color="ink">Anonymous</Badge>
                <button
                  onClick={submit}
                  disabled={currentRatings.every((v) => v === 0)}
                  className="btn-primary"
                >
                  Submit feedback <Send size={14} />
                </button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
