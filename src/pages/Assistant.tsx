import { useState, useRef, useEffect } from 'react';
import { attendance, student, fees, timetable } from '../data';
import { Card, SectionHeader } from '../components/ui';
import { Sparkles, Send, User } from 'lucide-react';

interface Msg {
  role: 'user' | 'bot';
  text: string;
}

const suggestions = [
  "What's my attendance in OS?",
  'When is my next class?',
  'How much fee is pending?',
  'Show my CGPA trend',
  'Which courses am I taking?',
];

function generateReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes('attendance') && lower.includes('os')) {
    const os = attendance.find((a) => a.code === 'CSE3002');
    return `Your attendance in Operating Systems (CSE3002) is **${os?.attended}/${os?.total}** (${Math.round((os!.attended / os!.total) * 100)}%). You're above the 75% threshold.`;
  }
  if (lower.includes('attendance')) {
    const overall = Math.round((attendance.reduce((a, c) => a + c.attended, 0) / attendance.reduce((a, c) => a + c.total, 0)) * 100);
    return `Your overall attendance is **${overall}%**. The lowest is in Software Engineering at ${Math.round((29 / 36) * 100)}%. Keep it above 75% to avoid debarment.`;
  }
  if (lower.includes('next class') || lower.includes('timetable')) {
    const next = timetable.find((t) => t.day === 'Mon' && t.start === '08:00');
    return `Your next class is **${next?.title} (${next?.code})** at ${next?.start} in ${next?.room}, taught by ${next?.faculty}.`;
  }
  if (lower.includes('fee') || lower.includes('payment')) {
    const pending = fees.filter((f) => f.status !== 'Paid').reduce((a, f) => a + f.amount, 0);
    return `You have **₹${pending.toLocaleString('en-IN')}** in pending fees. The tuition fee of ₹98,700 and hostel fee of ₹42,500 are due on **15 Aug 2025**. There's also a ₹250 library fine overdue.`;
  }
  if (lower.includes('cgpa') || lower.includes('grade')) {
    return `Your current CGPA is **${student.cgpa.toFixed(2)}**. Semester trend: Sem 1 → 9.40, Sem 2 → 8.90, Sem 3 → 8.74. You've earned ${student.creditsCompleted} of ${student.creditsTotal} credits.`;
  }
  if (lower.includes('course')) {
    return `You're taking ${attendance.length} courses this semester: DBMS, Operating Systems, Computer Networks, DBMS Lab, Software Engineering, and Technical Communication — totaling 18 credits.`;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hi ${student.name.split(' ')[0]}! I'm your VTOP assistant. I can help with attendance, timetable, fees, grades, and courses. What would you like to know?`;
  }
  return `I can help with your attendance, timetable, fees, CGPA, and courses. Try asking "What's my attendance?" or "How much fee is pending?"`;
}

export function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: `Hi ${student.name.split(' ')[0]}! I'm your VTOP AI assistant. Ask me about your attendance, timetable, fees, grades, or courses.` },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: generateReply(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="AI Assistant" subtitle="Your smart campus companion — ask anything." />

      <Card className="flex flex-col h-[calc(100vh-220px)] min-h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'bot' && (
                <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white shrink-0">
                  <Sparkles size={16} />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-ink-100 dark:bg-ink-800 rounded-bl-sm'}`}>
                {m.text.split('**').map((part, idx) => (idx % 2 === 1 ? <strong key={idx}>{part}</strong> : <span key={idx}>{part}</span>))}
              </div>
              {m.role === 'user' && (
                <div className="grid place-items-center h-8 w-8 rounded-lg bg-ink-200 dark:bg-ink-700 shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="bg-ink-100 dark:bg-ink-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-5 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs rounded-full bg-ink-100 dark:bg-ink-800 px-3 py-1.5 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-ink-200 dark:border-ink-800">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about attendance, fees, timetable…"
              className="input flex-1"
            />
            <button type="submit" disabled={!input.trim()} className="btn-primary !px-4">
              <Send size={16} />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
