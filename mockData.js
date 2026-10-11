// =======================================================================
// مجموعة مراكز الصخرة التعليمية | Al-Sakhra Educational Centers Management System
// بيانات المنظومة المتكاملة (ERP Enterprise Dataset)
// الفروع السبعة + نظام الصلاحيات (6 أدوار) + التخصصات والمواد + الدورات + الرقابة
// =======================================================================

window.AL_SAKHRA_ERP = {
  
  // 1. الفروع السبعة المستقلة (7 Isolated Branches)
  branches: [
    {
      id: 'b1',
      code: 'RIMAL',
      name: 'فرع الرمال',
      type: 'academic',
      manager: 'أ. سامر مرتجى',
      phone: '0599100201',
      address: 'غزة - شارع عمر المختار، مقابل كابيتال مول',
      activeStudents: 580,
      todayRevenue: 14500,
      todayExpenses: 3200,
      attendanceRate: 96.5,
      hallsCount: 8
    },
    {
      id: 'b2',
      code: 'NASR',
      name: 'فرع النصر',
      type: 'academic',
      manager: 'أ. خالد أبو شعبان',
      phone: '0599100202',
      address: 'غزة - شارع النصر، مفترق اللبابيدي',
      activeStudents: 490,
      todayRevenue: 11800,
      todayExpenses: 2800,
      attendanceRate: 95.2,
      hallsCount: 6
    },
    {
      id: 'b3',
      code: 'BAHR',
      name: 'فرع البحر',
      type: 'academic',
      manager: 'أ. يوسف ساق الله',
      phone: '0599100203',
      address: 'غزة - شارع الرشيد، بالقرب من دوار الميناء',
      activeStudents: 360,
      todayRevenue: 8200,
      todayExpenses: 2100,
      attendanceRate: 93.8,
      hallsCount: 5
    },
    {
      id: 'b4',
      code: 'SAHA',
      name: 'فرع الساحة',
      type: 'academic',
      manager: 'أ. عبد الله كحيل',
      phone: '0599100204',
      address: 'غزة - ميدان فلسطين (الساحة)، مجمع الصخرة التجاري',
      activeStudents: 430,
      todayRevenue: 9400,
      todayExpenses: 2500,
      attendanceRate: 94.6,
      hallsCount: 6
    },
    {
      id: 'b5',
      code: 'TEL_HAWA',
      name: 'فرع تل الهوى',
      type: 'academic',
      manager: 'أ. إيهاب اليازجي',
      phone: '0599100205',
      address: 'غزة - تل الهوى، بالقرب من دوار مستشفى القدس',
      activeStudents: 520,
      todayRevenue: 12600,
      todayExpenses: 3100,
      attendanceRate: 95.8,
      hallsCount: 7
    },
    {
      id: 'b6',
      code: 'DEIR_BALAH',
      name: 'فرع دير البلح',
      type: 'academic',
      manager: 'أ. حسام الغصين',
      phone: '0599100206',
      address: 'الوسطى - دير البلح، شارع الشهداء، بالقرب من البلدية',
      activeStudents: 390,
      todayRevenue: 7900,
      todayExpenses: 1900,
      attendanceRate: 93.4,
      hallsCount: 5
    },
    {
      id: 'b7',
      code: 'TRAINING',
      name: 'فرع الدورات التدريبية',
      type: 'training',
      manager: 'د. ليلى بدر',
      phone: '0599100207',
      address: 'غزة - مجمع الصخرة التكنولوجي، برج الجوهرة',
      activeStudents: 310,
      todayRevenue: 15800,
      todayExpenses: 4200,
      attendanceRate: 97.2,
      hallsCount: 8
    }
  ],

  // 2. محاكي أدوار المستخدمين الستة (User Roles Simulation)
  roles: [
    {
      id: 'super_admin',
      title: 'المدير العام (Super Admin)',
      userName: 'أ. محمود الصخرة',
      branchId: 'all',
      branchName: 'جميع الفروع (الإدارة المركزية العامة)',
      description: 'صلاحيات مطلقة: إدارة جميع الفروع، التقارير المركزية، المراقبة، وواتساب',
      canSwitchBranch: true,
      canViewAuditLogs: true,
      canViewAllFinancials: true
    },
    {
      id: 'branch_manager',
      title: 'مدير فرع (Branch Manager)',
      userName: 'أ. سامر مرتجى',
      branchId: 'b1', // فرع الرمال
      branchName: 'فرع الرمال',
      description: 'يدير شؤون فرع الرمال فقط ولا يمكنه الاطلاع على باقي الفروع أمنياً',
      canSwitchBranch: false,
      canViewAuditLogs: false,
      canViewAllFinancials: false
    },
    {
      id: 'registration_employee',
      title: 'موظف تسجيل وقبول (Registration Staff)',
      userName: 'سها الوحيدي',
      branchId: 'b2', // فرع النصر
      branchName: 'فرع النصر',
      description: 'إضافة وتعديل بيانات الطلاب وقبول طلبات التسجيل الأكاديمية والمهنية',
      canSwitchBranch: false,
      canViewAuditLogs: false,
      canViewAllFinancials: false
    },
    {
      id: 'accountant',
      title: 'المحاسب المالي (Accountant)',
      userName: 'أحمد الغندور',
      branchId: 'b1', // فرع الرمال
      branchName: 'فرع الرمال',
      description: 'إدارة تحصيل الرسوم وسندات القبض والصرف ورواتب المعلمين لفرعه',
      canSwitchBranch: false,
      canViewAuditLogs: false,
      canViewAllFinancials: false
    },
    {
      id: 'teacher',
      title: 'المعلم والمحاضر (Teacher)',
      userName: 'أ. د. كمال رضوان',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      description: 'استعراض الحصص وجداول المحاضرات، رصد الحضور، وإدخال نتائج الامتحانات',
      canSwitchBranch: false,
      canViewAuditLogs: false,
      canViewAllFinancials: false
    },
    {
      id: 'student_parent',
      title: 'طالب / ولي أمر (Student / Parent)',
      userName: 'محمد إبراهيم النجار (ولي الأمر: إبراهيم النجار)',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      description: 'بوابة الطالب لمتابعة الحضور والغياب، كشف الدرجات، ومواعيد الحصص',
      canSwitchBranch: false,
      canViewAuditLogs: false,
      canViewAllFinancials: false
    }
  ],

  // 3. المراحل والتخصصات والمواد الـ 8
  educationalLevels: [
    { id: '11_sci', name: 'Grade 11 Scientific', nameAr: 'الصف الحادي عشر (علمي)', stream: 'علمي' },
    { id: '11_lit', name: 'Grade 11 Literary', nameAr: 'الصف الحادي عشر (أدبي)', stream: 'أدبي' },
    { id: '12_sci', name: 'Tawjihi Scientific', nameAr: 'توجيهي (الثانوية العامة - علمي)', stream: 'علمي' },
    { id: '12_lit', name: 'Tawjihi Literary', nameAr: 'توجيهي (الثانوية العامة - أدبي)', stream: 'أدبي' },
    { id: 'training', name: 'Training Course', nameAr: 'فرع وقسم الدورات التدريبية', stream: 'مهني' }
  ],

  scientificSubjects: [
    'الرياضيات (الفرع العلمي)',
    'الفيزياء',
    'الكيمياء',
    'العلوم الحياتية (الأحياء)',
    'اللغة العربية (المطالعة والقواعد والأدب)',
    'اللغة الإنجليزية',
    'التربية الإسلامية',
    'التكنولوجيا وتطبيقات الحاسوب'
  ],

  literarySubjects: [
    'اللغة العربية (المطالعة والأدب والنقد واللغة)',
    'الرياضيات الأدبية',
    'التاريخ المعاصر',
    'الجغرافيا والدراسات السكانية',
    'اللغة الإنجليزية',
    'التربية الإسلامية',
    'الثقافة العلمية',
    'التكنولوجيا وتطبيقات الحاسوب'
  ],

  // 4. قاعدة بيانات الطلاب الموزعة عبر الفروع
  students: [
    {
      id: 'STU-1001',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      name: 'محمد إبراهيم النجار',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
      phone: '0599123456',
      parentPhone: '0599234567',
      level: 'Tawjihi Scientific',
      levelNameAr: 'توجيهي علمي',
      className: 'شعبة أ - قاعة القدس',
      subjectsCount: 8,
      registrationDate: '2026-08-15',
      totalFees: 1200,
      paidAmount: 1200,
      remainingAmount: 0,
      status: 'active',
      notes: 'طالب متفوق في مادتي الفيزياء والرياضيات'
    },
    {
      id: 'STU-1002',
      branchId: 'b2',
      branchName: 'فرع النصر',
      name: 'هبة خالد البطش',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      phone: '0598234567',
      parentPhone: '0598345678',
      level: 'Tawjihi Literary',
      levelNameAr: 'توجيهي أدبي',
      className: 'شعبة ب - قاعة يافا',
      subjectsCount: 8,
      registrationDate: '2026-08-20',
      totalFees: 1100,
      paidAmount: 800,
      remainingAmount: 300,
      status: 'active',
      notes: 'تستحق قسطاً متبقياً نهاية الشهر'
    },
    {
      id: 'STU-1003',
      branchId: 'b5',
      branchName: 'فرع تل الهوى',
      name: 'أحمد محمود صيام',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      phone: '0597112233',
      parentPhone: '0597223344',
      level: 'Grade 11 Scientific',
      levelNameAr: 'حادي عشر علمي',
      className: 'شعبة ج - قاعة الخوارزمي',
      subjectsCount: 8,
      registrationDate: '2026-08-25',
      totalFees: 950,
      paidAmount: 500,
      remainingAmount: 450,
      status: 'overdue',
      notes: 'إشعار سداد قسط مرسل لولي الأمر'
    },
    {
      id: 'STU-1004',
      branchId: 'b3',
      branchName: 'فرع البحر',
      name: 'رنا فؤاد الشوا',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      phone: '0595334455',
      parentPhone: '0595445566',
      level: 'Grade 11 Literary',
      levelNameAr: 'حادي عشر أدبي',
      className: 'شعبة أ - قاعة المينا',
      subjectsCount: 8,
      registrationDate: '2026-08-28',
      totalFees: 900,
      paidAmount: 900,
      remainingAmount: 0,
      status: 'active',
      notes: 'خالصة الرسوم بالكامل'
    },
    {
      id: 'STU-1005',
      branchId: 'b4',
      branchName: 'فرع الساحة',
      name: 'عمر زياد الدحدوح',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      phone: '0592556677',
      parentPhone: '0592667788',
      level: 'Tawjihi Scientific',
      levelNameAr: 'توجيهي علمي',
      className: 'شعبة د - قاعة فلسطين',
      subjectsCount: 8,
      registrationDate: '2026-09-01',
      totalFees: 1200,
      paidAmount: 400,
      remainingAmount: 800,
      status: 'suspended',
      notes: 'موقوف مؤقتاً لمراجعة إدارة الفرع'
    },
    {
      id: 'STU-1006',
      branchId: 'b6',
      branchName: 'فرع دير البلح',
      name: 'سارة عبد الله الغصين',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      phone: '0594778899',
      parentPhone: '0594889900',
      level: 'Tawjihi Literary',
      levelNameAr: 'توجيهي أدبي',
      className: 'شعبة أ - قاعة الأقصى',
      subjectsCount: 8,
      registrationDate: '2026-09-03',
      totalFees: 1100,
      paidAmount: 1100,
      remainingAmount: 0,
      status: 'active',
      notes: 'منتظمة ومتفوقة في مادة التاريخ'
    },
    {
      id: 'STU-1007',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      name: 'محمود كمال حبيب',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
      phone: '0591223344',
      parentPhone: '0591334455',
      level: 'Training Course',
      levelNameAr: 'دورة مهنية تخصصية',
      className: 'مختبر البرمجيات 1',
      subjectsCount: 1,
      registrationDate: '2026-09-15',
      totalFees: 450,
      paidAmount: 450,
      remainingAmount: 0,
      status: 'active',
      notes: 'مسجل في دبلوم Full Stack Web Development'
    }
  ],

  // 5. هيئة التدريس (Teachers)
  teachers: [
    {
      id: 'TCH-101',
      name: 'أ. د. كمال رضوان',
      phone: '0599110022',
      subject: 'الفيزياء',
      stream: 'الفرع العلمي',
      qualification: 'دكتوراه في الفيزياء النووية والتطبيقية',
      salary: 4500,
      assignedBranches: ['فرع الرمال', 'فرع النصر'],
      weeklyClasses: 14,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 'TCH-102',
      name: 'أ. يحيى السراج',
      phone: '0599334411',
      subject: 'الرياضيات (الفرع العلمي)',
      stream: 'الفرع العلمي',
      qualification: 'ماجستير مناهج وطرق تدريس الرياضيات',
      salary: 4800,
      assignedBranches: ['فرع النصر', 'فرع الرمال', 'فرع تل الهوى'],
      weeklyClasses: 16,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 'TCH-103',
      name: 'د. سامي حلس',
      phone: '0598223344',
      subject: 'الكيمياء',
      stream: 'الفرع العلمي',
      qualification: 'دكتوراه في الكيمياء العضوية',
      salary: 4200,
      assignedBranches: ['فرع تل الهوى', 'فرع الساحة'],
      weeklyClasses: 12,
      rating: 4.8,
      status: 'active'
    },
    {
      id: 'TCH-104',
      name: 'أ. وفاء الحداد',
      phone: '0597445566',
      subject: 'العلوم الحياتية (الأحياء)',
      stream: 'الفرع العلمي',
      qualification: 'ماجستير العلوم الحياتية والبيولوجيا الجزيئية',
      salary: 3900,
      assignedBranches: ['فرع البحر', 'فرع الرمال'],
      weeklyClasses: 10,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 'TCH-105',
      name: 'أ. غسان العشي',
      phone: '0595667788',
      subject: 'التاريخ المعاصر',
      stream: 'الفرع الأدبي',
      qualification: 'ماجستير التاريخ والدراسات الإقليمية',
      salary: 3800,
      assignedBranches: ['فرع الساحة', 'فرع دير البلح'],
      weeklyClasses: 11,
      rating: 4.7,
      status: 'active'
    },
    {
      id: 'TCH-106',
      name: 'أ. سمر الريس',
      phone: '0592889900',
      subject: 'الجغرافيا والدراسات السكانية',
      stream: 'الفرع الأدبي',
      qualification: 'ماجستير الجغرافيا ونظم المعلومات الجغرافية GIS',
      salary: 3500,
      assignedBranches: ['فرع دير البلح', 'فرع النصر'],
      weeklyClasses: 9,
      rating: 4.8,
      status: 'active'
    },
    {
      id: 'TCH-107',
      name: 'أ. زياد سكيك',
      phone: '0594112255',
      subject: 'اللغة العربية (المطالعة والقواعد والأدب)',
      stream: 'الفرعان (علمي وأدبي)',
      qualification: 'ماجستير الأدب العربي والبلاغة',
      salary: 5000,
      assignedBranches: ['فرع الرمال', 'فرع تل الهوى', 'فرع النصر'],
      weeklyClasses: 18,
      rating: 5.0,
      status: 'active'
    },
    {
      id: 'TCH-108',
      name: 'Miss ميسون مرتجى',
      phone: '0591336699',
      subject: 'اللغة الإنجليزية',
      stream: 'الفرعان (علمي وأدبي)',
      qualification: 'ماجستير اللغويات والترجمة الفورية',
      salary: 4400,
      assignedBranches: ['فرع تل الهوى', 'فرع البحر'],
      weeklyClasses: 14,
      rating: 4.9,
      status: 'active'
    }
  ],

  // 6. قسم الدورات التدريبية المستقل (Training Courses Department)
  trainingCourses: [
    {
      id: 'CRS-501',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      title: 'دبلوم البرمجة الشاملة وتطوير الويب (Full Stack Web Development)',
      category: 'Computer courses',
      categoryAr: 'دورات الحاسوب والبرمجة',
      trainer: 'م. حسام مقداد',
      duration: '4 أشهر',
      startDate: '2026-09-15',
      endDate: '2027-01-15',
      hours: 120,
      price: 450,
      capacity: 25,
      registeredStudents: 24,
      attendanceRate: 98,
      certificatesIssued: 0,
      status: 'in_progress',
      hall: 'مختبر البرمجيات 1'
    },
    {
      id: 'CRS-502',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      title: 'دورة الإسعافات الأولية والطوارئ المتقدمة (Medical First Responder)',
      category: 'Medical courses',
      categoryAr: 'الدورات والعلوم الطبية',
      trainer: 'د. عاصم النخالة (طبيب طوارئ)',
      duration: '6 أسابيع',
      startDate: '2026-10-01',
      endDate: '2026-11-15',
      hours: 40,
      price: 180,
      capacity: 20,
      registeredStudents: 19,
      attendanceRate: 95,
      certificatesIssued: 0,
      status: 'in_progress',
      hall: 'قاعة المحاكاة الطبية'
    },
    {
      id: 'CRS-503',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      title: 'دبلوم التصميم الجرافيكي والمونتاج وصناعة المحتوى',
      category: 'Professional courses',
      categoryAr: 'الدورات المهنية والتطبيقية',
      trainer: 'أ. طارق صالحة',
      duration: '3 أشهر',
      startDate: '2026-09-20',
      endDate: '2026-12-20',
      hours: 75,
      price: 320,
      capacity: 20,
      registeredStudents: 18,
      attendanceRate: 96,
      certificatesIssued: 0,
      status: 'in_progress',
      hall: 'مختبر الملتيميديا'
    },
    {
      id: 'CRS-504',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      title: 'دورة إعداد وتأهيل الآيلتس والتوفل (IELTS & TOEFL Preparation)',
      category: 'Language courses',
      categoryAr: 'دورات اللغات والترجمة',
      trainer: 'د. ليلى بدر',
      duration: '8 أسابيع',
      startDate: '2026-10-20',
      endDate: '2026-12-20',
      hours: 50,
      price: 250,
      capacity: 22,
      registeredStudents: 16,
      attendanceRate: 100,
      certificatesIssued: 0,
      status: 'upcoming',
      hall: 'قاعة اللغات التفاعلية'
    },
    {
      id: 'CRS-505',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      title: 'دورة القيادة وإدارة المشاريع الاحترافية (PMP & Leadership Skills)',
      category: 'Skills development courses',
      categoryAr: 'دورات المهارات وتطوير الذات',
      trainer: 'أ. وائل مشتهى',
      duration: '5 أسابيع',
      startDate: '2026-10-25',
      endDate: '2026-11-30',
      hours: 35,
      price: 210,
      capacity: 25,
      registeredStudents: 21,
      attendanceRate: 0,
      certificatesIssued: 0,
      status: 'upcoming',
      hall: 'قاعة الرواد'
    }
  ],

  // 7. الجداول الدراسية المتقدمة (Timetable)
  schedules: [
    {
      id: 'SCH-1',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      day: 'السبت',
      time: '08:30 ص - 10:30 ص',
      grade: 'Tawjihi Scientific',
      gradeAr: 'توجيهي علمي',
      className: 'شعبة أ',
      subject: 'الفيزياء',
      teacher: 'أ. د. كمال رضوان',
      hall: 'قاعة القدس (120 طالب)'
    },
    {
      id: 'SCH-2',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      day: 'السبت',
      time: '11:00 ص - 01:00 م',
      grade: 'Tawjihi Scientific',
      gradeAr: 'توجيهي علمي',
      className: 'شعبة أ',
      subject: 'الرياضيات (الفرع العلمي)',
      teacher: 'أ. يحيى السراج',
      hall: 'قاعة القدس (120 طالب)'
    },
    {
      id: 'SCH-3',
      branchId: 'b2',
      branchName: 'فرع النصر',
      day: 'الأحد',
      time: '09:00 ص - 11:00 ص',
      grade: 'Tawjihi Literary',
      gradeAr: 'توجيهي أدبي',
      className: 'شعبة ب',
      subject: 'التاريخ المعاصر',
      teacher: 'أ. غسان العشي',
      hall: 'قاعة يافا (90 طالب)'
    },
    {
      id: 'SCH-4',
      branchId: 'b5',
      branchName: 'فرع تل الهوى',
      day: 'الاثنين',
      time: '10:00 ص - 12:00 م',
      grade: 'Grade 11 Scientific',
      gradeAr: 'حادي عشر علمي',
      className: 'شعبة ج',
      subject: 'الكيمياء',
      teacher: 'د. سامي حلس',
      hall: 'قاعة الخوارزمي (85 طالب)'
    },
    {
      id: 'SCH-5',
      branchId: 'b6',
      branchName: 'فرع دير البلح',
      day: 'الثلاثاء',
      time: '08:30 ص - 10:30 ص',
      grade: 'Tawjihi Literary',
      gradeAr: 'توجيهي أدبي',
      className: 'شعبة أ',
      subject: 'الجغرافيا والدراسات السكانية',
      teacher: 'أ. سمر الريس',
      hall: 'قاعة الأقصى (75 طالب)'
    },
    {
      id: 'SCH-6',
      branchId: 'b7',
      branchName: 'فرع الدورات التدريبية',
      day: 'الأربعاء',
      time: '02:00 م - 05:00 م',
      grade: 'Training Course',
      gradeAr: 'دورة حاسوب',
      className: 'فوج الخريف',
      subject: 'Full Stack Web Development',
      teacher: 'م. حسام مقداد',
      hall: 'مختبر البرمجيات 1'
    }
  ],

  // 8. الحضور والغياب (Attendance)
  attendance: [
    { id: 'ATT-1', studentId: 'STU-1001', name: 'محمد إبراهيم النجار', branchId: 'b1', branchName: 'فرع الرمال', grade: 'توجيهي علمي', status: 'present', timeIn: '08:25 ص', notes: 'في الموعد' },
    { id: 'ATT-2', studentId: 'STU-1002', name: 'هبة خالد البطش', branchId: 'b2', branchName: 'فرع النصر', grade: 'توجيهي أدبي', status: 'present', timeIn: '08:45 ص', notes: 'في الموعد' },
    { id: 'ATT-3', studentId: 'STU-1003', name: 'أحمد محمود صيام', branchId: 'b5', branchName: 'فرع تل الهوى', grade: 'حادي عشر علمي', status: 'late', timeIn: '09:20 ص', notes: 'تأخر 20 دقيقة (مزدحم)' },
    { id: 'ATT-4', studentId: 'STU-1004', name: 'رنا فؤاد الشوا', branchId: 'b3', branchName: 'فرع البحر', grade: 'حادي عشر أدبي', status: 'present', timeIn: '08:30 ص', notes: 'في الموعد' },
    { id: 'ATT-5', studentId: 'STU-1005', name: 'عمر زياد الدحدوح', branchId: 'b4', branchName: 'فرع الساحة', grade: 'توجيهي علمي', status: 'excused', timeIn: '-', notes: 'عذر مرضي معتمد' },
    { id: 'ATT-6', studentId: 'STU-1006', name: 'سارة عبد الله الغصين', branchId: 'b6', branchName: 'فرع دير البلح', grade: 'توجيهي أدبي', status: 'present', timeIn: '08:35 ص', notes: 'في الموعد' },
    { id: 'ATT-7', studentId: 'STU-1007', name: 'محمود كمال حبيب', branchId: 'b7', branchName: 'فرع الدورات', grade: 'دورة مهنية', status: 'present', timeIn: '01:50 م', notes: 'حضور منتظم' }
  ],

  // 9. الحركات المالية المستقلة لكل فرع (Financial System)
  payments: [
    { id: 'INV-801', receiptNumber: 'REC-RML-2026-081', branchId: 'b1', branchName: 'فرع الرمال', date: '2026-10-10', title: 'سداد قسط التوجيهي (علمي) - فيزياء ورياضيات', studentName: 'محمد إبراهيم النجار', amount: 600, method: 'نقدي (خزينة)', cashier: 'أحمد الغندور' },
    { id: 'INV-802', receiptNumber: 'REC-NSR-2026-042', branchId: 'b2', branchName: 'فرع النصر', date: '2026-10-10', title: 'دفعة قسط التوجيهي (أدبي)', studentName: 'هبة خالد البطش', amount: 400, method: 'نقدي (خزينة)', cashier: 'سها الوحيدي' },
    { id: 'INV-803', receiptNumber: 'REC-TRN-2026-105', branchId: 'b7', branchName: 'فرع الدورات', date: '2026-10-09', title: 'رسوم دبلوم Full Stack Web Development', studentName: 'محمود كمال حبيب', amount: 450, method: 'PalPay محفظة', cashier: 'أمير حماد' },
    { id: 'INV-804', receiptNumber: 'REC-TLH-2026-063', branchId: 'b5', branchName: 'فرع تل الهوى', date: '2026-10-09', title: 'قسط الفصل الأول - حادي عشر علمي', studentName: 'أحمد محمود صيام', amount: 500, method: 'بنك فلسطين (تحويل)', cashier: 'إيهاب اليازجي' }
  ],

  expenses: [
    { id: 'EXP-101', voucherNumber: 'VOU-RML-012', branchId: 'b1', branchName: 'فرع الرمال', date: '2026-10-09', title: 'فاتورة الكهرباء والمولد لشهر سبتمبر', category: 'كهرباء وطاقة', amount: 1800, paidTo: 'شركة توزيع الكهرباء', cashier: 'أحمد الغندور' },
    { id: 'EXP-102', voucherNumber: 'VOU-TRN-034', branchId: 'b7', branchName: 'فرع الدورات', date: '2026-10-08', title: 'ترقية خوادم ومختبرات الحاسوب', category: 'صيانة وتجهيزات', amount: 2400, paidTo: 'شركة تكنوبال للأجهزة', cashier: 'أمير حماد' },
    { id: 'EXP-103', voucherNumber: 'VOU-NSR-019', branchId: 'b2', branchName: 'فرع النصر', date: '2026-10-08', title: 'مستلزمات مكتبية وطباعة ملازم ومذكرات', category: 'قرطاسية ومطبوعات', amount: 950, paidTo: 'مطبعة الأمل', cashier: 'سها الوحيدي' }
  ],

  salaries: [
    { id: 'SAL-201', branchId: 'b1', branchName: 'فرع الرمال', employeeName: 'أ. د. كمال رضوان', role: 'محاضر فيزياء', month: '2026-09', baseSalary: 4500, bonus: 300, deductions: 0, netSalary: 4800, status: 'مدفوع' },
    { id: 'SAL-202', branchId: 'b2', branchName: 'فرع النصر', employeeName: 'أ. يحيى السراج', role: 'محاضر رياضيات', month: '2026-09', baseSalary: 4800, bonus: 200, deductions: 0, netSalary: 5000, status: 'مدفوع' },
    { id: 'SAL-203', branchId: 'b7', branchName: 'فرع الدورات', employeeName: 'م. حسام مقداد', role: 'مدرب تطوير ويب', month: '2026-09', baseSalary: 3200, bonus: 400, deductions: 0, netSalary: 3600, status: 'مدفوع' }
  ],

  // 10. الامتحانات والعلامات والتقارير (Exams & Grades)
  exams: [
    {
      id: 'EXM-1',
      branchId: 'b1',
      branchName: 'فرع الرمال',
      title: 'الامتحان الشهري الأول - فيزياء التوجيهي',
      grade: 'Tawjihi Scientific',
      subject: 'الفيزياء',
      date: '2026-10-05',
      maxScore: 100,
      passScore: 50,
      averageScore: 84.5
    },
    {
      id: 'EXM-2',
      branchId: 'b2',
      branchName: 'فرع النصر',
      title: 'امتحان نصف الفصل - تاريخ التوجيهي الأدبي',
      grade: 'Tawjihi Literary',
      subject: 'التاريخ المعاصر',
      date: '2026-10-06',
      maxScore: 100,
      passScore: 50,
      averageScore: 78.2
    },
    {
      id: 'EXM-3',
      branchId: 'b5',
      branchName: 'فرع تل الهوى',
      title: 'امتحان الكيمياء - حادي عشر علمي',
      grade: 'Grade 11 Scientific',
      subject: 'الكيمياء',
      date: '2026-10-07',
      maxScore: 100,
      passScore: 50,
      averageScore: 81.0
    }
  ],

  grades: [
    { id: 'GRD-1', examId: 'EXM-1', studentId: 'STU-1001', studentName: 'محمد إبراهيم النجار', score: 96, status: 'passed', remarks: 'امتياز - الأول على الشعبة' },
    { id: 'GRD-2', examId: 'EXM-2', studentId: 'STU-1002', studentName: 'هبة خالد البطش', score: 88, status: 'passed', remarks: 'جيد جداً مرتفع' },
    { id: 'GRD-3', examId: 'EXM-3', studentId: 'STU-1003', studentName: 'أحمد محمود صيام', score: 74, status: 'passed', remarks: 'جيد' }
  ],

  // 11. سجل الرقابة والتدقيق غير القابل للتعديل (Immutable Audit Logs - Super Admin Only)
  auditLogs: [
    {
      id: 501,
      user: 'أ. محمود الصخرة',
      role: 'Super Admin',
      branch: 'جميع الفروع',
      action: 'LOGIN',
      date: '2026-10-10',
      time: '08:00:14 ص',
      details: 'تسجيل دخول ناجح للمدير العام من عنوان IP موثق (192.168.1.10)'
    },
    {
      id: 502,
      user: 'سها الوحيدي',
      role: 'Registration Employee',
      branch: 'فرع النصر',
      action: 'CREATE_STUDENT',
      date: '2026-10-10',
      time: '08:42:19 ص',
      details: 'تسجيل قيد طالب جديد (هبة خالد البطش - توجيهي أدبي) بكود قيد STU-1002'
    },
    {
      id: 503,
      user: 'أحمد الغندور',
      role: 'Accountant',
      branch: 'فرع الرمال',
      action: 'FINANCIAL_PAYMENT',
      date: '2026-10-10',
      time: '09:15:33 ص',
      details: 'إصدار سند قبض رقم REC-RML-2026-081 بمبلغ 600 شيكل للطالب محمد النجار'
    },
    {
      id: 504,
      user: 'أ. سامر مرتجى',
      role: 'Branch Manager',
      branch: 'فرع الرمال',
      action: 'SCHEDULE_CHANGE',
      date: '2026-10-10',
      time: '09:40:02 ص',
      details: 'تعديل توقيت حصة الفيزياء للأستاذ كمال رضوان إلى قاعة القدس'
    },
    {
      id: 505,
      user: 'أ. محمود الصخرة',
      role: 'Super Admin',
      branch: 'المركز العام',
      action: 'WHATSAPP_REPORT',
      date: '2026-10-10',
      time: '10:05:44 ص',
      details: 'توليد وإرسال التقرير اليومي الشامل للفروع السبعة عبر واتساب إلى 00972567943013'
    },
    {
      id: 506,
      user: 'أمير حماد',
      role: 'Accountant',
      branch: 'فرع الدورات التدريبية',
      action: 'FINANCIAL_EXPENSE',
      date: '2026-10-09',
      time: '12:30:10 م',
      details: 'صرف سند مصروفات VOU-TRN-034 بمبلغ 2400 شيكل لتحديث خوادم مختبر الحاسوب'
    }
  ],

  // 12. محتوى البوابة العامة والموقع التعريفي (Public Website Portal)
  publicWebsite: {
    hero: {
      title: 'مجموعة مراكز الصخرة التعليمية',
      subtitle: 'صرحكم الأكاديمي والمهني الرائد نحو التفوق وصناعة المستقبل',
      description: 'نخبة الهيئات التدريسية لمرحلتي التوجيهي والحادي عشر (علمي وأدبي)، إلى جانب أحدث دبلومات التدريب والتطوير المهني والتقني عبر 7 فروع مجهزة بأعلى المعايير.',
      stats: [
        { label: 'فرعاً تعليمياً وتدريبياً', value: '7 فروع' },
        { label: 'طالباً ومتدرباً مسجلاً', value: '+3,000' },
        { label: 'نخبة المحاضرين والمدربين', value: '75+' },
        { label: 'نسبة النجاح والتفوق', value: '99.4%' }
      ]
    },
    aboutUs: {
      title: 'عن مجموعة مراكز الصخرة',
      content: 'تأسست مجموعة مراكز الصخرة التعليمية لتكون الحاضنة التعليمية الأكثر موثوقية في فلسطين. نسعى لتمكين طلاب التوجيهي والثانوي من تحقيق أعلى المراتب الأكاديمية عبر خطط تدريسية حديثة ومكثفة، فضلاً عن تمكين الشباب والخريجين بمهارات العصر عبر قسم الدورات التدريبية المتخصص في البرمجة، والطب، واللغات، وتكنولوجيا المستقبل.'
    },
    programs: [
      {
        title: 'برنامج التوجيهي - الفرع العلمي',
        desc: 'تغطية شاملة ومعمقة للمواد الـ 8 المعتمدة (الرياضيات، الفيزياء، الكيمياء، الأحياء، العربي، الإنجليزي، الدين، والتكنولوجيا) بإشراف كبار مؤلفي المناهج وأساتذة الثانوية العامة.'
      },
      {
        title: 'برنامج التوجيهي - الفرع الأدبي',
        desc: 'شرح ونماذج وتوقعات شاملة للمواد الـ 8 (اللغة العربية، الرياضيات الأدبية، التاريخ، الجغرافيا، الإنجليزية، الدين، الثقافة العلمية، والتكنولوجيا) لضمان حصد المراكز الأولى.'
      },
      {
        title: 'برنامج الصف الحادي عشر (علمي وأدبي)',
        desc: 'التأسيس الأكاديمي المتين الذي يمهد الطريق لعام التوجيهي بسلاسة وتفوق مع معالجة الثغرات التأسيسية.'
      },
      {
        title: 'قسم الدبلومات والدورات التدريبية المعتمدة',
        desc: 'برامج مهنية معتمدة في تكنولوجيا المعلومات والبرمجة، والعلوم الطبية، وتصميم الوسائط، واللغات، وريادة الأعمال.'
      }
    ],
    news: [
      { id: 1, title: 'فتح باب التسجيل المبكر لأفواج التوجيهي للعام الجديد بخصم 20%', date: '10 أكتوبر 2026', tag: 'تسجيل وقبول' },
      { id: 2, title: 'انطلاق دبلوم البرمجة والذكاء الاصطناعي في فرع الدورات التدريبية', date: '08 أكتوبر 2026', tag: 'تدريب مهني' },
      { id: 3, title: 'تكريم أوائل الفروع في الامتحانات الشهرية لمجموعة الصخرة', date: '05 أكتوبر 2026', tag: 'تفوق واحتفال' }
    ]
  }

};
