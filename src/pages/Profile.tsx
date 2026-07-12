import { student } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import {
  Mail, Phone, MapPin, Calendar, Droplet, Home, User, GraduationCap, Award, BookOpen,
  Users, Landmark, Building2, CreditCard, Wallet, Copy, CheckCircle2, Star, Heart,
} from 'lucide-react';
import { useState } from 'react';

const catColor: Record<string, string> = {
  Technical: 'brand', Cultural: 'violet', Sports: 'accent', Hobby: 'emerald',
};

export function Profile() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const info = [
    { icon: Mail, label: 'Email', value: student.email },
    { icon: Phone, label: 'Phone', value: student.phone },
    { icon: GraduationCap, label: 'Program', value: student.program },
    { icon: BookOpen, label: 'School', value: student.school },
    { icon: MapPin, label: 'Campus', value: student.campus },
    { icon: Calendar, label: 'Batch', value: student.batch },
    { icon: User, label: 'Faculty Advisor', value: student.advisor },
    { icon: Home, label: 'Hostel', value: `${student.hostel} · ${student.room}` },
    { icon: Droplet, label: 'Blood Group', value: student.bloodGroup },
    { icon: Calendar, label: 'Date of Birth', value: student.dob },
  ];

  const bankRows = [
    { icon: Landmark, label: 'Bank', value: student.bank.bankName },
    { icon: User, label: 'Account Holder', value: student.bank.accountName },
    { icon: CreditCard, label: 'Account Number', value: student.bank.accountNumber, copy: true, id: 'acc' },
    { icon: Building2, label: 'IFSC Code', value: student.bank.ifsc, copy: true, id: 'ifsc' },
    { icon: MapPin, label: 'Branch', value: student.bank.branch },
    { icon: Wallet, label: 'UPI ID', value: student.bank.upiId, copy: true, id: 'upi' },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Profile" subtitle="Your personal, academic, family and financial information." />

      {/* Banner card */}
      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <img src={student.avatar} alt="" className="h-24 w-24 rounded-2xl border-4 border-white dark:border-ink-900 object-cover shadow-soft" />
            <div className="flex-1 min-w-0 pb-1">
              <h2 className="font-display text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">{student.regNo} · {student.program}</p>
            </div>
            <div className="flex gap-2">
              <Badge color="brand"><Award size={12} /> CGPA {student.cgpa.toFixed(2)}</Badge>
              <Badge color="emerald">{student.creditsCompleted} credits</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal information */}
      <Card className="p-6">
        <h3 className="font-display font-bold text-base mb-4">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          {info.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 shrink-0">
                <f.icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-ink-500 dark:text-ink-400">{f.label}</p>
                <p className="text-sm font-medium truncate">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Address */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Home size={18} />
          </div>
          <h3 className="font-display font-bold text-base">Address</h3>
        </div>
        <div className="rounded-xl border border-ink-200 dark:border-ink-800 p-4">
          <p className="text-sm font-medium">{student.address.line1}</p>
          <p className="text-sm text-ink-600 dark:text-ink-300">{student.address.line2}</p>
          <p className="text-sm text-ink-600 dark:text-ink-300 mt-1">
            {student.address.city}, {student.address.state} — {student.address.pincode}
          </p>
          <p className="text-sm text-ink-600 dark:text-ink-300">{student.address.country}</p>
        </div>
      </Card>

      {/* Family history */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400">
            <Users size={18} />
          </div>
          <h3 className="font-display font-bold text-base">Family Details</h3>
        </div>
        <div className="space-y-3">
          {student.family.map((fam) => (
            <div key={fam.id} className="rounded-xl border border-ink-200 dark:border-ink-800 p-4 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shrink-0">
                    <Heart size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{fam.name}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{fam.relation} · {fam.occupation}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-500 dark:text-ink-400 pl-13">
                <span className="flex items-center gap-1.5"><Phone size={12} /> {fam.phone}</span>
                <span className="flex items-center gap-1.5"><Mail size={12} /> {fam.email}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bank account */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Landmark size={18} />
          </div>
          <h3 className="font-display font-bold text-base">Bank Account Details</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          {bankRows.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 shrink-0">
                <b.icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-500 dark:text-ink-400">{b.label}</p>
                <p className="text-sm font-medium truncate">{b.value}</p>
              </div>
              {b.copy && (
                <button
                  onClick={() => copy(b.value, b.id!)}
                  className="btn-ghost !p-2 shrink-0"
                  aria-label={`Copy ${b.label}`}
                >
                  {copied === b.id ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
          <span>Bank details are used for fee refunds, scholarships and stipends. Keep them updated with the Accounts office.</span>
        </div>
      </Card>

      {/* Club enrollment */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Star size={18} />
            </div>
            <h3 className="font-display font-bold text-base">Club Enrollments</h3>
          </div>
          <Badge color="ink">{student.clubs.filter((c) => c.active).length} active</Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {student.clubs.map((c) => (
            <div
              key={c.id}
              className={`rounded-xl border p-4 transition-colors ${c.active ? 'border-ink-200 dark:border-ink-800 hover:border-brand-300 dark:hover:border-brand-700' : 'border-ink-200 dark:border-ink-800 opacity-60'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{c.role} · Joined {c.joined}</p>
                </div>
                <Badge color={catColor[c.category]}>{c.category}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {c.active ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-ink-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-400" /> Inactive
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
