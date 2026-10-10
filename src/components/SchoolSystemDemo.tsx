import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Receipt, 
  Search, 
  Plus, 
  Printer, 
  MessageSquare, 
  Check, 
  ArrowRight,
  Sparkles,
  School,
  FileSpreadsheet
} from 'lucide-react';

interface Student {
  id: string;
  regNo: string;
  name: string;
  class: string;
  guardian: string;
  phone: string;
  tuitionTotal: number;
  tuitionPaid: number;
  status: 'Active' | 'On Leave';
}

interface GradeRecord {
  subject: string;
  teacher: string;
  coursework: number; // /40
  exam: number; // /60
}

const INITIAL_STUDENTS: Student[] = [
  { id: '1', regNo: 'RND-2025-0101', name: 'Keza Aline', class: 'Senior 4 PCM', guardian: 'Mukamana Marie', phone: '+250 788 123 456', tuitionTotal: 210000, tuitionPaid: 210000, status: 'Active' },
  { id: '2', regNo: 'RND-2025-0102', name: 'Mugisha David', class: 'Senior 4 PCM', guardian: 'Habimana Jean', phone: '+250 788 234 567', tuitionTotal: 210000, tuitionPaid: 150000, status: 'Active' },
  { id: '3', regNo: 'RND-2025-0103', name: 'Uwase Diane', class: 'Senior 3 A', guardian: 'Kayitesi Chantal', phone: '+250 788 345 678', tuitionTotal: 185000, tuitionPaid: 185000, status: 'Active' },
  { id: '4', regNo: 'RND-2025-0104', name: 'Niyonzima Eric', class: 'Senior 3 A', guardian: 'Bizimana Claude', phone: '+250 788 456 789', tuitionTotal: 185000, tuitionPaid: 90000, status: 'Active' },
  { id: '5', regNo: 'RND-2025-0105', name: 'Ishimwe Patrick', class: 'Senior 5 MCB', guardian: 'Gasana Emmanuel', phone: '+250 788 567 890', tuitionTotal: 230000, tuitionPaid: 230000, status: 'Active' },
  { id: '6', regNo: 'RND-2025-0106', name: 'Mutoni Grace', class: 'Senior 5 MCB', guardian: 'Mukandori Solange', phone: '+250 788 678 901', tuitionTotal: 230000, tuitionPaid: 115000, status: 'Active' },
];

