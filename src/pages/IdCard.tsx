import { student } from '../data';
import { Card, SectionHeader } from '../components/ui';
import { Download, QrCode, Shield } from 'lucide-react';

export function IdCard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Digital ID Card" subtitle="Your campus identity — present it at gates, library and events."
        action={<button className="btn-primary !text-sm"><Download size={16} /> Download</button>} />

      <div className="flex justify-center">
        {/* ID Card */}
        <div className="w-full max-w-md">
          {/* Front */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 p-5 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 font-display font-bold">V</div>
                  <div>
                    <p className="font-display font-bold text-sm leading-none">VIT Chennai</p>
                    <p className="text-[10px] text-white/70 mt-0.5">Student Identity Card</p>
                  </div>
                </div>
                <Shield size={20} className="text-white/60" />
              </div>
            </div>

            <div className="p-5">
              <div className="flex gap-4">
                <img src={student.avatar} alt="" className="h-28 w-24 rounded-xl object-cover border-2 border-ink-200 dark:border-ink-700" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg font-bold">{student.name}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 font-mono mt-0.5">{student.regNo}</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p className="text-ink-600 dark:text-ink-300"><span className="text-ink-400">Program:</span> {student.program}</p>
                    <p className="text-ink-600 dark:text-ink-300"><span className="text-ink-400">School:</span> {student.school}</p>
                    <p className="text-ink-600 dark:text-ink-300"><span className="text-ink-400">Batch:</span> {student.batch}</p>
                    <p className="text-ink-600 dark:text-ink-300"><span className="text-ink-400">Blood:</span> {student.bloodGroup}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-ink-200 dark:border-ink-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-ink-400 uppercase tracking-wider">Valid through</p>
                  <p className="text-sm font-semibold">May 2027</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <Shield size={14} /> Verified
                </div>
              </div>
            </div>

            {/* QR strip */}
            <div className="bg-ink-50 dark:bg-ink-800/50 p-4 flex items-center gap-4">
              <div className="grid place-items-center h-16 w-16 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
                <QrCode size={40} className="text-ink-800 dark:text-ink-200" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold">Scan for verification</p>
                <p className="text-[10px] text-ink-500 dark:text-ink-400 mt-0.5">Use campus gates or library scanners to check in with this QR code.</p>
              </div>
            </div>
          </Card>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="btn-outline"><QrCode size={16} /> Show QR</button>
            <button className="btn-outline"><Download size={16} /> Save PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
