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
  | 'profile'
  | 'placements'
  | 'assignments'
  | 'idcard'
  | 'hostel'
  | 'transport'
  | 'mess'
  | 'medical'
  | 'leave'
  | 'scholarship'
  | 'navigation'
  | 'qrattendance'
  | 'aiadvisor'
  | 'analytics';

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

// --- New feature types ---

export interface Placement {
  id: string;
  company: string;
  role: string;
  package: number;
  date: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  logo: string;
  rounds: { name: string; status: 'Cleared' | 'Pending' | 'Failed' }[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  code: string;
  due: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High';
  grade?: string;
  weight: number;
}

export interface HostelInfo {
  block: string;
  room: string;
  type: string;
  roommate: string;
  checkIn: string;
  fee: number;
  amenities: string[];
  maintenanceRequests: { id: string; issue: string; status: 'Open' | 'In Progress' | 'Resolved'; date: string };
}

export interface TransportRoute {
  id: string;
  routeName: string;
  busNo: string;
  boarding: string;
  drop: string;
  departure: string;
  arrival: string;
  status: 'Active' | 'Inactive';
  fee: number;
}

export interface MessMenuItem {
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  followUp?: string;
}

export interface LeaveApplication {
  id: string;
  type: string;
  from: string;
  to: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approver: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  status: 'Applied' | 'Awarded' | 'Rejected' | 'Eligible';
  deadline: string;
  criteria: string;
  provider: string;
}

export interface CampusPlace {
  id: string;
  name: string;
  type: string;
  block: string;
  floor: number;
  distance: string;
  icon: string;
}

export interface AnalyticsPrediction {
  course: string;
  code: string;
  predictedGrade: string;
  predictedGPA: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  risk: 'low' | 'medium' | 'high';
  factors: string[];
}
