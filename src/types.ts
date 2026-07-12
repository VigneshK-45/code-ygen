export type PageId =
  | 'dashboard'
  | 'attendance'
  | 'timetable'
  | 'academics'
  | 'courses'
  | 'fees'
  | 'feedback'
  | 'notifications'
  | 'events'
  | 'lostfound'
  | 'assistant'
  | 'profile';

export interface Student {
  id: string;
  name: string;
  regNo: string;
  email: string;
  phone: string;
  program: string;
  school: string;
  campus: string;
  batch: string;
  cgpa: number;
  creditsCompleted: number;
  creditsTotal: number;
  advisor: string;
  hostel: string;
  room: string;
  bloodGroup: string;
  dob: string;
  avatar: string;
  address: Address;
  family: FamilyMember[];
  bank: BankAccount;
  clubs: ClubEnrollment[];
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface FamilyMember {
  id: string;
  relation: string;
  name: string;
  occupation: string;
  phone: string;
  email: string;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  upiId: string;
}

export interface ClubEnrollment {
  id: string;
  name: string;
  role: string;
  joined: string;
  category: string;
  active: boolean;
}

export interface Course {
  code: string;
  title: string;
  faculty: string;
  credits: number;
  type: 'Theory' | 'Lab' | 'Project';
  slot: string;
  room: string;
  progress: number;
  color: string;
}

export interface AttendanceRecord {
  code: string;
  title: string;
  attended: number;
  total: number;
}

export interface TimetableSlot {
  day: string;
  start: string;
  end: string;
  code: string;
  title: string;
  faculty: string;
  room: string;
  color: string;
}

export interface GradeRow {
  code: string;
  title: string;
  credits: number;
  grade: string;
  gradePoint: number;
  semester: string;
}

export interface FeeItem {
  id: string;
  description: string;
  amount: number;
  due: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  category: 'Academic' | 'Fee' | 'Event' | 'General';
  read: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  club: string;
  category: string;
  image: string;
  description: string;
  going: number;
}

export interface LostFoundItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: 'Lost' | 'Found';
  description: string;
  contact: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  course: string;
  code: string;
  submitted: boolean;
}
