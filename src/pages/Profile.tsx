import { student } from '../data';
import { Card, SectionHeader, Badge } from '../components/ui';
import { Mail, Phone, MapPin, Calendar, Droplet, Home, User, GraduationCap, Award, BookOpen } from 'lucide-react';

export function Profile() {
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

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionHeader title="Profile" subtitle="Your personal and academic information." />

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
    </div>
  );
}
