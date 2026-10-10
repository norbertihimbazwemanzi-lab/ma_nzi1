import { DEVELOPER_INFO, PROJECTS } from "../src/data/portfolioData.js";

export const DEFAULT_DEVELOPER_INFO = {
  ...DEVELOPER_INFO,
  id: "current",
  avatarUrl: "/src/assets/images/developer_portrait_1791620332954.jpg",
};

export const DEFAULT_PROJECTS = PROJECTS.map((proj, idx) => ({
  ...proj,
  orderIndex: idx,
}));

export const INITIAL_STUDENTS_DATA = [
  { regNo: 'RND-2025-0101', name: 'Keza Aline', className: 'Senior 4 PCM', guardian: 'Mukamana Marie', phone: '+250 788 123 456', tuitionTotal: 210000, tuitionPaid: 210000, status: 'Active' },
  { regNo: 'RND-2025-0102', name: 'Mugisha David', className: 'Senior 4 PCM', guardian: 'Habimana Jean', phone: '+250 788 234 567', tuitionTotal: 210000, tuitionPaid: 150000, status: 'Active' },
  { regNo: 'RND-2025-0103', name: 'Uwase Diane', className: 'Senior 3 A', guardian: 'Kayitesi Chantal', phone: '+250 788 345 678', tuitionTotal: 185000, tuitionPaid: 185000, status: 'Active' },
  { regNo: 'RND-2025-0104', name: 'Niyonzima Eric', className: 'Senior 3 A', guardian: 'Bizimana Claude', phone: '+250 788 456 789', tuitionTotal: 185000, tuitionPaid: 90000, status: 'Active' },
  { regNo: 'RND-2025-0105', name: 'Ishimwe Patrick', className: 'Senior 5 MCB', guardian: 'Gasana Emmanuel', phone: '+250 788 567 890', tuitionTotal: 230000, tuitionPaid: 230000, status: 'Active' },
  { regNo: 'RND-2025-0106', name: 'Mutoni Grace', className: 'Senior 5 MCB', guardian: 'Mukandori Solange', phone: '+250 788 678 901', tuitionTotal: 230000, tuitionPaid: 115000, status: 'Active' },
];

export const INITIAL_GRADES_DATA = [
  { subject: 'Mathematics (Advanced)', teacher: 'Mr. Nkurunziza', coursework: 36, exam: 54 },
  { subject: 'Physics & Lab', teacher: 'Mrs. Mukamazimpaka', coursework: 34, exam: 51 },
  { subject: 'Chemistry', teacher: 'Mr. Kalisa', coursework: 35, exam: 53 },
  { subject: 'ICT & Programming', teacher: 'Mr. Manzi Norbert', coursework: 39, exam: 58 },
  { subject: 'English & Communication', teacher: 'Ms. Uwamahoro', coursework: 32, exam: 48 },
];