export function SchoolSystemDemo() {
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'attendance' | 'fees'>('grades');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('1');

  // Grades state
  const [grades, setGrades] = useState<GradeRecord[]>([
    { subject: 'Mathematics (Advanced)', teacher: 'Mr. Nkurunziza', coursework: 36, exam: 54 },
    { subject: 'Physics & Lab', teacher: 'Mrs. Mukamazimpaka', coursework: 34, exam: 51 },
    { subject: 'Chemistry', teacher: 'Mr. Kalisa', coursework: 35, exam: 53 },
    { subject: 'ICT & Programming', teacher: 'Mr. Manzi Norbert', coursework: 39, exam: 58 },
    { subject: 'English & Communication', teacher: 'Ms. Uwamahoro', coursework: 32, exam: 48 },
  ]);
  const [showReportCardModal, setShowReportCardModal] = useState(false);

  // Attendance state
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'late' | 'absent' | 'excused'>>({
    '1': 'present',
    '2': 'present',
    '3': 'late',
    '4': 'absent',
    '5': 'present',
    '6': 'present',
  });
  const [smsSentAlert, setSmsSentAlert] = useState<string | null>(null);

  // Fee state
  const [paymentAmount, setPaymentAmount] = useState<string>('45000');
  const [paymentMethod, setPaymentMethod] = useState<'MTN Mobile Money' | 'Bank Transfer' | 'Cash'>('MTN Mobile Money');
  const [receiptSuccess, setReceiptSuccess] = useState<string | null>(null);

  // Add student state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('Senior 3 A');
  const [newStudentGuardian, setNewStudentGuardian] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('+250 78');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleUpdateGrade = (index: number, field: 'coursework' | 'exam', value: number) => {
    const updated = [...grades];
    const clamped = Math.max(0, Math.min(field === 'coursework' ? 40 : 60, isNaN(value) ? 0 : value));
    updated[index][field] = clamped;
    setGrades(updated);
  };

  const calculateGradeDetails = (cw: number, exam: number) => {
    const total = cw + exam;
    let letter = 'F';
    let remarks = 'Needs Improvement';
    if (total >= 80) { letter = 'A'; remarks = 'Distinction'; }
    else if (total >= 70) { letter = 'B'; remarks = 'Very Good'; }
    else if (total >= 60) { letter = 'C'; remarks = 'Credit'; }
    else if (total >= 50) { letter = 'D'; remarks = 'Pass'; }

    return { total, letter, remarks };
  };

  const totalPossible = grades.length * 100;
  const currentTotal = grades.reduce((acc, g) => acc + g.coursework + g.exam, 0);
  const averagePercentage = Math.round((currentTotal / totalPossible) * 100);

  const handleMarkAttendance = (id: string, status: 'present' | 'late' | 'absent' | 'excused') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSendAbsentSms = () => {
    const absentStudents = students.filter(s => attendance[s.id] === 'absent');
    if (absentStudents.length === 0) {
      setSmsSentAlert("All students are marked Present or Excused today! No absenteeism alerts needed.");
    } else {
      const names = absentStudents.map(s => s.name).join(', ');
      setSmsSentAlert(`Automated SMS gateway dispatched to guardians of: ${names}. "Notice: Your child was recorded absent this morning at school register."`);
    }
    setTimeout(() => setSmsSentAlert(null), 6000);
  };

  // Load persisted school data from database if available
  useEffect(() => {
    let isMounted = true;
    fetch('/api/school')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted || !data?.success) return;
        if (Array.isArray(data.students) && data.students.length > 0) {
          const mapped: Student[] = data.students.map((s: any) => ({
            id: String(s.id),
            regNo: s.regNo || s.reg_no,
            name: s.name,
            class: s.className || s.class_name || s.class || 'Senior 3 A',
            guardian: s.guardian,
            phone: s.phone,
            tuitionTotal: s.tuitionTotal ?? s.tuition_total ?? 185000,
            tuitionPaid: s.tuitionPaid ?? s.tuition_paid ?? 0,
            status: s.status || 'Active',
          }));
          setStudents(mapped);
        }
      })
      .catch((err) => console.warn('School API local fallback active:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(paymentAmount);
    if (!amountNum || amountNum <= 0) return;

    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        const newPaid = Math.min(s.tuitionTotal, s.tuitionPaid + amountNum);
        return { ...s, tuitionPaid: newPaid };
      }
      return s;
    }));

    const refCode = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Persist payment to Netlify Postgres Database
    fetch('/api/school', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'record-payment',
        studentId: selectedStudent.id,
        amount: amountNum,
        paymentMethod,
        referenceCode: refCode,
      }),
    }).catch((err) => console.warn('Failed saving payment to DB:', err));

    setReceiptSuccess(`Official Receipt #${refCode} generated for ${amountNum.toLocaleString()} RWF via ${paymentMethod}. Balance updated!`);
    setTimeout(() => setReceiptSuccess(null), 5000);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent: Student = {
      id: String(Date.now()),
      regNo: `RND-2025-0${students.length + 101}`,
      name: newStudentName.trim(),
      class: newStudentClass,
      guardian: newStudentGuardian || 'Parent / Guardian',
      phone: newStudentPhone || '+250 788 000 000',
      tuitionTotal: 200000,
      tuitionPaid: 100000,
      status: 'Active',
    };

    setStudents([...students, newStudent]);
    setSelectedStudentId(newStudent.id);
    setShowAddStudent(false);
    setNewStudentName('');
    setNewStudentGuardian('');

    // Persist to Netlify Postgres Database
    fetch('/api/school', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add-student',
        student: {
          regNo: newStudent.regNo,
          name: newStudent.name,
          className: newStudent.class,
          guardian: newStudent.guardian,
          phone: newStudent.phone,
          tuitionTotal: newStudent.tuitionTotal,
          tuitionPaid: newStudent.tuitionPaid,
        },
      }),
    }).catch((err) => console.warn('Failed saving student to DB:', err));
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const attendanceRate = Math.round((presentCount / Object.keys(attendance).length) * 100);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Interactive Demo Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <School className="w-4 h-4 text-blue-600" />
            <span>Interactive System Demonstration</span>
            <span aria-hidden="true">·</span>
            <span>Live Functional Prototype</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            EduRunda School Management Suite
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Test Norbert's school logic: grade calculations, roll-call registers, student directories, and fee balances.
          </p>
        </div>

        {/* Module Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('grades')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'grades' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grades & Report Card</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'attendance' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Daily Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'students' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students ({students.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fees' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Tuition & Ledger</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="p-6">
        {/* TAB 1: GRADES & REPORT CARD */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{selectedStudent.name}</span>
                    <span className="text-xs text-slate-500 font-mono">({selectedStudent.regNo})</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    <span>{selectedStudent.class}</span>
                    <span aria-hidden="true"> · </span>
                    <span>Term 1 Academic Year 2025/2026</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase">Term Average</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-blue-700">
                    {averagePercentage}%
                  </div>
                </div>
                <button
                  onClick={() => setShowReportCardModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Preview Full Report Card</span>
                </button>
              </div>
            </div>

            {/* Editable Grades Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Active Subject Evaluation Matrix</span>
                <span>Type inside inputs to simulate instant calculation</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Coursework (Max 40)</th>
                      <th className="py-3 px-4">Final Exam (Max 60)</th>
                      <th className="py-3 px-4 text-center">Total (100%)</th>
                      <th className="py-3 px-4 text-center">Grade</th>
                      <th className="py-3 px-4">Official Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grades.map((item, idx) => {
                      const details = calculateGradeDetails(item.coursework, item.exam);
                      return (
                        <tr key={item.subject} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {item.subject}
                            <span className="block text-xs font-normal text-slate-500">Instructor: {item.teacher}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="0"
                                max="40"
                                value={item.coursework}
                                onChange={(e) => handleUpdateGrade(idx, 'coursework', parseInt(e.target.value))}
                                className="w-16 px-2.5 py-1 text-sm border border-slate-300 rounded font-mono text-center focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                              />
                              <span className="text-xs text-slate-400">/ 40</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="0"
                                max="60"
                                value={item.exam}
                                onChange={(e) => handleUpdateGrade(idx, 'exam', parseInt(e.target.value))}
                                className="w-16 px-2.5 py-1 text-sm border border-slate-300 rounded font-mono text-center focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                              />
                              <span className="text-xs text-slate-400">/ 60</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-bold font-mono tabular-nums text-slate-900">
                            {details.total}%
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded ${
                              details.letter === 'A' ? 'bg-blue-100 text-blue-800' :
                              details.letter === 'B' ? 'bg-sky-100 text-sky-800' :
                              details.letter === 'C' ? 'bg-slate-100 text-slate-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              Grade {details.letter}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-600">
                            {details.remarks}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Daily Roll Call</span>
                <h4 className="font-semibold text-slate-900">Senior 4 PCM - Morning Attendance</h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  <span>Class Teacher: Mr. Manzi Norbert</span>
                  <span aria-hidden="true"> · </span>
                  <span>Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase">Class Presence</div>
                  <div className="text-lg font-bold font-mono tabular-nums text-blue-700">
                    {attendanceRate}% Present ({presentCount}/{students.length})
                  </div>
                </div>
                <button
                  onClick={handleSendAbsentSms}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Trigger Absentee SMS Alerts</span>
                </button>
              </div>
            </div>

            {smsSentAlert && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>{smsSentAlert}</p>
              </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-100">
                {students.map((student) => {
                  const currentStatus = attendance[student.id] || 'present';
                  return (
                    <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">
                            <span>Reg: {student.regNo}</span>
                            <span aria-hidden="true"> · </span>
                            <span>Parent: {student.guardian} ({student.phone})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleMarkAttendance(student.id, 'present')}
                          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(student.id, 'late')}
                          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                            currentStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(student.id, 'absent')}
                          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(student.id, 'excused')}
                          className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                            currentStatus === 'excused'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENTS DIRECTORY */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student, reg number, class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <button
                onClick={() => setShowAddStudent(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Enroll New Student</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="py-3 px-4">Reg Number</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Parent / Guardian</th>
                      <th className="py-3 px-4">Phone Contact</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((st) => (
                      <tr 
                        key={st.id} 
                        className={`hover:bg-slate-50/60 transition-colors ${selectedStudentId === st.id ? 'bg-blue-50/40' : ''}`}
                      >
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-700">{st.regNo}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">{st.name}</td>
                        <td className="py-3 px-4 text-xs text-slate-600">{st.class}</td>
                        <td className="py-3 px-4 text-xs text-slate-600">{st.guardian}</td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-500">{st.phone}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedStudentId(st.id);
                              setActiveTab('grades');
                            }}
                            className="px-2.5 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                          >
                            Select & View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TUITION & LEDGER */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 uppercase font-medium">Total Term Fee Obligation</div>
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {selectedStudent.tuitionTotal.toLocaleString()} RWF
                </div>
                <div className="text-xs text-slate-500 mt-1">Academic Year 2025/2026</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 uppercase font-medium">Amount Paid to Date</div>
                <div className="text-xl font-bold font-mono tabular-nums text-emerald-700 mt-1">
                  {selectedStudent.tuitionPaid.toLocaleString()} RWF
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {Math.round((selectedStudent.tuitionPaid / selectedStudent.tuitionTotal) * 100)}% Cleared
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 uppercase font-medium">Outstanding Balance</div>
                <div className="text-xl font-bold font-mono tabular-nums text-amber-700 mt-1">
                  {(selectedStudent.tuitionTotal - selectedStudent.tuitionPaid).toLocaleString()} RWF
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {selectedStudent.tuitionPaid >= selectedStudent.tuitionTotal ? 'Account Fully Settled' : 'Pending Installment'}
                </div>
              </div>
            </div>

            {receiptSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>{receiptSuccess}</p>
              </div>
            )}

            {/* Payment Recording Form */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 text-sm mb-1">
                Record Installment for: <span className="text-blue-700">{selectedStudent.name}</span>
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Bursary cashier module with real-time balance updating and automated receipt voucher generation.
              </p>

              <form onSubmit={handleRecordPayment} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Amount to Pay (RWF)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    max={selectedStudent.tuitionTotal - selectedStudent.tuitionPaid}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-blue-600"
                    placeholder="Enter RWF amount"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="MTN Mobile Money">MTN Mobile Money (MoMo)</option>
                    <option value="Bank Transfer">Bank Transfer / Deposit Slip</option>
                    <option value="Cash">Cash at Bursary Counter</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={selectedStudent.tuitionPaid >= selectedStudent.tuitionTotal}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Generate Stamped Receipt</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* REPORT CARD PREVIEW MODAL */}
      {showReportCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Official Student Term Academic Report Card</h3>
                  <div className="text-xs text-slate-500">Runda Academic Institute of Technology & Sciences</div>
                </div>
              </div>
              <button
                onClick={() => setShowReportCardModal(false)}
                className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Report card body */}
            <div className="border border-slate-300 rounded-lg p-5 bg-slate-50/40 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-500 block">Student Name:</span>
                  <strong className="text-slate-900">{selectedStudent.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Registration:</span>
                  <strong className="font-mono text-slate-900">{selectedStudent.regNo}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Class / Stream:</span>
                  <strong className="text-slate-900">{selectedStudent.class}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Term / Year:</span>
                  <strong className="text-slate-900">Term 1 (2025/2026)</strong>
                </div>
              </div>

              <table className="w-full text-xs text-left">
                <thead className="bg-slate-200/80 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2">Subject</th>
                    <th className="p-2 text-center">Coursework (/40)</th>
                    <th className="p-2 text-center">Exam (/60)</th>
                    <th className="p-2 text-center">Total (/100)</th>
                    <th className="p-2 text-center">Grade</th>
                    <th className="p-2">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {grades.map(g => {
                    const d = calculateGradeDetails(g.coursework, g.exam);
                    return (
                      <tr key={g.subject}>
                        <td className="p-2 font-medium">{g.subject}</td>
                        <td className="p-2 text-center font-mono">{g.coursework}</td>
                        <td className="p-2 text-center font-mono">{g.exam}</td>
                        <td className="p-2 text-center font-mono font-bold">{d.total}%</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{d.letter}</td>
                        <td className="p-2 text-slate-600">{d.remarks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="grid grid-cols-3 gap-2 bg-blue-50 p-3 rounded-lg border border-blue-200 text-xs">
                <div>
                  <span className="text-blue-800 block">Term Aggregate:</span>
                  <strong className="text-base font-bold text-blue-900 font-mono">{currentTotal} / {totalPossible}</strong>
                </div>
                <div>
                  <span className="text-blue-800 block">Final Percentage:</span>
                  <strong className="text-base font-bold text-blue-900 font-mono">{averagePercentage}%</strong>
                </div>
                <div>
                  <span className="text-blue-800 block">Class Standing:</span>
                  <strong className="text-base font-bold text-blue-900 font-mono">1st / 38 Students</strong>
                </div>
              </div>

              <div className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                <p><strong>Headmaster Remark:</strong> Exceptional academic discipline and analytical mastery. Demonstrates strong commitment to science and technology studies.</p>
                <div className="mt-4 flex items-center justify-between text-slate-400 font-mono text-[11px]">
                  <span>System: EduRunda SMS Automated Report Generator</span>
                  <span>Signature & Official Stamp: [VERIFIED DIGITAL SEAL]</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Transcript</span>
              </button>
              <button
                onClick={() => setShowReportCardModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Done Previewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENROLL STUDENT MODAL */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Enroll New Student to System</h3>
            <p className="text-xs text-slate-500 mb-4">Adds a student record with auto-generated registration code and database schema linkage.</p>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mugisha Christian"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Class & Stream</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-blue-600"
                >
                  <option value="Senior 3 A">Senior 3 A</option>
                  <option value="Senior 4 PCM">Senior 4 PCM</option>
                  <option value="Senior 5 MCB">Senior 5 MCB</option>
                  <option value="Senior 6 PCB">Senior 6 PCB</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Guardian / Parent Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gasana Jean Paul"
                  value={newStudentGuardian}
                  onChange={(e) => setNewStudentGuardian(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Guardian Phone (SMS alerts)</label>
                <input
                  type="text"
                  placeholder="+250 788 000 000"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Confirm & Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
