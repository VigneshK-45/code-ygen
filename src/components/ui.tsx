import type { ReactNode } from 'react';

export function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  color = '#3385ff',
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-ink-200 dark:stroke-ink-800" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold">{label ?? `${value}%`}</span>
        {sublabel && <span className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}

export function Card({ children, className = '', hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return <div className={`card ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  color = 'brand',
}: {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  };
  return (
    <Card hover className="p-5">
      <div className="flex items-center gap-3">
        <div className={`grid place-items-center h-11 w-11 rounded-xl ${colorMap[color]}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 truncate">{label}</p>
          <p className="font-display text-xl font-bold mt-0.5">{value}</p>
        </div>
      </div>
      {trend && <p className="text-xs text-ink-500 dark:text-ink-400 mt-3">{trend}</p>}
    </Card>
  );
}

export function Badge({ children, color = 'ink' }: { children: ReactNode; color?: string }) {
  const map: Record<string, string> = {
    ink: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    accent: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
  };
  return <span className={`chip ${map[color]}`}>{children}</span>;
}

export function EmptyState({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="grid place-items-center h-16 w-16 rounded-2xl bg-ink-100 dark:bg-ink-800 text-ink-400 mb-4">{icon}</div>
      <p className="font-semibold text-ink-700 dark:text-ink-200">{title}</p>
      {subtitle && <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 max-w-xs">{subtitle}</p>}
    </div>
  );
}
