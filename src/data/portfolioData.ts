export interface Project {
  id: string;
  title: string;
  category: 'school' | 'web-app' | 'learning';
  categoryLabel: string;
  tagline: string;
  description: string;
  fullOverview: string;
  image: string;
  role: string;
  year: string;
  status: 'Production Ready' | 'Active Prototype' | 'In Development';
  technologies: string[];
  keyFeatures: string[];
  databaseSchema: {
    table: string;
    columns: string[];
    description: string;
  }[];
  demoAvailable?: boolean;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Practical"
    years: string;
    detail: string;
  }[];
}

export const DEVELOPER_INFO = {
  name: "Ihimbazwe Manzi Norbert",
  shortName: "Manzi Norbert",
  title: "Full-Stack Developer & School Systems Specialist",
  location: "Runda, Rwanda",
  email: "norbertihimbazwemanzi@gmail.com",
  phone: "+250 780 000 000",
  bio: "Full-stack developer from Runda with hands-on expertise building enterprise-grade School Management Systems and modern web applications. Proficient in React.js, Vue.js, JavaScript, PHP, and MySQL database architecture. Focused on automating school administration, student grading, daily attendance, and financial reconciliation for educational institutions.",
  education: {
    institution: "Studies in Runda, Rwanda",
    program: "Software Development & Computer Information Systems",
    focus: "Full-Stack Web Engineering, Relational Database Modeling, Algorithm Design",
  },
  socialLinks: {
    github: "https://github.com/manzi-norbert",
    linkedin: "https://linkedin.com/in/ihimbazwe-manzi-norbert",
    whatsapp: "https://wa.me/250780000000",
    twitter: "https://x.com/manzi_norbert",
  },
  familyInfo: {
    title: "Family & Roots in Runda",
    subtitle: "My support system, inspiration, and heritage in Kamonyi District, Rwanda.",
    images: [
      {
        url: "/src/assets/images/family_portrait_norbert_1791622389479.jpg",
        caption: "Our Family in Rwanda - The cornerstone of my work ethics and integrity.",
        tag: "Family Portrait"
      },
      {
        url: "/src/assets/images/family_runda_home_1791622402396.jpg",
        caption: "Gathering at our family homestead in Runda, Kamonyi hills.",
        tag: "Runda Homestead"
      }
    ],
    contacts: [
      {
        label: "Family Representative / Parents",
        name: "Mr. & Mrs. Ihimbazwe",
        phone: "+250 788 456 789",
        location: "Runda Sector, Kamonyi District, Rwanda",
        role: "Primary Family & Emergency Contact"
      },
      {
        label: "Family Residence / Postal",
        name: "Ihimbazwe Family Estate",
        phone: "+250 788 123 456",
        location: "Near Runda Center, Kamonyi / Kigali Corridor",
        role: "Official Home Reference"
      }
    ],
    friends: [
      {
        id: "friend-1",
        name: "Runda Tech Study Group & Peers",
        role: "Software Engineering Cohort & Close Friends",
        phone: "+250 788 112 233",
        location: "Runda & Kigali, Rwanda",
        image: "/src/assets/images/friends_cohort_runda_1791623326018.jpg",
        note: "Fellow developers and classmates collaborating on school software systems, code reviews, and programming sessions."
      },
      {
        id: "friend-2",
        name: "Christian Mugabo",
        role: "Full-Stack Developer & Peer from Runda",
        phone: "+250 788 223 344",
        location: "Kamonyi / Kigali",
        image: "/src/assets/images/developer_portrait_1791620332954.jpg",
        note: "Classmate and longtime friend sharing practical web development and MySQL project experiments."
      },
      {
        id: "friend-3",
        name: "Diane Uwamahoro",
        role: "Database & UI Design Colleague",
        phone: "+250 788 334 455",
        location: "Runda Sector",
        image: "/src/assets/images/friends_cohort_runda_1791623326018.jpg",
        note: "Study partner passionate about educational software accessibility and student grade management."
      }
    ]
  },
  stats: [
    { label: "School Systems & Modules", value: "4+" },
    { label: "Core Technologies", value: "React · Vue · PHP · MySQL" },
    { label: "Database Normalization", value: "3NF / BCNF" },
    { label: "Location & Availability", value: "Runda / Open to Remote & Onsite" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "edurunda-sms",
    title: "EduRunda Enterprise School Management System",
    category: "school",
    categoryLabel: "School Management System",
    tagline: "All-in-one institutional ERP for student enrollment, attendance tracking, and academic records.",
    description: "A comprehensive web-based school management system built with PHP, MySQL, and a modern responsive frontend. Automates student registration, class allocation, teacher assignments, and administrative workflows.",
    fullOverview: "EduRunda SMS was engineered to streamline daily operations in primary and secondary schools. It replaces error-prone paper registers and fragmented spreadsheets with a centralized, multi-role portal for administrators, headteachers, instructors, and parents. Includes automated student ID generation, timetable scheduling, and emergency communication logs.",
    image: "/src/assets/images/school_erp_dashboard_1791620350520.jpg",
    role: "Lead Full-Stack Architect",
    year: "2025 - 2026",
    status: "Production Ready",
    technologies: ["PHP 8", "MySQL", "JavaScript", "React.js", "Tailwind CSS", "REST API", "Apache/XAMPP"],
    keyFeatures: [
      "Student Enrollment & Biographical Profiling with photo and guardian records",
      "Class & Section Allocation with maximum capacity enforcement",
      "Teacher & Staff Duty Allocation with subject assignment matrix",
      "Role-Based Access Control (Admin, Headteacher, Teacher, Bursar, Parent)",
      "Automated Semester Promotion & Archival of historical student records",
      "Data export to PDF and Excel for ministry and district compliance",
    ],
    databaseSchema: [
      {
        table: "students",
        columns: ["id (INT PK)", "reg_number (VARCHAR UNIQUE)", "first_name", "last_name", "gender", "dob", "class_id (FK)", "guardian_phone", "status"],
        description: "Stores primary student demographics and academic status."
      },
      {
        table: "classes",
        columns: ["id (INT PK)", "class_name", "stream_name", "academic_year", "teacher_id (FK)", "capacity"],
        description: "Defines cohorts, class streams, and responsible class masters."
      },
      {
        table: "teachers",
        columns: ["id (INT PK)", "employee_code", "full_name", "email", "phone", "specialization", "hire_date"],
        description: "Faculty directory and subject specialization tracking."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "academix-grading",
    title: "Academix Automated Grading & Report Card Engine",
    category: "school",
    categoryLabel: "Academic Analytics & Grading",
    tagline: "Automated Rwandan curriculum grade calculation, term GPA rankings, and print-ready PDF report cards.",
    description: "An academic processing module engineered to compute continuous assessments, term exam marks, weighted percentages, subject rankings, and generate professional printable report cards in seconds.",
    fullOverview: "Designed to eliminate manual calculation errors during peak end-of-term grading periods. Teachers enter quiz, midterm, and final exam marks via an intuitive spreadsheet-style interface. The system calculates standardized weighted scores, assigns letter grades, assigns class rank, and compiles headmaster remarks into official report cards ready for printing.",
    image: "/src/assets/images/grading_report_system_1791620363654.jpg",
    role: "Full-Stack Developer",
    year: "2025",
    status: "Production Ready",
    technologies: ["React.js", "PHP", "MySQL", "FPDF/TCPDF", "JavaScript", "Tailwind CSS"],
    keyFeatures: [
      "Dynamic grade boundary configuration (A: 80-100%, B: 70-79%, C: 60-69%, etc.)",
      "Automated weighted scoring (40% Continuous Assessment + 60% Final Exam)",
      "Instant Class Ranking and Top Performer leaderboards",
      "Automated behavior and conduct remark generator based on performance metrics",
      "One-click batch PDF report card generation for entire classrooms",
      "Parent SMS preview summary of student final standing",
    ],
    databaseSchema: [
      {
        table: "grades",
        columns: ["id (INT PK)", "student_id (FK)", "subject_id (FK)", "term_id (FK)", "assessment_score", "exam_score", "total_score", "grade_letter", "rank"],
        description: "Individual subject evaluations per student per academic term."
      },
      {
        table: "subjects",
        columns: ["id (INT PK)", "subject_name", "subject_code", "coefficient_weight", "department"],
        description: "Curriculum subject catalogue and credit weight coefficients."
      },
      {
        table: "report_cards",
        columns: ["id (INT PK)", "student_id (FK)", "term_id (FK)", "total_points", "average_percentage", "class_rank", "teacher_remark", "generated_at"],
        description: "Compiled official term summaries ready for physical and digital dispatch."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "learnsphere-portal",
    title: "LearnSphere Interactive Classroom & E-Learning Portal",
    category: "learning",
    categoryLabel: "E-Learning Web Application",
    tagline: "Digital syllabus delivery, multimedia lessons, homework submission, and student quizzes.",
    description: "A modern responsive learning environment built with Vue.js and React.js to provide digital lesson plans, lecture materials, and assignment submission for secondary school students.",
    fullOverview: "Built as part of an advanced web application roadmap to extend school systems beyond physical classrooms. Students can access weekly lesson modules, download revision notes, submit digital assignments, and take timed practice quizzes with immediate score feedback.",
    image: "/src/assets/images/elearning_classroom_1791620378006.jpg",
    role: "Frontend & Full-Stack Developer",
    year: "2026",
    status: "Active Prototype",
    technologies: ["Vue.js", "React.js", "JavaScript", "Node.js", "Tailwind CSS", "REST API"],
    keyFeatures: [
      "Modular lesson progress tracking with completed/current status indicators",
      "Integrated multimedia player for instructional video tutorials",
      "Drag-and-drop assignment upload with deadline verification",
      "Interactive multi-choice quiz simulator with instant self-assessment",
      "Discussion forums for student-teacher questions and clarification",
    ],
    databaseSchema: [
      {
        table: "courses",
        columns: ["id (INT PK)", "course_title", "class_level", "instructor_id (FK)", "syllabus_overview"],
        description: "Academic courses and syllabus structures."
      },
      {
        table: "assignments",
        columns: ["id (INT PK)", "course_id (FK)", "title", "due_date", "max_points", "attachment_url"],
        description: "Homework assignments and evaluation parameters."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "attendtrack-pro",
    title: "AttendTrack Pro - Daily Attendance & Gate Log",
    category: "school",
    categoryLabel: "Attendance & Safety",
    tagline: "Quick roll-call registration, absent student alerting, and monthly attendance percentage analytics.",
    description: "A fast, touch-friendly attendance register that enables teachers to take morning and afternoon attendance in under 60 seconds per class with automatic parent SMS notification triggers.",
    fullOverview: "Absenteeism directly impacts student academic success. AttendTrack Pro enables class teachers to mark attendance via phone, tablet, or desktop. It generates monthly attendance rate reports for school inspectors and flags students with consecutive unexcused absences.",
    image: "/src/assets/images/school_erp_dashboard_1791620350520.jpg",
    role: "Full-Stack Engineer",
    year: "2025",
    status: "Production Ready",
    technologies: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Twilio / SMS Gateway API"],
    keyFeatures: [
      "Rapid 1-tap roll call interface (Present / Late / Excused / Absent)",
      "Daily absenteeism alerts dispatched to guardian contact numbers",
      "Term attendance percentage calculation integrated with report cards",
      "Medical excuse tracking with doctor certificate attachment support",
      "School-wide daily attendance dashboard for the Headmaster",
    ],
    databaseSchema: [
      {
        table: "attendance_records",
        columns: ["id (INT PK)", "student_id (FK)", "class_id (FK)", "record_date", "status (ENUM: present, late, absent, excused)", "marked_by_teacher_id (FK)", "notes"],
        description: "Daily timestamped presence verification."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "schoolfee-manager",
    title: "SchoolFee Billing & Tuition Reconciliation System",
    category: "school",
    categoryLabel: "Tuition & Finance",
    tagline: "School fee collection, balance invoicing, installment receipts, and financial audit logs.",
    description: "A robust bursar financial portal built with PHP and MySQL to manage school tuition, feeding fees, boarding costs, and automated receipt generation.",
    fullOverview: "Simplifies bursary workflows by logging installment tuition payments, tracking pending debt balances per family, and printing stamped official payment receipts. Eliminates disputes through complete audit trails.",
    image: "/src/assets/images/grading_report_system_1791620363654.jpg",
    role: "Backend & Database Developer",
    year: "2025 - 2026",
    status: "Production Ready",
    technologies: ["PHP 8", "MySQL", "JavaScript", "HTML5", "CSS3", "FPDF"],
    keyFeatures: [
      "Student tuition balance overview with payment installment histories",
      "Automated official PDF receipt generation with unique receipt vouchers",
      "Category breakdowns (Tuition, Meals, Uniforms, Exam Fees, Boarding)",
      "Term financial reconciliation reports for school board auditing",
      "Overdue fee reminder SMS and printable balance demand letters",
    ],
    databaseSchema: [
      {
        table: "fee_invoices",
        columns: ["id (INT PK)", "student_id (FK)", "term_id (FK)", "total_due", "amount_paid", "balance", "status"],
        description: "Term invoice obligations per enrolled student."
      },
      {
        table: "fee_payments",
        columns: ["id (INT PK)", "invoice_id (FK)", "amount", "payment_method (Bank, MobileMoney, Cash)", "reference_code", "received_by", "paid_at"],
        description: "Individual installment ledger entries with verified reference vouchers."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "mediconnect-runda",
    title: "MediConnect Clinic Appointment & Patient Records",
    category: "learning",
    categoryLabel: "Healthcare Web Application",
    tagline: "Patient triage booking, doctor schedule management, and outpatient clinic logs.",
    description: "A web application developed during full-stack practice to manage health clinic appointment slots, doctor availability calendars, and outpatient records.",
    fullOverview: "Built as a modular web application exploring multi-entity relational schemas and appointment scheduling algorithms. Features patient registration, appointment status progression, and doctor schedule conflict prevention.",
    image: "/src/assets/images/elearning_classroom_1791620378006.jpg",
    role: "Full-Stack Developer (Learning Project)",
    year: "2025",
    status: "Active Prototype",
    technologies: ["React.js", "JavaScript", "PHP", "MySQL", "Tailwind CSS"],
    keyFeatures: [
      "Online appointment slot reservation with real-time slot conflict checks",
      "Doctor roster and specialty filter",
      "Outpatient visit triage notes and basic prescription logs",
      "Administrative patient visit statistics",
    ],
    databaseSchema: [
      {
        table: "appointments",
        columns: ["id (INT PK)", "patient_name", "phone", "doctor_id (FK)", "appointment_date", "time_slot", "status"],
        description: "Clinic reservations and patient appointment statuses."
      },
    ],
    demoAvailable: false,
  },
  {
    id: "quizmaster-engine",
    title: "QuizMaster Timed Academic Assessment Simulator",
    category: "learning",
    categoryLabel: "Assessment Engine",
    tagline: "Interactive timed exam engine with question randomization and auto-evaluation.",
    description: "An assessment tool created to practice state management and algorithm execution in React.js and Vue.js. Features countdown timers, question navigation, and detailed score breakdown.",
    fullOverview: "Engineered to assist teachers with fast formative testing. Students take multiple-choice quizzes under strict countdown timers. Once submitted, the system grades answers immediately, highlights incorrect responses, and provides explanatory feedback.",
    image: "/src/assets/images/grading_report_system_1791620363654.jpg",
    role: "Frontend Engineer (Learning Project)",
    year: "2026",
    status: "Active Prototype",
    technologies: ["React.js", "Vue.js", "JavaScript", "Local Storage", "CSS3"],
    keyFeatures: [
      "Configurable exam countdown timer with automatic force-submission",
      "Question navigator showing answered, flagged, and pending items",
      "Immediate score compilation with percentage and performance feedback",
      "Randomized question and answer order to prevent copying",
    ],
    databaseSchema: [
      {
        table: "quiz_questions",
        columns: ["id (INT PK)", "subject", "question_text", "option_a", "option_b", "option_c", "option_d", "correct_option", "explanation"],
        description: "Question repository and answer keys."
      },
    ],
    demoAvailable: true,
  },
  {
    id: "runda-agromarket",
    title: "Runda AgroMarket Cooperative Exchange",
    category: "web-app",
    categoryLabel: "Community Marketplace",
    tagline: "Agricultural produce listing, farmer cooperative inventory, and buyer order matching.",
    description: "A database-driven community marketplace built for local farmers and cooperatives in Runda to list harvest yields, check market prices, and connect directly with local buyers.",
    fullOverview: "Developed to test end-to-end CRUD operations, search filters, and catalog indexing in PHP and MySQL. Farmers can post available harvests (beans, maize, vegetables, dairy) with current pricing and contact numbers.",
    image: "/src/assets/images/school_erp_dashboard_1791620350520.jpg",
    role: "Full-Stack Developer",
    year: "2025",
    status: "Active Prototype",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    keyFeatures: [
      "Produce catalog with category filters and quantity availability",
      "Farmer vendor profile with direct WhatsApp/phone contact integration",
      "Real-time search across crop varieties and regional cooperative zones",
      "Simple admin dashboard for verifying active cooperative members",
    ],
    databaseSchema: [
      {
        table: "products",
        columns: ["id (INT PK)", "farmer_id (FK)", "crop_name", "category", "quantity_kg", "price_per_kg", "harvest_date"],
        description: "Agricultural inventory and cooperative listings."
      },
    ],
    demoAvailable: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Crafting fast, clean, and accessible user interfaces for school dashboards and interactive web applications.",
    skills: [
      { name: "React.js", level: "Advanced", years: "3+ years", detail: "Component lifecycles, hooks, context API, state management, SPA routing, Vite tooling" },
      { name: "Vue.js", level: "Proficient", years: "2+ years", detail: "Reactive components, Vue Router, Single File Components, Pinia/Vuex patterns" },
      { name: "JavaScript (ES6+)", level: "Advanced", years: "4+ years", detail: "Async/await, Fetch API, DOM manipulation, closures, array processing algorithms" },
      { name: "Tailwind CSS & CSS3", level: "Advanced", years: "3+ years", detail: "Responsive layout design, clean design tokens, custom print styling for report cards" },
      { name: "HTML5 Semantic Web", level: "Advanced", years: "4+ years", detail: "Accessible forms, data tables, semantic document structure, WCAG compliance" },
    ],
  },
  {
    title: "Backend & Database",
    description: "Architecting reliable server endpoints, relational databases, and institutional business logic.",
    skills: [
      { name: "PHP (OOP & MVC)", level: "Advanced", years: "3+ years", detail: "Object-oriented PHP, RESTful API controllers, session authentication, PDF report generators" },
      { name: "MySQL Relational Database", level: "Advanced", years: "3+ years", detail: "Schema normalization (3NF), complex joins, foreign keys, stored procedures, indexing" },
      { name: "RESTful API Design", level: "Advanced", years: "3+ years", detail: "JSON endpoints, HTTP verbs, secure authentication headers, CRUD operations" },
      { name: "Apache & Server Environments", level: "Proficient", years: "3+ years", detail: "XAMPP / WAMP local development, .htaccess routing, virtual hosts configuration" },
      { name: "Node.js & Express Basics", level: "Practical", years: "1+ year", detail: "Lightweight backend microservices, npm tooling, JSON serialization" },
    ],
  },
  {
    title: "School Systems Specialization",
    description: "Domain-specific expertise in solving the real operational challenges of schools and academic institutes.",
    skills: [
      { name: "Student Lifecycle & Enrollment", level: "Specialist", years: "Core Focus", detail: "Admission workflows, biographical records, family links, and class promotion logic" },
      { name: "Automated Grading & Transcripts", level: "Specialist", years: "Core Focus", detail: "Weighted percentages, Rwandan grading rubrics, rank computation, PDF report cards" },
      { name: "Daily Attendance & Safety Logs", level: "Specialist", years: "Core Focus", detail: "Rapid roll-call registers, absenteeism monitoring, guardian SMS notification triggers" },
      { name: "Tuition & Fee Reconciliation", level: "Specialist", years: "Core Focus", detail: "Installment ledgers, balance statements, payment receipt vouchers, financial summaries" },
      { name: "Role-Based Access Control (RBAC)", level: "Specialist", years: "Core Focus", detail: "Distinct permission gates for Administrators, Class Teachers, Bursars, and Parents" },
    ],
  },
  {
    title: "Developer Tools & Workflow",
    description: "Modern toolchain for building, debugging, and deploying production-ready code.",
    skills: [
      { name: "Git & GitHub", level: "Proficient", years: "3+ years", detail: "Branching strategies, version control, code repository management" },
      { name: "Vite & Modern Bundlers", level: "Proficient", years: "2+ years", detail: "Fast development environments, optimized asset builds, HMR configuration" },
      { name: "Postman & API Testing", level: "Proficient", years: "2+ years", detail: "Endpoint verification, payload debugging, authentication testing" },
      { name: "Windows Development Setup", level: "Expert", years: "Daily Driver", detail: "PowerShell, VS Code, Node.js on Windows, XAMPP stack configuration" },
    ],
  },
];

export const WINDOWS_SETUP_STEPS = [
  {
    step: "01",
    title: "Prerequisites: Install Node.js & Git on Windows",
    description: "Ensure you have the latest LTS version of Node.js and Git for Windows installed on your machine.",
    details: [
      "Download Node.js (v20 LTS or v22) from nodejs.org (choose the Windows 64-bit .msi installer).",
      "Download Git for Windows from git-scm.com.",
      "During installation, keep default options checked. Make sure 'Add to PATH' is selected.",
      "Verify installation by opening Windows Terminal / PowerShell (Win + X -> Terminal) and typing:",
    ],
    code: `node -v
npm -v
git --version`,
    note: "If command is not recognized, restart Windows Terminal or reboot to reload system PATH variables."
  },
  {
    step: "02",
    title: "Download or Clone Norbert's Portfolio Code",
    description: "Choose a folder on your Windows computer (for example, in your C:\\Projects directory).",
    details: [
      "Open PowerShell or Command Prompt.",
      "Create a folder and navigate into it:",
    ],
    code: `mkdir C:\\Projects
cd C:\\Projects
git clone https://github.com/manzi-norbert/portfolio-manzi.git
cd portfolio-manzi`,
    note: "If you downloaded as a .ZIP file instead of git, right-click the .ZIP -> 'Extract All...' to C:\\Projects\\portfolio-manzi, then open PowerShell inside that folder."
  },
  {
    step: "03",
    title: "Install Dependencies with npm",
    description: "Run the npm install command to download all React, Vite, and styling libraries into the node_modules folder.",
    details: [
      "In your PowerShell window inside the project directory, run:",
    ],
    code: `npm install`,
    note: "This will install React, Vite, Tailwind CSS, Lucide icons, and Motion in about 30-60 seconds."
  },
  {
    step: "04",
    title: "Start the Local Development Server",
    description: "Launch the fast Vite local server to preview and edit the portfolio on Windows.",
    details: [
      "Execute the dev script:",
    ],
    code: `npm run dev`,
    note: "Vite will output: 'Local: http://localhost:5173' or 'http://localhost:3000'. Hold Ctrl and click the link, or open Google Chrome / Edge and visit that URL!"
  },
  {
    step: "05",
    title: "Optional: Setup XAMPP for PHP & MySQL School Systems",
    description: "If you also want to run Norbert's PHP backend and MySQL database for the School Management System on Windows:",
    details: [
      "Download and install XAMPP from apachefriends.org (includes Apache, PHP 8, and MySQL).",
      "Open the XAMPP Control Panel on Windows.",
      "Click 'Start' next to Apache and 'Start' next to MySQL.",
      "Open your browser and navigate to http://localhost/phpmyadmin to create your school database (e.g., `edurunda_db`).",
      "Place your PHP school system backend scripts inside `C:\\xampp\\htdocs\\school_system`.",
    ],
    code: `# Test that PHP is working in Windows PowerShell
php -v`,
    note: "XAMPP provides an instant local server environment with MySQL and phpMyAdmin on Windows."
  },
  {
    step: "06",
    title: "Build for Production (Publish Online)",
    description: "When ready to deploy your portfolio to Netlify, Vercel, or GitHub Pages:",
    details: [
      "Run the build command:",
    ],
    code: `npm run build`,
    note: "This outputs a clean, ultra-fast `dist` folder ready to upload to any static hosting service."
  },
];
