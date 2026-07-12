import { useState } from 'react';
import { messMenu } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Coffee, Sun, Cookie, Moon, UtensilsCrossed, Star } from 'lucide-react';

const meals = [
  { key: 'breakfast', label: 'Breakfast', icon: Coffee, time: '7:30 – 9:30 AM', color: 'amber' },
  { key: 'lunch', label: 'Lunch', icon: Sun, time: '12:00 – 2:00 PM', color: 'brand' },
  { key: 'snacks', label: 'Snacks', icon: Cookie, time: '4:30 – 5:30 PM', color: 'accent' },
  { key: 'dinner', label: 'Dinner', icon: Moon, time: '7:30 – 9:30 PM', color: 'violet' },
] as const;

export function Mess() {
  const todayIdx = Math.max(0, Math.min(6, new Date().getDay() === 0 ? 6 : new Date().getDay() - 1));
  const [selectedDay, setSelectedDay] = useState(messMenu[todayIdx].day);
  const dayMenu = messMenu.find((m) => m.day === selectedDay)!;

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Mess Menu" subtitle="Weekly dining schedule for your mess."
        action={<Badge color="amber"><Star size={12} /> Today's Special: Pav Bhaji</Badge>} />

      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {messMenu.map((m) => (
          <button key={m.day} onClick={() => setSelectedDay(m.day)}
            className={`shrink-0 chip transition-colors ${selectedDay === m.day ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200'}`}>
            {m.day === messMenu[todayIdx].day ? `Today · ${m.day}` : m.day}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {meals.map((meal) => {
          const Icon = meal.icon;
          return (
            <Card key={meal.key} hover className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`grid place-items-center h-11 w-11 rounded-xl bg-${meal.color}-50 dark:bg-${meal.color}-500/10 text-${meal.color}-600 dark:text-${meal.color}-400`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm">{meal.label}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{meal.time}</p>
                </div>
              </div>
              <p className="text-sm text-ink-700 dark:text-ink-200 mt-2">{dayMenu[meal.key]}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 flex items-center gap-3">
        <div className="grid place-items-center h-10 w-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600"><UtensilsCrossed size={18} /></div>
        <div>
          <p className="text-sm font-semibold">Mess: Main Campus Mess (Block A)</p>
          <p className="text-xs text-ink-500 dark:text-ink-400">Hygiene rating: 4.6/5 · Capacity: 1200 students</p>
        </div>
      </Card>
    </div>
  );
}
