import { useState } from 'react';
import { notifications } from '../data';
import { Card, SectionHeader, Badge, EmptyState } from '../components/ui';
import { Bell, Check, Filter } from 'lucide-react';

const catColor: Record<string, string> = {
  Academic: 'brand', Fee: 'rose', Event: 'violet', General: 'ink',
};

export function Notifications() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<string>('All');

  const cats = ['All', ...new Set(notifications.map((n) => n.category))];
  const filtered = filter === 'All' ? items : items.filter((n) => n.category === filter);
  const unread = items.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const markAll = () => setItems((arr) => arr.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader
        title="Notifications"
        subtitle={`${unread} unread of ${items.length} notifications`}
        action={
          <button onClick={markAll} className="btn-outline !text-xs !py-2">
            <Check size={14} /> Mark all read
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-ink-400" />
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`chip transition-colors ${filter === c ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card><EmptyState icon={<Bell size={28} />} title="No notifications" subtitle="You're all caught up." /></Card>
        ) : (
          filtered.map((n) => (
            <Card key={n.id} hover className={`p-4 flex gap-4 ${n.read ? '' : 'border-l-4 border-l-brand-500'}`}>
              <div className={`grid place-items-center h-10 w-10 rounded-xl bg-${catColor[n.category]}-50 dark:bg-${catColor[n.category]}-500/10 text-${catColor[n.category]}-600 dark:text-${catColor[n.category]}-400 shrink-0`}>
                <Bell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm">{n.title}</p>
                  <Badge color={catColor[n.category]}>{n.category}</Badge>
                </div>
                <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{n.body}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-ink-400">{n.time}</span>
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
