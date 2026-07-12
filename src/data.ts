import type {
  Student,
  Course,
  AttendanceRecord,
  TimetableSlot,
  GradeRow,
  FeeItem,
  NotificationItem,
  EventItem,
  LostFoundItem,
  FacultyMember,
  Placement,
  Assignment,
  HostelInfo,
  TransportRoute,
  MessMenuItem,
  MedicalRecord,
  LeaveApplication,
  Scholarship,
  CampusPlace,
  AnalyticsPrediction,
} from './types';

export const student: Student = {
  id: '1',
  name: 'Arjun Mehta',
  regNo: '23BCE1142',
  email: 'arjun.mehta2023@vitstudent.ac.in',
  phone: '+91 98765 43210',
  program: 'B.Tech Computer Science & Engineering',
  school: 'SCOPE',
  campus: 'Chennai',
  batch: '2023–2027',
  cgpa: 8.74,
  creditsCompleted: 96,
  creditsTotal: 160,
  advisor: 'Dr. Kavitha Rajan',
  hostel: 'M Block — Men\'s Hostel',
  room: 'M-214',
  bloodGroup: 'B+',
  dob: '14 March 2005',
  avatar: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=400',
  address: {
    line1: '42, Brindavan Nagar',
    line2: 'Near Anna Arch, K.K. Pudur',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641038',
    country: 'India',
  },
  family: [
    { id: 'fam1', relation: 'Father', name: 'Mr. Suresh Mehta', occupation: 'Senior Manager, TCS', phone: '+91 98765 11111', email: 'suresh.mehta@gmail.com' },
    { id: 'fam2', relation: 'Mother', name: 'Mrs. Anjali Mehta', occupation: 'School Teacher', phone: '+91 98765 22222', email: 'anjali.mehta@gmail.com' },
    { id: 'fam3', relation: 'Guardian', name: 'Mr. Rajesh Mehta', occupation: 'Business Owner', phone: '+91 98765 33333', email: 'rajesh.mehta@gmail.com' },
  ],
  bank: {
    bankName: 'HDFC Bank',
    accountName: 'Arjun Mehta',
    accountNumber: '5010 **** **** 2847',
    ifsc: 'HDFC0001245',
    branch: 'VIT Chennai Campus Branch',
    upiId: 'arjunmehta@hdfcbank',
  },
  clubs: [
    { id: 'c1', name: 'CSI Student Chapter', role: 'Technical Lead', joined: 'Aug 2023', category: 'Technical', active: true },
    { id: 'c2', name: 'AI/ML Club', role: 'Member', joined: 'Sep 2023', category: 'Technical', active: true },
    { id: 'c3', name: 'Dance Club — Vortex', role: 'Core Member', joined: 'Oct 2023', category: 'Cultural', active: true },
    { id: 'c4', name: 'Sports Board — Football', role: 'Member', joined: 'Jan 2024', category: 'Sports', active: true },
    { id: 'c5', name: 'Photography Club', role: 'Member', joined: 'Aug 2023', category: 'Hobby', active: false },
  ],
};

export const courses: Course[] = [
  { code: 'CSE3001', title: 'Database Management Systems', faculty: 'Dr. Kavitha Rajan', credits: 4, type: 'Theory', slot: 'A1', room: 'SJT-301', progress: 72, color: 'brand' },
  { code: 'CSE3002', title: 'Operating Systems', faculty: 'Prof. Ramesh Iyer', credits: 4, type: 'Theory', slot: 'B1', room: 'SJT-205', progress: 68, color: 'accent' },
  { code: 'CSE3003', title: 'Computer Networks', faculty: 'Dr. Sunita Menon', credits: 3, type: 'Theory', slot: 'C1', room: 'TT-110', progress: 81, color: 'emerald' },
  { code: 'CSE3004', title: 'DBMS Laboratory', faculty: 'Dr. Kavitha Rajan', credits: 2, type: 'Lab', slot: 'L1', room: 'SJT-Lab-4', progress: 90, color: 'violet' },
  { code: 'CSE3005', title: 'Software Engineering', faculty: 'Prof. Anil Kumar', credits: 3, type: 'Theory', slot: 'D1', room: 'SJT-112', progress: 64, color: 'rose' },
  { code: 'CSE3006', title: 'Technical Communication', faculty: 'Dr. Priya Singh', credits: 2, type: 'Theory', slot: 'E1', room: 'CD-204', progress: 88, color: 'amber' },
];

