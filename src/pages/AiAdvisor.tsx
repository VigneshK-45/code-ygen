import { useState, useRef, useEffect } from 'react';
import { student, attendance } from '../data';
import { Card, SectionHeader } from '../components/ui';
import { Brain, Send, User, TrendingUp, AlertTriangle, Target, BookOpen } from 'lucide-react';

interface Msg {
  role: 'user' | 'bot';
  text: string;
  cards?: { icon: string; label: string; value: string }[];
}

function generateReply(q: string): Msg {
  const lower = q.toLowerCase();
  if (lower.includes('improve') || lower.includes('cgpa') || lower.includes('better grade')) {
    return {
      role: 'bot',
      text: `To improve your CGPA from ${student.cgpa.toFixed(2)} to 9.0+, I recommend focusing on these areas:`,
      cards: [
        { icon: 'alert', label: 'Priority', value: 'Software Engineering is at high risk — predicted B grade. Attend all remaining classes and submit the overdue UML assignment.' },
        { icon: 'target', label: 'Target', value: 'Scoring A in OS (CSE3002) would add +0.3 to your SGPA. Focus on process scheduling and deadlock topics.' },
        { icon: 'trending', label: 'Trend', value: 'Your Networks and DBMS scores are trending up — maintain momentum in CAT-2.' },
      ],
    };
  }
  if (lower.includes('risk') || lower.includes('struggling') || lower.includes('weak')) {
    return {
      role: 'bot',
      text: 'Based on your attendance, assignment history and CAT scores, here\'s my risk assessment:',
      cards: [
        { icon: 'alert', label: 'High Risk', value: 'Software Engineering (CSE3005) — 80% attendance, overdue assignment, low quiz scores. Predicted grade: B.' },
        { icon: 'target', label: 'Medium Risk', value: 'Operating Systems (CSE3002) — 77% attendance, below average CAT-1. Predicted grade: B+.' },
        { icon: 'trending', label: 'Low Risk', value: 'Networks, DBMS, and Tech Comm are on track for A/A+.' },
      ],
    };
  }
  if (lower.includes('study') || lower.includes('plan') || lower.includes('schedule')) {
    return {
      role: 'bot',
      text: 'Here\'s a personalized study plan for the next 2 weeks before CAT-2:',
      cards: [
        { icon: 'book', label: 'Week 1', value: 'Focus on OS (process scheduling, deadlocks) and SE (UML diagrams, testing). 2 hours/day each.' },
        { icon: 'book', label: 'Week 2', value: 'Shift to DBMS (normalization, transactions) and Networks (TCP/IP, routing). Take mock tests.' },
        { icon: 'target', label: 'Daily Target', value: '4 hours focused study + 1 hour revision. Use the library 2nd floor discussion rooms.' },
      ],
    };
  }
  if (lower.includes('attendance') || lower.includes('skip') || lower.includes('bunk')) {
    const os = attendance.find((a) => a.code === 'CSE3002');
    return { role: 'bot', text: `Your attendance in OS is ${os?.attended}/${os?.total} (${Math.round((os!.attended / os!.total) * 100)}%). You can skip at most 2 more classes before dropping below 75%. I'd recommend not skipping — your CAT-1 score was below average, so every class counts.` };
  }
  if (lower.includes('career') || lower.includes('job') || lower.includes('placement')) {
    return {
      role: 'bot',
      text: 'Based on your academic profile, here are my career recommendations:',
      cards: [
        { icon: 'trending', label: 'Strong Areas', value: 'DBMS, Networks, and OOP — consider roles in backend engineering or database administration.' },
        { icon: 'target', label: 'Improve', value: 'Build projects in OS and SE to strengthen your systems engineering profile.' },
        { icon: 'book', label: 'Suggested Skills', value: 'Focus on DSA (LeetCode medium), system design basics, and SQL for placement interviews.' },
      ],
    };
  }
  return { role: 'bot', text: `I'm your AI academic advisor, ${student.name.split(' ')[0]}. I can help with study plans, grade improvement, risk assessment, and career guidance. Try asking "How can I improve my CGPA?" or "Which courses am I at risk in?"` };
}

const cardIcon: Record<string, typeof Brain> = { alert: AlertTriangle, target: Target, trending: TrendingUp, book: BookOpen };

export function AiAdvisor() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: `Hello ${student.name.split(' ')[0]}! I'm your AI Academic Advisor. I analyze your attendance, grades, and assignments to give personalized guidance. How can I help?` },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => { setMessages((m) => [...m, generateReply(text)]); setTyping(false); }, 800);
  };

  const suggestions = ['How can I improve my CGPA?', 'Which courses am I at risk in?', 'Make a study plan for CAT-2', 'Career advice based on my profile'];

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="AI Academic Advisor" subtitle="Personalized academic guidance powered by predictive analytics." />

      {/* Insight cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><TrendingUp size={20} /></div><div><p className="text-xs text-ink-500">Predicted CGPA</p><p className="font-display text-xl font-bold">8.85</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600"><AlertTriangle size={20} /></div><div><p className="text-xs text-ink-500">At-Risk Courses</p><p className="font-display text-xl font-bold">2</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><div className="grid place-items-center h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><Target size={20} /></div><div><p className="text-xs text-ink-500">Target CGPA</p><p className="font-display text-xl font-bold">9.0+</p></div></div></Card>
      </div>

      <Card className="flex flex-col h-[calc(100vh-380px)] min-h-[400px]">
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'bot' && <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white shrink-0"><Brain size={16} /></div>}
              <div className={`max-w-[80%] ${m.role === 'user' ? '' : ''}`}>
                <div className={`rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-ink-100 dark:bg-ink-800 rounded-bl-sm'}`}>{m.text}</div>
                {m.cards && (
                  <div className="mt-2 space-y-2">
                    {m.cards.map((c, ci) => {
                      const Icon = cardIcon[c.icon] ?? BookOpen;
                      return (
                        <div key={ci} className="rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 p-3 flex items-start gap-3">
                          <div className="grid place-items-center h-8 w-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 shrink-0"><Icon size={16} /></div>
                          <div><p className="text-xs font-bold uppercase text-ink-400">{c.label}</p><p className="text-sm mt-0.5">{c.value}</p></div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {m.role === 'user' && <div className="grid place-items-center h-8 w-8 rounded-lg bg-ink-200 dark:bg-ink-700 shrink-0"><User size={16} /></div>}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-white shrink-0"><Brain size={16} /></div>
              <div className="bg-ink-100 dark:bg-ink-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 2 && (
          <div className="px-5 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => <button key={s} onClick={() => send(s)} className="text-xs rounded-full bg-ink-100 dark:bg-ink-800 px-3 py-1.5 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">{s}</button>)}
          </div>
        )}

        <div className="p-4 border-t border-ink-200 dark:border-ink-800">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for study advice, career guidance…" className="input flex-1" />
            <button type="submit" disabled={!input.trim()} className="btn-primary !px-4"><Send size={16} /></button>
          </form>
        </div>
      </Card>
    </div>
  );
}
