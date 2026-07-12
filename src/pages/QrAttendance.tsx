import { useState, useEffect } from 'react';
import { Card, SectionHeader, Badge } from '../components/ui';
import { QrCode, ScanLine, CheckCircle2, Clock, Camera, Zap } from 'lucide-react';

export function QrAttendance() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState<string | null>(null);
  const [recentScans] = useState([
    { code: 'CSE3001', title: 'DBMS', time: '08:02 AM', status: 'Present', date: 'Today' },
    { code: 'CSE3002', title: 'OS', time: '09:05 AM', status: 'Present', date: 'Today' },
    { code: 'CSE3004', title: 'DBMS Lab', time: '10:08 AM', status: 'Present', date: 'Today' },
    { code: 'CSE3005', title: 'SE', time: '02:03 PM', status: 'Present', date: 'Yesterday' },
  ]);

  useEffect(() => {
    if (scanning) {
      const t = setTimeout(() => {
        setScanning(false);
        setScanned('CSE3003 — Computer Networks');
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [scanning]);

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="QR Attendance" subtitle="Mark your presence by scanning the QR code displayed in class." />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-base mb-4">Scan QR Code</h3>
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed border-ink-300 dark:border-ink-700 overflow-hidden grid place-items-center bg-ink-50 dark:bg-ink-800/50">
            {scanning ? (
              <>
                <div className="absolute inset-0 grid place-items-center">
                  <QrCode size={120} className="text-ink-300 dark:text-ink-600" />
                </div>
                <div className="absolute left-0 right-0 h-1 bg-brand-500 shadow-glow animate-[shimmer_1s_ease-in-out_infinite]" style={{ animation: 'scanline 1.5s ease-in-out infinite' }} />
                <p className="absolute bottom-4 text-sm font-semibold text-brand-600 flex items-center gap-1.5"><ScanLine size={16} /> Scanning…</p>
              </>
            ) : scanned ? (
              <div className="text-center animate-scale-in">
                <div className="grid place-items-center h-16 w-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 mx-auto mb-3"><CheckCircle2 size={32} /></div>
                <p className="font-semibold text-sm">Attendance marked!</p>
                <p className="text-xs text-ink-500 mt-1">{scanned}</p>
                <button onClick={() => { setScanned(null); setScanning(true); }} className="btn-outline mt-4 !text-xs !py-2">Scan another</button>
              </div>
            ) : (
              <div className="text-center">
                <div className="grid place-items-center h-16 w-16 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 mx-auto mb-3"><Camera size={28} /></div>
                <p className="text-sm text-ink-500 mb-4">Point your camera at the class QR code</p>
                <button onClick={() => setScanning(true)} className="btn-primary"><ScanLine size={16} /> Start scanning</button>
              </div>
            )}
          </div>
        </Card>

        {/* Recent scans */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base">Recent Check-ins</h3>
            <Badge color="emerald"><Zap size={12} /> 4 today</Badge>
          </div>
          <div className="space-y-3">
            {recentScans.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-200 dark:border-ink-800 p-3">
                <div className="grid place-items-center h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 shrink-0"><CheckCircle2 size={18} /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{s.title} · {s.code}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-1"><Clock size={11} /> {s.time} · {s.date}</p>
                </div>
                <Badge color="emerald">{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 flex items-start gap-3 bg-brand-50 dark:bg-brand-500/5 border-brand-200 dark:border-brand-800">
        <div className="grid place-items-center h-10 w-10 rounded-xl bg-brand-100 dark:bg-brand-500/10 text-brand-600 shrink-0"><QrCode size={20} /></div>
        <div>
          <p className="text-sm font-semibold">How it works</p>
          <p className="text-xs text-ink-600 dark:text-ink-300 mt-1">Your instructor displays a unique QR code at the start of each class. Scan it within the first 15 minutes to mark yourself present. Late scans are marked as late.</p>
        </div>
      </Card>
    </div>
  );
}