export const attendance: AttendanceRecord[] = [
  { code: 'CSE3001', title: 'Database Management Systems', attended: 38, total: 42 },
  { code: 'CSE3002', title: 'Operating Systems', attended: 31, total: 40 },
  { code: 'CSE3003', title: 'Computer Networks', attended: 35, total: 38 },
  { code: 'CSE3004', title: 'DBMS Laboratory', attended: 14, total: 14 },
  { code: 'CSE3005', title: 'Software Engineering', attended: 29, total: 36 },
  { code: 'CSE3006', title: 'Technical Communication', attended: 22, total: 24 },
];

export const timetable: TimetableSlot[] = [
  { day: 'Mon', start: '08:00', end: '08:50', code: 'CSE3001', title: 'DBMS', faculty: 'Dr. Kavitha', room: 'SJT-301', color: 'brand' },
  { day: 'Mon', start: '09:00', end: '09:50', code: 'CSE3002', title: 'OS', faculty: 'Prof. Iyer', room: 'SJT-205', color: 'accent' },
  { day: 'Mon', start: '10:00', end: '11:30', code: 'CSE3004', title: 'DBMS Lab', faculty: 'Dr. Kavitha', room: 'SJT-Lab-4', color: 'violet' },
  { day: 'Mon', start: '14:00', end: '14:50', code: 'CSE3005', title: 'SE', faculty: 'Prof. Anil', room: 'SJT-112', color: 'rose' },
  { day: 'Tue', start: '08:00', end: '08:50', code: 'CSE3003', title: 'Networks', faculty: 'Dr. Menon', room: 'TT-110', color: 'emerald' },
  { day: 'Tue', start: '09:00', end: '09:50', code: 'CSE3001', title: 'DBMS', faculty: 'Dr. Kavitha', room: 'SJT-301', color: 'brand' },
  { day: 'Tue', start: '11:00', end: '11:50', code: 'CSE3006', title: 'Tech Comm', faculty: 'Dr. Priya', room: 'CD-204', color: 'amber' },
  { day: 'Tue', start: '14:00', end: '14:50', code: 'CSE3002', title: 'OS', faculty: 'Prof. Iyer', room: 'SJT-205', color: 'accent' },
  { day: 'Wed', start: '08:00', end: '08:50', code: 'CSE3005', title: 'SE', faculty: 'Prof. Anil', room: 'SJT-112', color: 'rose' },
  { day: 'Wed', start: '09:00', end: '09:50', code: 'CSE3003', title: 'Networks', faculty: 'Dr. Menon', room: 'TT-110', color: 'emerald' },
  { day: 'Wed', start: '10:00', end: '11:30', code: 'CSE3004', title: 'DBMS Lab', faculty: 'Dr. Kavitha', room: 'SJT-Lab-4', color: 'violet' },
  { day: 'Thu', start: '08:00', end: '08:50', code: 'CSE3002', title: 'OS', faculty: 'Prof. Iyer', room: 'SJT-205', color: 'accent' },
  { day: 'Thu', start: '09:00', end: '09:50', code: 'CSE3001', title: 'DBMS', faculty: 'Dr. Kavitha', room: 'SJT-301', color: 'brand' },
  { day: 'Thu', start: '11:00', end: '11:50', code: 'CSE3006', title: 'Tech Comm', faculty: 'Dr. Priya', room: 'CD-204', color: 'amber' },
  { day: 'Thu', start: '14:00', end: '14:50', code: 'CSE3003', title: 'Networks', faculty: 'Dr. Menon', room: 'TT-110', color: 'emerald' },
  { day: 'Fri', start: '08:00', end: '08:50', code: 'CSE3005', title: 'SE', faculty: 'Prof. Anil', room: 'SJT-112', color: 'rose' },
  { day: 'Fri', start: '09:00', end: '09:50', code: 'CSE3001', title: 'DBMS', faculty: 'Dr. Kavitha', room: 'SJT-301', color: 'brand' },
  { day: 'Fri', start: '10:00', end: '11:30', code: 'CSE3004', title: 'DBMS Lab', faculty: 'Dr. Kavitha', room: 'SJT-Lab-4', color: 'violet' },
  { day: 'Fri', start: '14:00', end: '14:50', code: 'CSE3002', title: 'OS', faculty: 'Prof. Iyer', room: 'SJT-205', color: 'accent' },
];

export const grades: GradeRow[] = [
  { code: 'CSE2001', title: 'Data Structures & Algorithms', credits: 4, grade: 'A', gradePoint: 9, semester: 'Sem 3' },
  { code: 'CSE2002', title: 'Object Oriented Programming', credits: 3, grade: 'A+', gradePoint: 10, semester: 'Sem 3' },
  { code: 'MAT2001', title: 'Discrete Mathematics', credits: 4, grade: 'B+', gradePoint: 8, semester: 'Sem 3' },
  { code: 'CSE2003', title: 'Digital Logic Design', credits: 3, grade: 'A', gradePoint: 9, semester: 'Sem 3' },
  { code: 'ENG2001', title: 'Communication Skills', credits: 2, grade: 'A+', gradePoint: 10, semester: 'Sem 3' },
  { code: 'CSE1001', title: 'Programming in C', credits: 4, grade: 'A+', gradePoint: 10, semester: 'Sem 2' },
  { code: 'MAT1001', title: 'Calculus', credits: 4, grade: 'A', gradePoint: 9, semester: 'Sem 2' },
  { code: 'PHY1001', title: 'Engineering Physics', credits: 3, grade: 'B+', gradePoint: 8, semester: 'Sem 2' },
  { code: 'CHM1001', title: 'Engineering Chemistry', credits: 3, grade: 'A', gradePoint: 9, semester: 'Sem 1' },
  { code: 'MAT1002', title: 'Linear Algebra', credits: 4, grade: 'A+', gradePoint: 10, semester: 'Sem 1' },
];

export const fees: FeeItem[] = [
  { id: 'f1', description: 'Tuition Fee — Sem 4', amount: 98700, due: '2025-08-15', status: 'Pending', category: 'Tuition' },
  { id: 'f2', description: 'Hostel Fee — Sem 4', amount: 42500, due: '2025-08-15', status: 'Pending', category: 'Hostel' },
  { id: 'f3', description: 'Examination Fee', amount: 1200, due: '2025-09-01', status: 'Pending', category: 'Exam' },
  { id: 'f4', description: 'Tuition Fee — Sem 3', amount: 98700, due: '2025-01-15', status: 'Paid', category: 'Tuition' },
  { id: 'f5', description: 'Hostel Fee — Sem 3', amount: 42500, due: '2025-01-15', status: 'Paid', category: 'Hostel' },
  { id: 'f6', description: 'Library Fine', amount: 250, due: '2024-12-10', status: 'Overdue', category: 'Misc' },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'CAT-1 Results Published', body: 'DBMS (CSE3001) CAT-1 marks are now available. Check the Academics tab.', time: '2h ago', category: 'Academic', read: false },
  { id: 'n2', title: 'Fee Payment Reminder', body: 'Sem 4 tuition fee of ₹98,700 is due on 15 Aug 2025.', time: '5h ago', category: 'Fee', read: false },
  { id: 'n3', title: 'Riviera Cultural Fest', body: 'Registrations for Riviera 2025 are now open. Early bird closes this Friday.', time: '1d ago', category: 'Event', read: false },
  { id: 'n4', title: 'Class Rescheduled', body: 'CSE3002 (OS) on Thursday is moved to TT-208.', time: '1d ago', category: 'Academic', read: true },
  { id: 'n5', title: 'Hostel Maintenance', body: 'Water supply will be unavailable in M Block on Sunday, 9 AM–12 PM.', time: '2d ago', category: 'General', read: true },
  { id: 'n6', title: 'Library Book Due', body: '"Designing Data-Intensive Applications" is due tomorrow. Return to avoid fine.', time: '3d ago', category: 'General', read: true },
];

export const events: EventItem[] = [
  { id: 'e1', title: 'Riviera 2025', date: 'Sep 18', time: '5:00 PM', venue: 'Main Ground', club: 'Cultural Club', category: 'Cultural', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'The annual cultural extravaganza — music, dance, drama and more.', going: 1240 },
  { id: 'e2', title: 'HackVerse 24-Hour Hackathon', date: 'Aug 30', time: '9:00 AM', venue: 'SJT Auditorium', club: 'CSI Student Chapter', category: 'Technical', image: 'https://images.pexels.com/photos/7988077/pexels-photo-7988077.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Build, break and ship in 24 hours. ₹50K prize pool.', going: 540 },
  { id: 'e3', title: 'AI Talk: LLMs in Production', date: 'Aug 22', time: '4:00 PM', venue: 'TT Auditorium', club: 'AI/ML Club', category: 'Talk', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Industry leaders discuss deploying large language models at scale.', going: 320 },
  { id: 'e4', title: 'Inter-Hostel Football', date: 'Aug 28', time: '6:00 PM', venue: 'Sports Complex', club: 'Sports Board', category: 'Sports', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'M Block vs N Block — derby night under floodlights.', going: 210 },
];

export const lostFound: LostFoundItem[] = [
  { id: 'lf1', title: 'Black Leather Wallet', category: 'Wallet', location: 'SJT Canteen', date: 'Aug 12', status: 'Found', description: 'Found near the canteen counter. Contains cards in the name of "R. Sharma".', contact: 'Security Office, SJT' },
  { id: 'lf2', title: 'OnePlus Earbuds (White)', category: 'Electronics', location: 'Library — 2nd Floor', date: 'Aug 11', status: 'Lost', description: 'Lost near the discussion room. Please contact if found.', contact: '23BCE1024@vitstudent.ac.in' },
  { id: 'lf3', title: 'Hydro Flask Water Bottle', category: 'Accessories', location: 'TT Block', date: 'Aug 10', status: 'Found', description: 'Blue 1L bottle found in TT-110 after Networks class.', contact: 'Security Office, TT' },
  { id: 'lf4', title: 'Engineering Drawing Notebook', category: 'Stationery', location: 'M Block Hostel', date: 'Aug 09', status: 'Lost', description: 'Contains Sem 2 ED notes. Name written on first page.', contact: '23BCE1188@vitstudent.ac.in' },
];

export const facultyFeedback: FacultyMember[] = [
  { id: 'fb1', name: 'Dr. Kavitha Rajan', course: 'DBMS', code: 'CSE3001', submitted: true },
  { id: 'fb2', name: 'Prof. Ramesh Iyer', course: 'Operating Systems', code: 'CSE3002', submitted: false },
  { id: 'fb3', name: 'Dr. Sunita Menon', course: 'Computer Networks', code: 'CSE3003', submitted: false },
  { id: 'fb4', name: 'Prof. Anil Kumar', course: 'Software Engineering', code: 'CSE3005', submitted: false },
  { id: 'fb5', name: 'Dr. Priya Singh', course: 'Technical Communication', code: 'CSE3006', submitted: true },
];

export const assistantSuggestions = [
  'What\'s my attendance in OS?',
  'When is my next class?',
  'How much fee is pending?',
  'Show my CGPA trend',
];

// --- Placements ---
export const placements: Placement[] = [
  {
    id: 'p1', company: 'Google', role: 'Software Engineer (STEP)', package: 28, date: '2025-09-10',
    status: 'Interview', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200',
    rounds: [{ name: 'Online Assessment', status: 'Cleared' }, { name: 'Technical Round 1', status: 'Cleared' }, { name: 'Technical Round 2', status: 'Pending' }, { name: 'HR Round', status: 'Pending' }],
  },
  {
    id: 'p2', company: 'Microsoft', role: 'SDE Intern', package: 25, date: '2025-08-28',
    status: 'Shortlisted', logo: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=200',
    rounds: [{ name: 'Online Assessment', status: 'Cleared' }, { name: 'Group Discussion', status: 'Pending' }, { name: 'Technical Interview', status: 'Pending' }],
  },
  {
    id: 'p3', company: 'Amazon', role: 'SDE-1', package: 32, date: '2025-08-15',
    status: 'Rejected', logo: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200',
    rounds: [{ name: 'Online Assessment', status: 'Cleared' }, { name: 'Technical Round', status: 'Failed' }],
  },
  {
    id: 'p4', company: 'Goldman Sachs', role: 'Technology Analyst', package: 22, date: '2025-09-20',
    status: 'Applied', logo: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=200',
    rounds: [{ name: 'Online Assessment', status: 'Pending' }],
  },
  {
    id: 'p5', company: 'Atlassian', role: 'Software Engineer', package: 30, date: '2025-09-05',
    status: 'Offered', logo: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=200',
    rounds: [{ name: 'Online Assessment', status: 'Cleared' }, { name: 'Technical Round 1', status: 'Cleared' }, { name: 'Technical Round 2', status: 'Cleared' }, { name: 'HR Round', status: 'Cleared' }],
  },
];

// --- Assignments ---
export const assignments: Assignment[] = [
  { id: 'a1', title: 'DBMS Project — Normalization', course: 'DBMS', code: 'CSE3001', due: '2025-08-20', status: 'Pending', priority: 'High', weight: 15 },
  { id: 'a2', title: 'OS Case Study — Process Scheduling', course: 'Operating Systems', code: 'CSE3002', due: '2025-08-18', status: 'Pending', priority: 'High', weight: 10 },
  { id: 'a3', title: 'Networks Lab Report — TCP/IP', course: 'Computer Networks', code: 'CSE3003', due: '2025-08-22', status: 'Submitted', priority: 'Medium', weight: 8 },
  { id: 'a4', title: 'SE Assignment — UML Diagrams', course: 'Software Engineering', code: 'CSE3005', due: '2025-08-12', status: 'Overdue', priority: 'High', weight: 12 },
  { id: 'a5', title: 'Tech Comm Essay — Research Paper', course: 'Technical Communication', code: 'CSE3006', due: '2025-08-05', status: 'Graded', priority: 'Low', weight: 10, grade: 'A' },
  { id: 'a6', title: 'DBMS Lab — SQL Queries Set 4', course: 'DBMS Lab', code: 'CSE3004', due: '2025-08-25', status: 'Pending', priority: 'Medium', weight: 5 },
];

// --- Hostel ---
export const hostelInfo: HostelInfo = {
  block: 'M Block — Men\'s Hostel',
  room: 'M-214',
  type: 'Triple Sharing (AC)',
  roommate: 'Karthik Reddy, Siddharth Nair',
  checkIn: 'Aug 2023',
  fee: 42500,
  amenities: ['Wi-Fi', 'AC', 'Geyser', 'Study Table', 'Washing Machine', '24/7 Security'],
  maintenanceRequests: { id: 'm1', issue: 'Leaking bathroom tap', status: 'In Progress', date: '2025-08-10' },
};

// --- Transport ---
export const transportRoutes: TransportRoute[] = [
  { id: 'tr1', routeName: 'VIT → Tambaram', busNo: 'VIT-012', boarding: 'Main Gate', drop: 'Tambaram Bus Stand', departure: '05:30 PM', arrival: '06:15 PM', status: 'Active', fee: 18000 },
  { id: 'tr2', routeName: 'VIT → T-Nagar', busNo: 'VIT-007', boarding: 'Main Gate', drop: 'T-Nagar', departure: '05:00 PM', arrival: '06:00 PM', status: 'Active', fee: 20000 },
  { id: 'tr3', routeName: 'VIT → Guindy', busNo: 'VIT-019', boarding: 'Main Gate', drop: 'Guindy', departure: '05:15 PM', arrival: '06:30 PM', status: 'Inactive', fee: 22000 },
];

// --- Mess Menu ---
export const messMenu: MessMenuItem[] = [
  { day: 'Monday', breakfast: 'Idli, Sambar, Chutney, Tea', lunch: 'Rice, Dal, Paneer Butter Masala, Roti, Curd', snacks: 'Samosa, Tea', dinner: 'Rice, Chicken Curry, Roti, Salad' },
  { day: 'Tuesday', breakfast: 'Poha, Boiled Eggs, Tea', lunch: 'Rice, Sambar, Aloo Gobi, Roti, Buttermilk', snacks: 'Bhel Puri, Tea', dinner: 'Rice, Dal Makhani, Roti, Pickle' },
  { day: 'Wednesday', breakfast: 'Masala Dosa, Chutney, Tea', lunch: 'Rice, Rajma, Mixed Veg, Roti, Curd', snacks: 'Vada Pav, Tea', dinner: 'Rice, Egg Curry, Roti, Salad' },
  { day: 'Thursday', breakfast: 'Aloo Paratha, Curd, Tea', lunch: 'Rice, Chana Masala, Bhindi, Roti, Curd', snacks: 'Pasta, Tea', dinner: 'Rice, Mutton Curry, Roti, Salad' },
  { day: 'Friday', breakfast: 'Upma, Banana, Tea', lunch: 'Rice, Dal, Gobi Manchurian, Roti, Curd', snacks: 'Pav Bhaji, Tea', dinner: 'Rice, Fish Curry, Roti, Salad' },
  { day: 'Saturday', breakfast: 'Puri Bhaji, Tea', lunch: 'Rice, Dal Tadka, Aloo Matar, Roti, Curd', snacks: 'Cutlet, Tea', dinner: 'Rice, Chicken Biryani, Raita' },
  { day: 'Sunday', breakfast: 'Chole Bhature, Tea', lunch: 'Rice, Sambar, Paneer Tikka, Roti, Curd', snacks: 'Noodles, Tea', dinner: 'Rice, Veg Korma, Roti, Ice Cream' },
];

// --- Medical Records ---
export const medicalRecords: MedicalRecord[] = [
  { id: 'mr1', date: '2025-07-15', type: 'General Checkup', doctor: 'Dr. Suresh (Campus Clinic)', diagnosis: 'Mild fever, common cold', prescription: 'Paracetamol 500mg (2x/day), Rest 3 days', followUp: '2025-07-18' },
  { id: 'mr2', date: '2025-03-22', type: 'Sports Injury', doctor: 'Dr. Nisha (Physio)', diagnosis: 'Sprained right ankle', prescription: 'Ice pack, ankle support, rest 1 week', followUp: '2025-03-29' },
  { id: 'mr3', date: '2025-01-10', type: 'Vaccination', doctor: 'Campus Clinic', diagnosis: 'Annual flu shot', prescription: 'None' },
  { id: 'mr4', date: '2024-09-05', type: 'Allergy', doctor: 'Dr. Suresh (Campus Clinic)', diagnosis: 'Dust allergy', prescription: 'Cetirizine 10mg as needed' },
];

// --- Leave Applications ---
export const leaveApplications: LeaveApplication[] = [
  { id: 'la1', type: 'Home Visit', from: '2025-08-25', to: '2025-08-28', reason: 'Family function in Coimbatore', status: 'Pending', appliedOn: '2025-08-12', approver: 'Warden — M Block' },
  { id: 'la2', type: 'Medical Leave', from: '2025-03-22', to: '2025-03-24', reason: 'Ankle sprain recovery', status: 'Approved', appliedOn: '2025-03-21', approver: 'Warden — M Block' },
  { id: 'la3', type: 'Academic', from: '2025-02-15', to: '2025-02-16', reason: 'Hackathon at IIT Madras', status: 'Approved', appliedOn: '2025-02-10', approver: 'Faculty Advisor' },
  { id: 'la4', type: 'Personal', from: '2024-12-20', to: '2024-12-22', reason: 'Personal work', status: 'Rejected', appliedOn: '2024-12-18', approver: 'Warden — M Block' },
];

// --- Scholarships ---
export const scholarships: Scholarship[] = [
  { id: 's1', name: 'VIT Merit Scholarship', amount: 50000, status: 'Awarded', deadline: '2025-01-31', criteria: 'CGPA > 8.5', provider: 'VIT University' },
  { id: 's2', name: 'TCS iON Scholarship', amount: 75000, status: 'Applied', deadline: '2025-09-30', criteria: 'CGPA > 9.0 + Project', provider: 'TCS Foundation' },
  { id: 's3', name: 'NSTSE Scholarship', amount: 25000, status: 'Eligible', deadline: '2025-10-15', criteria: 'Top 10% in NSTSE exam', provider: 'Unified Council' },
  { id: 's4', name: 'Infosys Foundation STEM', amount: 60000, status: 'Rejected', deadline: '2025-07-15', criteria: 'Female students in STEM', provider: 'Infosys Foundation' },
];

// --- Campus Navigation ---
export const campusPlaces: CampusPlace[] = [
  { id: 'cp1', name: 'SJT — Main Academic Block', type: 'Academic', block: 'SJT', floor: 0, distance: '200m', icon: 'building' },
  { id: 'cp2', name: 'Central Library', type: 'Library', block: 'Library', floor: 0, distance: '350m', icon: 'book' },
  { id: 'cp3', name: 'Food Court — Main Canteen', type: 'Food', block: 'Food Court', floor: 0, distance: '150m', icon: 'utensils' },
  { id: 'cp4', name: 'Sports Complex', type: 'Sports', block: 'Sports', floor: 0, distance: '500m', icon: 'trophy' },
  { id: 'cp5', name: 'Medical Center', type: 'Medical', block: 'Medical', floor: 0, distance: '400m', icon: 'heart' },
  { id: 'cp6', name: 'M Block Hostel', type: 'Hostel', block: 'M Block', floor: 2, distance: '600m', icon: 'home' },
  { id: 'cp7', name: 'Auditorium — TT', type: 'Auditorium', block: 'TT', floor: 0, distance: '300m', icon: 'music' },
  { id: 'cp8', name: 'ATM — SBI', type: 'Bank', block: 'Main Gate', floor: 0, distance: '700m', icon: 'credit' },
];

// --- Predictive Analytics ---
export const analyticsPredictions: AnalyticsPrediction[] = [
  { course: 'Database Management Systems', code: 'CSE3001', predictedGrade: 'A', predictedGPA: 9.1, confidence: 87, trend: 'up', risk: 'low', factors: ['High attendance (90%)', 'Strong CAT-1 score', 'Assignments on time'] },
  { course: 'Operating Systems', code: 'CSE3002', predictedGrade: 'B+', predictedGPA: 8.2, confidence: 72, trend: 'down', risk: 'medium', factors: ['Attendance at 77%', 'Overdue assignment', 'CAT-1 below average'] },
  { course: 'Computer Networks', code: 'CSE3003', predictedGrade: 'A+', predictedGPA: 9.5, confidence: 91, trend: 'up', risk: 'low', factors: ['92% attendance', 'Top CAT-1 score', 'Lab report submitted'] },
  { course: 'Software Engineering', code: 'CSE3005', predictedGrade: 'B', predictedGPA: 7.8, confidence: 65, trend: 'down', risk: 'high', factors: ['Attendance at 80%', 'Overdue assignment', 'Low quiz scores', 'Low class participation'] },
  { course: 'Technical Communication', code: 'CSE3006', predictedGrade: 'A+', predictedGPA: 9.8, confidence: 93, trend: 'stable', risk: 'low', factors: ['91% attendance', 'Essay graded A', 'Active participation'] },
];

