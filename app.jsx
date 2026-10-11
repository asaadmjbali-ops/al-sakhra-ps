// =======================================================================
// مجموعة مراكز الصخرة التعليمية | Al-Sakhra Educational Centers Management System
// منظومة الإدارة المركزية المتكاملة متعددة الأدوار (Enterprise Multi-Role ERP)
// نظام عزل الفروع الصارم + الحسابات العامة المركزية + الصلاحيات المتقدمة (RBAC)
// =======================================================================

const { useState, useEffect, useMemo, useRef } = React;

// مكون الأيقونات المتجاوب
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    layout: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect width="7" height="9" x="3" y="3" rx="1" strokeWidth="2"/>
        <rect width="7" height="5" x="14" y="3" rx="1" strokeWidth="2"/>
        <rect width="7" height="9" x="14" y="12" rx="1" strokeWidth="2"/>
        <rect width="7" height="5" x="3" y="16" rx="1" strokeWidth="2"/>
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    teacher: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect width="18" height="18" x="3" y="4" rx="2" strokeWidth="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
      </svg>
    ),
    wallet: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect width="20" height="14" x="2" y="6" rx="2" strokeWidth="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 13a2 2 0 100-4 2 2 0 000 4zM6 6V4a2 2 0 012-2h8a2 2 0 012 2v2" />
      </svg>
    ),
    trendingUp: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    barChart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="12" y1="20" x2="12" y2="10" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="20" x2="18" y2="4" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="16" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    award: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="8" r="7" strokeWidth="2"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" strokeWidth="2"/>
      </svg>
    ),
    fileCheck: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    shieldCheck: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="11" cy="11" r="8" strokeWidth="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    ),
    edit: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    printer: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    logOut: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    lock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" strokeWidth="2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    key: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    menu: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    whatsapp: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.059-1.146-.086-.345-.112-.79-.26-1.408-.528-1.782-.772-2.936-2.583-3.025-2.702-.089-.119-.723-.96-.723-1.831 0-.872.457-1.301.62-1.479.163-.178.356-.223.475-.223.119 0 .237.001.341.006.111.005.259-.042.404.307.15.361.514 1.25.559 1.34.045.089.075.193.015.312-.06.119-.089.193-.178.297-.089.104-.187.232-.267.312-.089.089-.182.186-.078.365.104.178.463.763.993 1.236.684.609 1.261.798 1.439.887.178.089.282.074.386-.045.104-.119.445-.519.564-.697.119-.178.237-.148.396-.089.159.059 1.01.476 1.184.564.174.089.29.134.333.208.043.074.043.432-.101.837zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
    alertTriangle: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    eyeOff: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
      </svg>
    )
  };
  return icons[name] || icons.layout;
};

// =======================================================================
// حسابات الدخول الرسمية المعتمدة (Strict Mock Credentials)
// =======================================================================
const MOCK_ACCOUNTS = [
  {
    username: 'alsakhra admin',
    password: 'ahmad1989',
    role: 'super_admin',
    title: 'المدير العام (Super Admin)',
    userName: 'أ. أحمد الصخرة (المدير العام)',
    branchId: 'all',
    branchSlug: 'all',
    branchName: 'جميع الفروع (الإدارة المركزية العامة)',
    canSwitchBranch: true,
    badgeColor: 'bg-amber-500'
  },
  {
    username: 'rimal',
    password: 'rimal2020',
    role: 'branch_manager',
    title: 'مدير فرع الرمال',
    userName: 'أ. سامر مرتجى',
    branchId: 'b1',
    branchSlug: 'rimal',
    branchName: 'فرع الرمال',
    canSwitchBranch: false,
    badgeColor: 'bg-blue-600'
  },
  {
    username: 'nasser',
    password: 'nasser2020',
    role: 'branch_manager',
    title: 'مدير فرع النصر',
    userName: 'أ. خالد أبو شعبان',
    branchId: 'b2',
    branchSlug: 'nasser',
    branchName: 'فرع النصر',
    canSwitchBranch: false,
    badgeColor: 'bg-indigo-600'
  },
  {
    username: 'bahr',
    password: 'bahr2020',
    role: 'branch_manager',
    title: 'مدير فرع البحر',
    userName: 'أ. يوسف ساق الله',
    branchId: 'b3',
    branchSlug: 'bahr',
    branchName: 'فرع البحر',
    canSwitchBranch: false,
    badgeColor: 'bg-cyan-600'
  },
  {
    username: 'saha',
    password: 'saha2020',
    role: 'branch_manager',
    title: 'مدير فرع الساحة',
    userName: 'أ. عبد الله كحيل',
    branchId: 'b4',
    branchSlug: 'saha',
    branchName: 'فرع الساحة',
    canSwitchBranch: false,
    badgeColor: 'bg-emerald-600'
  },
  {
    username: 'talhawa',
    password: 'talhawa2020',
    role: 'branch_manager',
    title: 'مدير فرع تل الهوى',
    userName: 'أ. إيهاب اليازجي',
    branchId: 'b5',
    branchSlug: 'talhawa',
    branchName: 'فرع تل الهوى',
    canSwitchBranch: false,
    badgeColor: 'bg-purple-600'
  },
  {
    username: 'deirbalah',
    password: 'deirbalah2020',
    role: 'branch_manager',
    title: 'مدير فرع دير البلح',
    userName: 'أ. حسام الغصين',
    branchId: 'b6',
    branchSlug: 'deirbalah',
    branchName: 'فرع دير البلح',
    canSwitchBranch: false,
    badgeColor: 'bg-rose-600'
  }
];

// نافذة تأكيد الحذف العامة
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Icon name="alertTriangle" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">{title || 'تأكيد الحذف'}</h3>
            <p className="text-xs text-slate-500 mt-0.5">عملية غير قابلة للتراجع</p>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-700 leading-relaxed mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          {message || 'هل أنت متأكد من رغبتك في حذف هذا السجل نهائياً؟'}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
          >
            إلغاء التراجع
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md shadow-rose-600/30 transition"
          >
            <Icon name="trash" className="w-4 h-4" />
            <span>نعم، حذف نهائي</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =======================================================================
// مكون صفحة تسجيل الدخول الآمنة (Secure Clean Login Page)
// =======================================================================
function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const cleanInputUser = username.trim().toLowerCase().replace(/\s+/g, ' ');
    const user = MOCK_ACCOUNTS.find(
      u => u.username.toLowerCase().replace(/\s+/g, ' ') === cleanInputUser && u.password === password.trim()
    );

    setTimeout(() => {
      setIsSubmitting(false);
      if (user) {
        onLoginSuccess(user, rememberMe);
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التأكد من البيانات والمحاولة مجدداً.');
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#071f40] via-[#0B2D5C] to-[#143d75] flex items-center justify-center p-4 font-sans selection:bg-[#D4A017] selection:text-slate-900" dir="rtl">
      <div className="w-full max-w-md my-8">
        
        {/* بطاقة الدخول المحمية النظيفة */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          
          {/* زخرفة علوية ذهبية */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-linear-to-r from-[#D4A017] via-amber-400 to-[#D4A017]"></div>

          {/* الهيدر والشعار */}
          <div className="text-center mb-6 pt-2">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <img 
                src="./logo.jpg" 
                alt="شعار مجموعة مراكز الصخرة التعليمية" 
                className="w-20 h-20 rounded-2xl object-contain border-2 border-[#D4A017] shadow-xl bg-[#0B2D5C] p-1 mx-auto"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D5C]">مجموعة مراكز الصخرة التعليمية</h1>
            <p className="text-xs font-bold text-[#D4A017] mt-1 tracking-wide">
              بوابة تسجيل الدخول المركزية الموحدة (ERP Portal)
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-bold">
              <Icon name="shieldCheck" className="w-3.5 h-3.5 text-emerald-600" />
              <span>نظام تسجيل دخول مشفّر ومحمي</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2.5">
              <Icon name="alertTriangle" className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* نموذج الدخول */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Icon name="user" className="w-4 h-4 text-slate-500" />
                <span>اسم المستخدم</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C] focus:bg-white focus:ring-2 focus:ring-[#0B2D5C]/15 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Icon name="key" className="w-4 h-4 text-slate-500" />
                <span>كلمة المرور</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C] focus:bg-white focus:ring-2 focus:ring-[#0B2D5C]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition cursor-pointer"
                  title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* خاصية تذكرني (Remember Me) */}
            <div className="flex items-center justify-between pt-1 pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0B2D5C] focus:ring-[#0B2D5C] border-slate-300 accent-[#0B2D5C] cursor-pointer transition"
                />
                <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition">
                  تذكرني (Remember Me)
                </span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                {rememberMe ? 'جلسة محفوظة' : 'جلسة مؤقتة'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] active:bg-[#071f40] text-white font-black text-sm shadow-xl shadow-[#0B2D5C]/25 transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Icon name="lock" className="w-4 h-4 text-[#D4A017]" />
              <span>{isSubmitting ? 'جاري التحقق...' : 'تسجيل الدخول للمنظومة'}</span>
            </button>
          </form>

          {/* تذييل البطاقة الأمني */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-[11px] font-semibold">
            <Icon name="shieldCheck" className="w-4 h-4 text-[#D4A017]" />
            <span>نظام محمي وفق الصلاحيات الإدارية المعتمدة</span>
          </div>

        </div>

        <p className="text-center text-xs text-white/70 font-medium mt-4">
          مجموعة مراكز الصخرة التعليمية © 2026/2027 • علمٌ وخُلق
        </p>
      </div>
    </div>
  );
}

// =======================================================================
// التطبيق الرئيسي (Main App Component)
// =======================================================================
function App() {
  const ERP_DATA = window.AL_SAKHRA_ERP;

  // 1. إدارة جلسة المستخدم واستعادتها التلقائية (Auto-Login on Load)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // فحص localStorage أولاً (في حال تم تفعيل "تذكرني") ثم sessionStorage
      const savedLocal = localStorage.getItem('sakhra_auth_session') || localStorage.getItem('sakhra_erp_user_session');
      if (savedLocal) {
        return JSON.parse(savedLocal);
      }
      const savedSession = sessionStorage.getItem('sakhra_auth_session');
      if (savedSession) {
        return JSON.parse(savedSession);
      }
      return null;
    } catch {
      return null;
    }
  });

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isBranchManager = currentUser?.role === 'branch_manager';

  // 2. إدارة التبويب النشط ومحدد الفروع
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isPublicPortalOpen, setIsPublicPortalOpen] = useState(false);

  // مزامنة الفرع والتبويب حسب دور المستخدم
  useEffect(() => {
    if (!currentUser) return;
    if (isSuperAdmin) {
      setSelectedBranchId('all');
      setActiveTab('dashboard');
      window.location.hash = '#/dashboard';
    } else if (isBranchManager) {
      setSelectedBranchId(currentUser.branchId);
      setActiveTab('branch_dashboard');
      window.location.hash = `#/branch/${currentUser.branchSlug}`;
    }
  }, [currentUser]);

  const handleLogin = (user, rememberMe = true) => {
    setCurrentUser(user);
    try {
      if (rememberMe) {
        localStorage.setItem('sakhra_auth_session', JSON.stringify(user));
        sessionStorage.removeItem('sakhra_auth_session');
      } else {
        sessionStorage.setItem('sakhra_auth_session', JSON.stringify(user));
        localStorage.removeItem('sakhra_auth_session');
      }
      localStorage.removeItem('sakhra_erp_user_session');
    } catch {}
    if (user.role === 'super_admin') {
      setSelectedBranchId('all');
      setActiveTab('dashboard');
      window.location.hash = '#/dashboard';
    } else {
      setSelectedBranchId(user.branchId);
      setActiveTab('branch_dashboard');
      window.location.hash = `#/branch/${user.branchSlug}`;
    }
    showToast(`مرحباً بك: ${user.userName} (${user.title})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sakhra_auth_session');
      localStorage.removeItem('sakhra_erp_user_session');
      sessionStorage.removeItem('sakhra_auth_session');
    } catch {}
    window.location.hash = '';
    showToast('تم تسجيل الخروج بنجاح');
  };

  // 3. حالات البيانات المستقلة مع الـ CRUD الكامل
  const [branches, setBranches] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_branches_db');
      return saved ? JSON.parse(saved) : ERP_DATA.branches;
    } catch {
      return ERP_DATA.branches;
    }
  });

  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_students_db');
      return saved ? JSON.parse(saved) : ERP_DATA.students;
    } catch {
      return ERP_DATA.students;
    }
  });

  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_teachers_db');
      return saved ? JSON.parse(saved) : ERP_DATA.teachers;
    } catch {
      return ERP_DATA.teachers;
    }
  });

  const [trainingList, setTrainingList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_training_db');
      return saved ? JSON.parse(saved) : ERP_DATA.trainingCourses;
    } catch {
      return ERP_DATA.trainingCourses;
    }
  });

  const [schedulesList, setSchedulesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_schedules_db');
      return saved ? JSON.parse(saved) : ERP_DATA.schedules;
    } catch {
      return ERP_DATA.schedules;
    }
  });

  const [attendanceList, setAttendanceList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_attendance_db');
      return saved ? JSON.parse(saved) : ERP_DATA.attendance;
    } catch {
      return ERP_DATA.attendance;
    }
  });

  const [paymentsList, setPaymentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_payments_db');
      return saved ? JSON.parse(saved) : ERP_DATA.payments;
    } catch {
      return ERP_DATA.payments;
    }
  });

  const [expensesList, setExpensesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_expenses_db');
      return saved ? JSON.parse(saved) : ERP_DATA.expenses;
    } catch {
      return ERP_DATA.expenses;
    }
  });

  const [salariesList, setSalariesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhra_salaries_db');
      return saved ? JSON.parse(saved) : ERP_DATA.salaries;
    } catch {
      return ERP_DATA.salaries;
    }
  });

  const [auditLogs, setAuditLogs] = useState(() => ERP_DATA.auditLogs || []);

  useEffect(() => {
    try {
      localStorage.setItem('sakhra_branches_db', JSON.stringify(branches));
      localStorage.setItem('sakhra_students_db', JSON.stringify(students));
      localStorage.setItem('sakhra_teachers_db', JSON.stringify(teachers));
      localStorage.setItem('sakhra_training_db', JSON.stringify(trainingList));
      localStorage.setItem('sakhra_schedules_db', JSON.stringify(schedulesList));
      localStorage.setItem('sakhra_payments_db', JSON.stringify(paymentsList));
      localStorage.setItem('sakhra_expenses_db', JSON.stringify(expensesList));
      localStorage.setItem('sakhra_salaries_db', JSON.stringify(salariesList));
      localStorage.setItem('sakhra_attendance_db', JSON.stringify(attendanceList));
    } catch {}
  }, [branches, students, teachers, trainingList, schedulesList, paymentsList, expensesList, salariesList, attendanceList]);

  const addAuditLog = (action, details) => {
    if (!currentUser) return;
    const newLog = {
      id: auditLogs.length + 501,
      user: currentUser.userName,
      role: currentUser.title,
      branch: currentUser.branchName,
      action: action,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ar-EG'),
      details: details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // تقرير واتساب اليومي الموحد (للسوبر أدمن فقط)
  const generateWhatsAppReport = () => {
    const dateStr = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let totalRev = 0;
    let totalExp = 0;
    branches.filter(b => b.type === 'academic').forEach(b => {
      totalRev += (b.todayRevenue || 0);
      totalExp += (b.todayExpenses || 0);
    });

    let text = `📊 *تقرير الحسابات العامة المركزية - مجموعة مراكز الصخرة التعليمية*
📅 *التاريخ:* ${dateStr}
👤 *المشرف:* ${currentUser?.userName || 'المدير العام'}
━━━━━━━━━━━━━━━━━━━━
💰 *إجمالي الأداء المالي للفروع الـ 6:*
• الإيراد العام المجمع: ${totalRev.toLocaleString('ar-EG')} شيكل
• المصروفات التشغيلية العامة: ${totalExp.toLocaleString('ar-EG')} شيكل
• صافي الأرباح المركزية: ${(totalRev - totalExp).toLocaleString('ar-EG')} شيكل
• إجمالي الطلاب المقيدين: ${students.length} طالباً

━━━━━━━━━━━━━━━━━━━━
🏛️ *البيانات المالية لكل فرع:*
`;
    branches.filter(b => b.type === 'academic').forEach((b, idx) => {
      text += `
${idx + 1}. *${b.name}:*
   - الإيراد: ${(b.todayRevenue || 0).toLocaleString('ar-EG')} شيكل | المصروف: ${(b.todayExpenses || 0).toLocaleString('ar-EG')} شيكل
   - صافي الربح: ${((b.todayRevenue || 0) - (b.todayExpenses || 0)).toLocaleString('ar-EG')} شيكل | المدير: ${b.manager}`;
    });

    text += `

━━━━━━━━━━━━━━━━━━━━
تم التصدير آلياً عبر منظومة الصخرة ERP المركزية.`;
    return text;
  };

  const whatsappText = generateWhatsAppReport();
  const whatsappUrl = `https://wa.me/972567943013?text=${encodeURIComponent(whatsappText)}`;

  // إذا لم يكن هناك جلسة نشطة، عرض شاشة الدخول
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  // إذا كان الموقع التعريفي مفتوحاً
  if (isPublicPortalOpen) {
    return (
      <PublicWebsitePortal 
        onBackToERP={() => setIsPublicPortalOpen(false)} 
        branches={branches}
        publicData={ERP_DATA.publicWebsite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      
      {/* 1. الشريط العلوي لشارة المستخدم والجلسة النشطة */}
      <div className="bg-[#071f40] text-white px-4 py-2 text-xs border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">المستخدم النشط:</span>
          <span className="font-extrabold px-2.5 py-0.5 rounded-md bg-[#0B2D5C] text-[#D4A017] border border-[#D4A017]/40">
            {currentUser.title} • {currentUser.userName}
          </span>
          {isBranchManager ? (
            <span className="bg-blue-900/90 text-blue-200 px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <Icon name="lock" className="w-3 h-3 text-amber-400" />
              <span>نطاق الفرع مقفل: {currentUser.branchName} (عزل أمني تام)</span>
            </span>
          ) : (
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border border-amber-500/30">
              <Icon name="shieldCheck" className="w-3 h-3 text-amber-400" />
              <span>الإدارة المركزية العامة (Master Access)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 text-[11px]">
            <Icon name="shieldCheck" className="w-3.5 h-3.5 text-emerald-400" />
            <span>جلسة موثوقة ومحمية</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs transition shrink-0 cursor-pointer shadow-sm"
            title="تسجيل الخروج والعودة لشاشة الدخول"
          >
            <Icon name="logOut" className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* التوست المنبثق */}
      {toastMessage && (
        <div className="fixed bottom-24 left-6 z-50 animate-fade-in flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-slate-900 text-white border border-slate-700">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toastMessage.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            <Icon name={toastMessage.type === 'error' ? 'alertTriangle' : 'check'} className="w-4 h-4" />
          </div>
          <p className="font-semibold text-sm">{toastMessage.msg}</p>
        </div>
      )}

      {/* زر الواتساب العائم FAB (متاح للسوبر أدمن فقط) */}
      {isSuperAdmin && (
        <aside className="fixed bottom-6 left-6 z-40">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => addAuditLog('WHATSAPP_REPORT', 'فتح واتساب لإرسال التقرير اليومي العام')}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30"
            title="إرسال تقرير الحسابات العامة عبر واتساب (00972567943013)"
          >
            <div className="relative flex items-center justify-center">
              <Icon name="whatsapp" className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black leading-tight">إرسال التقرير العام عبر واتساب</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-black/15 font-bold">Admin Report</span>
              </div>
              <span className="text-[10px] text-white/90 font-medium block">
                الإدارة المركزية (00972567943013)
              </span>
            </div>
          </a>
        </aside>
      )}

      {/* شريط الملاحة الرئيسي Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="فتح القائمة"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <img 
                src="./logo.jpg" 
                alt="شعار مجموعة مراكز الصخرة التعليمية" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain border-2 border-[#D4A017] shadow-lg bg-[#0B2D5C] p-0.5" 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-[#0B2D5C] tracking-tight">مجموعة مراكز الصخرة التعليمية</h1>
                  <span className="hidden sm:inline-flex text-[11px] font-black px-2 py-0.5 rounded-full bg-[#D4A017]/15 text-[#b5850e] border border-[#D4A017]/30">
                    منظومة ERP
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  {isSuperAdmin ? 'لوحة التحكم المركزية • جميع الفروع الـ 6' : `بوابة ${currentUser.branchName} المستقلة`}
                </p>
              </div>
            </div>
          </div>

          {/* محدد الفروع: يظهر فقط للسوبر أدمن، ومخفي تماماً عن مدراء الفروع بناء على المتطلبات */}
          {isSuperAdmin && (
            <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <Icon name="building" className="w-4 h-4 text-slate-500 mr-1" />
              <span className="text-xs font-bold text-slate-600">نطاق الاستعراض:</span>
              <select
                value={selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  showToast(`تم التبديل إلى: ${e.target.options[e.target.selectedIndex].text}`);
                }}
                className="bg-transparent text-xs font-bold text-[#0B2D5C] focus:outline-none cursor-pointer"
              >
                <option value="all">جميع الفروع (المركز العام المجمع)</option>
                {branches.filter(b => b.type === 'academic').map(b => (
                  <option key={b.id} value={b.id} className="text-slate-800">{b.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* للمدير الفرعي: لافتة قفل الفرع التام */}
          {isBranchManager && (
            <div className="hidden md:flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
              <Icon name="lock" className="w-4 h-4 text-[#0B2D5C]" />
              <span className="text-xs font-black text-[#0B2D5C]">
                {currentUser.branchName} (صفحة مخصصة معزولة)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            {isSuperAdmin && (
              <button 
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                title="معاينة تقرير الحسابات العامة"
              >
                <span>معاينة التقرير العام</span>
              </button>
            )}

            <button
              onClick={() => setIsPublicPortalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4A017] hover:bg-[#b5850e] text-slate-950 font-black transition text-xs shadow-xs"
            >
              <Icon name="layout" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الموقع التعريفي</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B2D5C] text-[#D4A017] font-black flex items-center justify-center text-sm shadow">
                {currentUser.userName.split(' ')[0]?.[0] || 'ص'}
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.userName}</p>
                <span className="text-[11px] font-semibold text-[#D4A017]">{currentUser.title}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-xs transition border border-rose-200 cursor-pointer shadow-xs"
              title="تسجيل الخروج من المنظومة"
            >
              <Icon name="logOut" className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>

        </div>
      </header>

      {/* تخطيط التطبيق الرئيسي (Sidebar + Main Content) */}
      <div className="flex-1 flex overflow-hidden">

        {/* الشريط الجانبي الأيمن المتغير ديناميكياً حسب نوع المستخدم */}
        <aside className={`
          fixed lg:static top-20 right-0 z-30 w-72 h-[calc(100vh-5rem)] bg-white border-l border-slate-200 
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-1.5 overflow-y-auto">
            
            {/* في حال كان مدير فرع (Branch Manager Sidebar) */}
            {isBranchManager ? (
              <>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl mb-3">
                  <div className="flex items-center gap-2 text-[#0B2D5C] font-black text-xs">
                    <Icon name="building" className="w-4 h-4 text-[#0B2D5C]" />
                    <span>لوحة فرع: {currentUser.branchName}</span>
                  </div>
                  <p className="text-[10px] text-blue-700 mt-0.5">
                    جميع البيانات محصورة بالكامل داخل هذا الفرع
                  </p>
                </div>

                {[
                  { id: 'branch_dashboard', label: `لوحة فرع ${currentUser.branchName.replace('فرع ', '')}`, icon: 'layout', hash: `#/branch/${currentUser.branchSlug}` },
                  { id: 'students', label: 'طلاب الفرع والقبول', icon: 'users', count: students.filter(s => s.branchId === currentUser.branchId).length, hash: `#/branch/${currentUser.branchSlug}/students` },
                  { id: 'teachers', label: 'كادر الفرع التدريسي', icon: 'teacher', count: teachers.filter(t => t.assignedBranches && t.assignedBranches.includes(currentUser.branchName)).length, hash: `#/branch/${currentUser.branchSlug}/teachers` },
                  { id: 'schedules', label: 'جدول حصص ومواعيد الفرع', icon: 'calendar', count: schedulesList.filter(s => s.branchId === currentUser.branchId).length, hash: `#/branch/${currentUser.branchSlug}/schedules` },
                  { id: 'financials', label: 'مالية وخزينة الفرع', icon: 'wallet', badge: 'شيكل', hash: `#/branch/${currentUser.branchSlug}/financials` },
                ].map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        window.location.hash = item.hash;
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all
                        ${isActive 
                          ? 'bg-[#0B2D5C] text-white shadow-md shadow-[#0B2D5C]/30' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon} className={`w-5 h-5 ${isActive ? 'text-[#D4A017]' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-[#D4A017] text-slate-950 font-black' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-[#D4A017] text-slate-950 font-black' : 'bg-slate-200/80 text-slate-700'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </>
            ) : (
              // في حال كان المدير العام (Super Admin Sidebar)
              <>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pt-2">
                  الإدارة المركزية العامة
                </p>

                {[
                  { id: 'dashboard', label: 'لوحة التحكم المركزية (Master)', icon: 'layout', badge: 'عام', hash: '#/dashboard' },
                  { id: 'global_financials', label: 'الحسابات العامة (المجمعة)', icon: 'barChart', highlightGold: true, badge: 'جديد', hash: '#/global-financials' },
                  { id: 'branches', label: 'إدارة الفروع الـ 6 المستقلة', icon: 'building', count: branches.length, hash: '#/branches' },
                  { id: 'students', label: 'شؤون الطلاب المركزية', icon: 'users', count: students.length, hash: '#/students' },
                  { id: 'teachers', label: 'هيئة التدريس والمحاضرين', icon: 'teacher', count: teachers.length, hash: '#/teachers' },
                  { id: 'training', label: 'فرع الدورات التدريبية', icon: 'award', count: trainingList.length, highlight: true, hash: '#/training' },
                  { id: 'schedules', label: 'الجداول ومواعيد القاعات', icon: 'calendar', count: schedulesList.length, hash: '#/schedules' },
                  { id: 'financials', label: 'الخزينة والحركات المالية', icon: 'wallet', badge: 'شيكل', hash: '#/financials' },
                  { id: 'audit', label: 'سجل الرقابة والتدقيق (Audit)', icon: 'shieldCheck', badge: 'Admin', restricted: true, hash: '#/audit' },
                ].map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        window.location.hash = item.hash;
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all
                        ${isActive 
                          ? 'bg-[#0B2D5C] text-white shadow-md shadow-[#0B2D5C]/30' 
                          : item.highlightGold
                            ? 'text-amber-950 bg-amber-100/70 hover:bg-amber-100 border border-[#D4A017]/40'
                            : item.restricted
                              ? 'text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/60'
                              : item.highlight 
                                ? 'text-blue-900 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/50'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon} className={`w-5 h-5 ${isActive ? 'text-[#D4A017]' : item.highlightGold ? 'text-amber-700' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-[#D4A017] text-slate-950 font-black' : item.highlightGold ? 'bg-[#D4A017] text-slate-950 font-black' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-[#D4A017] text-slate-950 font-black' : 'bg-slate-200/80 text-slate-700'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* أسفل الشريط الجانبي: زر تسجيل الخروج والحالة */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 m-3 rounded-2xl border">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800">
                {isBranchManager ? `متصل: ${currentUser.branchName}` : 'المنظومة المركزية متصلة بالكامل'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              {isBranchManager ? 'البيانات محمية ومعزولة وفق قواعد الأمان.' : 'إدارة شاملة وتحكم بجميع الفروع والمحاسبة.'}
            </p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs transition"
            >
              <Icon name="logOut" className="w-4 h-4" />
              <span>تسجيل الخروج من المنظومة</span>
            </button>
          </div>
        </aside>

        {/* خلفية معتمة للموبايل */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-20 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* منطقة المحتوى النشطة */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* صفحة فرع محدد للمدير الفرعي (Branch Dedicated Page) */}
            {isBranchManager && activeTab === 'branch_dashboard' && (
              <BranchDedicatedView 
                branchId={currentUser.branchId}
                branches={branches}
                currentUser={currentUser}
                students={students}
                teachers={teachers}
                schedules={schedulesList}
                payments={paymentsList}
                expenses={expensesList}
                setActiveTab={setActiveTab}
                showToast={showToast}
              />
            )}

            {/* الصفحة المخصصة: الحسابات العامة (Global Financials) - Super Admin Only */}
            {isSuperAdmin && activeTab === 'global_financials' && (
              <GlobalFinancialsView 
                branches={branches}
                payments={paymentsList}
                expenses={expensesList}
                salaries={salariesList}
                students={students}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* لوحة التحكم المركزية للسوبر أدمن */}
            {isSuperAdmin && activeTab === 'dashboard' && (
              <MasterDashboardView 
                branches={branches}
                selectedBranchId={selectedBranchId}
                students={students} 
                teachers={teachers} 
                trainingList={trainingList}
                payments={paymentsList}
                expenses={expensesList}
                setActiveTab={setActiveTab}
                showToast={showToast}
              />
            )}

            {/* إدارة الفروع (Super Admin Only) */}
            {isSuperAdmin && activeTab === 'branches' && (
              <BranchesView 
                branches={branches}
                setBranches={setBranches}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* الطلاب */}
            {activeTab === 'students' && (
              <StudentsView 
                branches={branches}
                currentUser={currentUser}
                selectedBranchId={selectedBranchId}
                students={students} 
                setStudents={setStudents}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* هيئة التدريس */}
            {activeTab === 'teachers' && (
              <TeachersView 
                branches={branches}
                currentUser={currentUser}
                selectedBranchId={selectedBranchId}
                teachers={teachers} 
                setTeachers={setTeachers}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* قسم الدورات (Super Admin Only) */}
            {isSuperAdmin && activeTab === 'training' && (
              <TrainingView 
                branches={branches}
                currentUser={currentUser}
                selectedBranchId={selectedBranchId}
                trainingList={trainingList} 
                setTrainingList={setTrainingList}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* الجداول */}
            {activeTab === 'schedules' && (
              <SchedulesView 
                branches={branches}
                currentUser={currentUser}
                selectedBranchId={selectedBranchId}
                schedules={schedulesList} 
                setSchedules={setSchedulesList}
                teachers={teachers}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* المالية */}
            {activeTab === 'financials' && (
              <FinancialsView 
                branches={branches}
                currentUser={currentUser}
                selectedBranchId={selectedBranchId}
                payments={paymentsList}
                setPayments={setPaymentsList}
                expenses={expensesList}
                setExpenses={setExpensesList}
                salaries={salariesList}
                setSalaries={setSalariesList}
                students={students}
                showToast={showToast}
                addAuditLog={addAuditLog}
              />
            )}

            {/* سجل الرقابة */}
            {isSuperAdmin && activeTab === 'audit' && (
              <AuditLogsView 
                auditLogs={auditLogs}
                showToast={showToast}
              />
            )}

          </div>
        </main>

      </div>

      {/* نافذة معاينة تقرير الواتساب التفاعلية */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src="./logo.jpg" 
                  alt="شعار مجموعة مراكز الصخرة التعليمية" 
                  className="w-11 h-11 rounded-xl object-contain border border-[#D4A017] shadow-sm bg-[#0B2D5C] p-0.5 shrink-0" 
                />
                <div>
                  <h3 className="text-base font-black text-slate-900">تقرير الحسابات العامة الموحد للإدارة</h3>
                  <p className="text-xs text-slate-500">رقم الإدارة المعتمد: 00972567943013 (+972567943013)</p>
                </div>
              </div>
              <button onClick={() => setIsWhatsAppModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap max-h-96 overflow-y-auto mb-6">
              {whatsappText}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(whatsappText);
                  showToast('تم نسخ نص التقرير إلى الحافظة بنجاح');
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                نسخ النص
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsWhatsAppModalOpen(false);
                  addAuditLog('WHATSAPP_REPORT', 'تم إرسال التقرير عبر واتساب');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md shadow-[#25D366]/30 transition"
              >
                <Icon name="whatsapp" className="w-4 h-4 text-white" />
                <span>إرسال التقرير عبر واتساب الآن</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------
// 2. الصفحة المخصصة: الحسابات العامة (Global Financials - Super Admin Only)
// -------------------------------------------------------------
function GlobalFinancialsView({ branches, payments, expenses, salaries, students, showToast, addAuditLog }) {
  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // حساب الحسابات المالية المجمعة للفروع الـ 6 الأكاديمية
  const academicBranches = useMemo(() => {
    return branches.filter(b => b.type === 'academic');
  }, [branches]);

  const globalStats = useMemo(() => {
    let totalRevenue = 0;
    let totalExpenses = 0;
    
    academicBranches.forEach(b => {
      totalRevenue += (b.todayRevenue || 0);
      totalExpenses += (b.todayExpenses || 0);
    });

    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin
    };
  }, [academicBranches]);

  // رسم المخطط البياني المقارن (Comparative Chart)
  useEffect(() => {
    if (!chartCanvasRef.current || !window.Chart) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = academicBranches.map(b => b.name);
    const revenues = academicBranches.map(b => b.todayRevenue || 0);
    const exps = academicBranches.map(b => b.todayExpenses || 0);
    const profits = academicBranches.map(b => (b.todayRevenue || 0) - (b.todayExpenses || 0));

    const ctx = chartCanvasRef.current.getContext('2d');
    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'الإيرادات المحصلة (شيكل)',
            data: revenues,
            backgroundColor: '#0B2D5C',
            borderRadius: 8,
            borderSkipped: false
          },
          {
            label: 'المصروفات التشغيلية (شيكل)',
            data: exps,
            backgroundColor: '#e11d48',
            borderRadius: 8,
            borderSkipped: false
          },
          {
            label: 'صافي الربح المالي (شيكل)',
            data: profits,
            backgroundColor: '#D4A017',
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            rtl: true,
            labels: {
              font: { family: 'Cairo', weight: 'bold', size: 12 },
              usePointStyle: true,
              padding: 18
            }
          },
          tooltip: {
            rtl: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw.toLocaleString('ar-EG')} شيكل`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Cairo', weight: 'bold', size: 11 } }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              font: { family: 'Cairo', size: 10 },
              callback: function(val) { return val.toLocaleString('ar-EG') + ' ₪'; }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [academicBranches]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* رأس الصفحة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              خاص بالمدير العام (Super Admin)
            </span>
            <span className="text-xs text-slate-400">التحديث المالي اللحظي</span>
          </div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">الحسابات العامة والمركز المالي المجمع (Global Financials)</h2>
          <p className="text-xs text-slate-500 mt-1">
            تحليل شامل ومقارن للأداء المالي، الإيرادات، النفقات، وصافي الأرباح لجميع الفروع الـ 6 التابعة لمجموعة الصخرة
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md"
        >
          <Icon name="printer" className="w-4 h-4" />
          <span>طباعة التقرير المالي المجمع</span>
        </button>
      </div>

      {/* بطاقات المؤشرات المالية المجمعة الكبرى (Aggregated KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* إجمالي الإيرادات */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">إجمالي الإيرادات العامة</span>
            <div className="w-10 h-10 rounded-xl bg-[#0B2D5C]/10 text-[#0B2D5C] flex items-center justify-center">
              <Icon name="wallet" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            {globalStats.totalRevenue.toLocaleString('ar-EG')} <span className="text-sm font-semibold text-slate-400">شيكل</span>
          </h3>
          <p className="text-[11px] text-emerald-600 mt-2 font-bold flex items-center gap-1">
            <Icon name="trendingUp" className="w-3.5 h-3.5" />
            <span>مجموع تحصيلات الفروع الـ 6</span>
          </p>
        </div>

        {/* إجمالي المصروفات */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">إجمالي المصروفات العامة</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Icon name="wallet" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-rose-600">
            {globalStats.totalExpenses.toLocaleString('ar-EG')} <span className="text-sm font-semibold text-slate-400">شيكل</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">تشغيل، طاقة، رواتب، وصيانة</p>
        </div>

        {/* صافي الربح المركزي */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A017] shadow-md bg-linear-to-b from-white to-amber-50/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700">صافي الأرباح المركزية</span>
            <div className="w-10 h-10 rounded-xl bg-[#D4A017]/20 text-[#b5850e] flex items-center justify-center font-black">
              ★
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            {globalStats.netProfit.toLocaleString('ar-EG')} <span className="text-sm font-semibold text-[#D4A017]">شيكل</span>
          </h3>
          <p className="text-[11px] text-emerald-700 mt-2 font-bold">
            صافي الفائض التشغيلي المجمع
          </p>
        </div>

        {/* هامش الربح الإجمالي */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">معدل العائد والربحية</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon name="trendingUp" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-indigo-700">
            %{globalStats.profitMargin}
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">كفاءة تشغيلية ممتازة</p>
        </div>

      </div>

      {/* المخطط البياني المقارن جنباً إلى جنب (Comparative Side-by-Side Chart) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-black text-[#0B2D5C]">
              المقارنة المالية التفاعلية للفروع الـ 6 جنباً إلى جنب (Side-by-Side Performance)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              مقارنة الإيرادات مقابل المصروفات وصافي الفائض لكل فرع بشكل مرئي مباشر
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
            بيانات اليوم الفعلية
          </span>
        </div>

        <div className="h-80 sm:h-96 w-full">
          <canvas ref={chartCanvasRef}></canvas>
        </div>
      </div>

      {/* جدول المقارنة التفصيلي للفروع الـ 6 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#0B2D5C]">جدول كشف الحساب المقارن للفروع الـ 6</h3>
            <p className="text-xs text-slate-400 mt-0.5">تفصيل الإيراد، النفقات، الربح الصافي، ونسبة الربحية لكل فرع</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                <th className="py-4 px-6">الفرع</th>
                <th className="py-4 px-6">المدير المسؤول</th>
                <th className="py-4 px-6">الطلاب المقيدون</th>
                <th className="py-4 px-6">الإيراد اليومي</th>
                <th className="py-4 px-6">المصروفات</th>
                <th className="py-4 px-6">صافي الربح</th>
                <th className="py-4 px-6">هامش الربح</th>
                <th className="py-4 px-6 text-center">مؤشر الكفاءة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {academicBranches.map(branch => {
                const rev = branch.todayRevenue || 0;
                const exp = branch.todayExpenses || 0;
                const profit = rev - exp;
                const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : 0;
                return (
                  <tr key={branch.id} className="table-row-hover">
                    <td className="py-4 px-6 font-extrabold text-[#0B2D5C]">{branch.name}</td>
                    <td className="py-4 px-6 text-slate-600">{branch.manager}</td>
                    <td className="py-4 px-6 font-black text-slate-900">{branch.activeStudents} طالب</td>
                    <td className="py-4 px-6 text-emerald-600 font-black">+{rev.toLocaleString('ar-EG')} ₪</td>
                    <td className="py-4 px-6 text-rose-600 font-black">-{exp.toLocaleString('ar-EG')} ₪</td>
                    <td className="py-4 px-6 font-black text-[#0B2D5C]">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0B2D5C] border border-blue-100">
                        {profit.toLocaleString('ar-EG')} ₪
                      </span>
                    </td>
                    <td className="py-4 px-6 font-black text-indigo-700">%{margin}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        كفاءة عالية (ممتاز)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-black text-xs text-slate-900 border-t-2 border-slate-300">
                <td className="py-4 px-6" colSpan="3">الإجمالي العام لجميع الفروع الـ 6:</td>
                <td className="py-4 px-6 text-emerald-700">+{globalStats.totalRevenue.toLocaleString('ar-EG')} ₪</td>
                <td className="py-4 px-6 text-rose-700">-{globalStats.totalExpenses.toLocaleString('ar-EG')} ₪</td>
                <td className="py-4 px-6 text-[#0B2D5C]">
                  <span className="px-3 py-1 rounded-lg bg-[#D4A017] text-slate-950 font-black">
                    {globalStats.netProfit.toLocaleString('ar-EG')} ₪
                  </span>
                </td>
                <td className="py-4 px-6 text-indigo-900">%{globalStats.profitMargin}</td>
                <td className="py-4 px-6 text-center">100% متطابق</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 3. صفحة الفرع المستقلة لمدير الفرع (Dedicated Branch Page)
// -------------------------------------------------------------
function BranchDedicatedView({ branchId, branches, currentUser, students, teachers, schedules, payments, expenses, setActiveTab, showToast }) {
  const currentBranch = useMemo(() => {
    return branches.find(b => b.id === branchId) || branches[0];
  }, [branches, branchId]);

  const branchStudents = useMemo(() => students.filter(s => s.branchId === branchId), [students, branchId]);
  const branchTeachers = useMemo(() => teachers.filter(t => t.assignedBranches && t.assignedBranches.includes(currentBranch.name)), [teachers, currentBranch]);
  const branchSchedules = useMemo(() => schedules.filter(s => s.branchId === branchId), [schedules, branchId]);
  const branchPayments = useMemo(() => payments.filter(p => p.branchId === branchId), [payments, branchId]);
  const branchExpenses = useMemo(() => expenses.filter(e => e.branchId === branchId), [expenses, branchId]);

  const rev = currentBranch.todayRevenue || 0;
  const exp = currentBranch.todayExpenses || 0;
  const profit = rev - exp;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* بطاقة الفرع المخصصة */}
      <div className="bg-linear-to-r from-[#0B2D5C] to-[#143d75] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#D4A017] text-slate-950">
              صفحة الفرع المستقلة
            </span>
            <span className="text-xs text-blue-200">🔒 بيانات الفرع معزولة بالكامل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentBranch.name} • لوحة الإدارة
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            المدير المسؤول: <span className="font-bold text-[#D4A017]">{currentBranch.manager}</span> • هاتف الفرع: <span dir="ltr">{currentBranch.phone}</span> • العنوان: {currentBranch.address}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button 
            onClick={() => setActiveTab('students')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A017] hover:bg-[#b5850e] text-slate-950 font-black text-xs transition shadow-md"
          >
            <Icon name="users" className="w-4 h-4" />
            <span>تسجيل طالب بالفرع</span>
          </button>
        </div>
      </div>

      {/* بطاقات مؤشرات الفرع المستقلة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">طلاب الفرع المقيدون</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2D5C] flex items-center justify-center">
              <Icon name="users" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            {branchStudents.length} <span className="text-sm font-semibold text-slate-400">طالب</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">في {currentBranch.name} حصرياً</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">كادر المدرسين بالفرع</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center">
              <Icon name="teacher" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {branchTeachers.length} <span className="text-sm font-semibold text-slate-400">محاضر</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">معينون لتدريس شعب الفرع</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">إيرادات خزانة الفرع</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon name="wallet" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {rev.toLocaleString('ar-EG')} <span className="text-sm font-bold text-slate-500">شيكل</span>
          </h3>
          <p className="text-[11px] text-emerald-600 mt-2 font-bold">
            صافي الفائض: {profit.toLocaleString('ar-EG')} شيكل
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">نسبة الانضباط والحضور</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon name="clock" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            %{currentBranch.attendanceRate || 95}
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">{currentBranch.hallsCount || 6} قاعات مجهزة بالفرع</p>
        </div>

      </div>

      {/* جداول ملخصة وسريعة للفرع */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* جدول الطلاب الأخير في الفرع */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black text-[#0B2D5C]">أحدث الطلاب المسجلين بالفرع</h3>
            <button
              onClick={() => setActiveTab('students')}
              className="text-xs font-bold text-[#D4A017] hover:underline"
            >
              عرض الكل ({branchStudents.length})
            </button>
          </div>

          <div className="space-y-3">
            {branchStudents.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B2D5C] text-white flex items-center justify-center font-bold text-xs">
                    {s.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{s.name}</h4>
                    <p className="text-[10px] text-slate-400">{s.levelNameAr || s.level}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600">{s.paidAmount} ₪</span>
              </div>
            ))}
          </div>
        </div>

        {/* جدول المواعيد والحصص اليومية بالفرع */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black text-[#0B2D5C]">جدول حصص ومحاضرات الفرع</h3>
            <button
              onClick={() => setActiveTab('schedules')}
              className="text-xs font-bold text-[#D4A017] hover:underline"
            >
              عرض الجدول ({branchSchedules.length})
            </button>
          </div>

          <div className="space-y-3">
            {branchSchedules.slice(0, 5).map(sch => (
              <div key={sch.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 text-[#0B2D5C]">
                      {sch.day} • {sch.time}
                    </span>
                    <h4 className="font-black text-xs text-slate-900">{sch.subject}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">المحاضر: {sch.teacher} • {sch.hall}</p>
                </div>
                <span className="text-[11px] font-bold text-slate-500">{sch.gradeAr}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 4. لوحة التحكم المركزية للسوبر أدمن (Master Dashboard View)
// -------------------------------------------------------------
function MasterDashboardView({ branches, selectedBranchId, students, teachers, trainingList, payments, expenses, setActiveTab, showToast }) {
  const currentBranch = useMemo(() => {
    if (selectedBranchId === 'all') return null;
    return branches.find(b => b.id === selectedBranchId) || branches[0];
  }, [selectedBranchId, branches]);

  const stats = useMemo(() => {
    if (currentBranch) {
      return {
        totalStudents: students.filter(s => s.branchId === currentBranch.id).length,
        totalTeachers: teachers.filter(t => t.assignedBranches && t.assignedBranches.includes(currentBranch.name)).length,
        revenue: currentBranch.todayRevenue || 12000,
        expenses: currentBranch.todayExpenses || 3000,
        attendanceRate: currentBranch.attendanceRate || 95.5,
        halls: currentBranch.hallsCount || 6
      };
    } else {
      let totalRev = 0;
      let totalExp = 0;
      branches.forEach(b => {
        totalRev += (b.todayRevenue || 0);
        totalExp += (b.todayExpenses || 0);
      });
      return {
        totalStudents: students.length,
        totalTeachers: teachers.length,
        revenue: totalRev,
        expenses: totalExp,
        attendanceRate: 95.8,
        halls: branches.reduce((acc, b) => acc + (b.hallsCount || 6), 0)
      };
    }
  }, [currentBranch, branches, students, teachers]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* بطاقة الترحيب */}
      <div className="bg-linear-to-r from-[#0B2D5C] to-[#143d75] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#D4A017] text-slate-950">
              👑 الإدارة المركزية العامة (Master)
            </span>
            <span className="text-xs text-slate-300">العام الأكاديمي 2026/2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            لوحة القيادة المركزية للفروع الـ 6
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            {currentBranch 
              ? `أنت تستعرض الآن بيانات الفرع المحدد (${currentBranch.name}) - نسبة الانضباط %${stats.attendanceRate}`
              : `نظام المتابعة الشامل لجميع الفروع الـ 6، والتحكم بالصلاحيات والحسابات العامة المجمعة.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button 
            onClick={() => setActiveTab('global_financials')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A017] hover:bg-[#b5850e] text-slate-950 font-black text-xs transition shadow-md"
          >
            <Icon name="barChart" className="w-4 h-4" />
            <span>عرض الحسابات العامة</span>
          </button>
        </div>
      </div>

      {/* بطاقات المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">الطلاب المقيدون</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2D5C] flex items-center justify-center">
              <Icon name="users" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            {stats.totalStudents} <span className="text-sm font-semibold text-slate-400">طالب</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            {currentBranch ? `في ${currentBranch.name}` : 'موزعون على الفروع الـ 6'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">الكادر التدريسي</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center">
              <Icon name="teacher" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {stats.totalTeachers} <span className="text-sm font-semibold text-slate-400">محاضر</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">نخبة مؤلفي المناهج والتوجيهي</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">إيرادات اليوم</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon name="wallet" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {stats.revenue.toLocaleString('ar-EG')} <span className="text-sm font-bold text-slate-500">شيكل</span>
          </h3>
          <p className="text-[11px] text-emerald-600 mt-2 font-bold">
            صافي: {(stats.revenue - stats.expenses).toLocaleString('ar-EG')} شيكل
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500">نسبة الانضباط والحضور</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon name="clock" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-[#0B2D5C]">
            %{stats.attendanceRate}
          </h3>
          <p className="text-[11px] text-slate-400 mt-2 font-medium">{stats.halls} قاعة دراسية مجهزة</p>
        </div>

      </div>

      {/* استعراض بطاقات الفروع الـ 6 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-[#0B2D5C]">الفروع الـ 6 المستقلة لمجموعة الصخرة</h3>
            <p className="text-xs text-slate-400">نظرة عامة سريعة على تدفقات الإيرادات اليومية والمدراء المسؤولين</p>
          </div>
          <button
            onClick={() => setActiveTab('global_financials')}
            className="text-xs font-black text-[#0B2D5C] hover:text-[#D4A017] transition flex items-center gap-1"
          >
            <span>تقرير المقارنة التفصيلي (الحسابات العامة)</span>
            <span>←</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.filter(b => b.type === 'academic').map(b => (
            <div key={b.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#D4A017] transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-black text-sm text-[#0B2D5C]">{b.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  %{b.attendanceRate || 95}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">المدير: {b.manager} • {b.address}</p>
              <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-200">
                <span className="text-slate-400">الإيراد اليومي:</span>
                <span className="font-black text-emerald-600">{(b.todayRevenue || 0).toLocaleString('ar-EG')} شيكل</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 5. إدارة الفروع الـ 6 (Branches CRUD - Super Admin Only)
// -------------------------------------------------------------
function BranchesView({ branches, setBranches, showToast, addAuditLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const initialForm = {
    name: '',
    code: '',
    manager: '',
    phone: '',
    address: '',
    hallsCount: 6,
    todayRevenue: 10000,
    todayExpenses: 2500,
    attendanceRate: 95.0,
    type: 'academic'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingBranch(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      code: branch.code || '',
      manager: branch.manager || '',
      phone: branch.phone || '',
      address: branch.address || '',
      hallsCount: branch.hallsCount || 6,
      todayRevenue: branch.todayRevenue || 0,
      todayExpenses: branch.todayExpenses || 0,
      attendanceRate: branch.attendanceRate || 95,
      type: branch.type || 'academic'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches(prev => prev.map(b => b.id === editingBranch.id ? { ...b, ...formData } : b));
      showToast(`تم تحديث بيانات الفرع "${formData.name}" بنجاح`);
      addAuditLog('UPDATE_BRANCH', `تعديل بيانات ${formData.name}`);
    } else {
      const newBranch = {
        id: `b${branches.length + 1}`,
        activeStudents: 0,
        ...formData
      };
      setBranches(prev => [...prev, newBranch]);
      showToast(`تمت إضافة الفرع "${formData.name}" بنجاح`);
      addAuditLog('CREATE_BRANCH', `إضافة فرع جديد: ${formData.name}`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setBranches(prev => prev.filter(b => b.id !== deleteTarget.id));
    showToast(`تم حذف الفرع "${deleteTarget.name}"`, 'error');
    addAuditLog('DELETE_BRANCH', `حذف الفرع ${deleteTarget.name} (${deleteTarget.id})`);
    setDeleteTarget(null);
  };

  const filteredBranches = useMemo(() => {
    return branches.filter(b => 
      b.name.includes(searchTerm) || b.manager.includes(searchTerm) || b.address.includes(searchTerm)
    );
  }, [branches, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">إدارة الفروع المستقلة (Branches CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            الفروع الـ 6 الأكاديمية وقسم التدريب مع إمكانية الإضافة والتعديل والحذف وتخصيص المدراء
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-sm shadow-md transition"
        >
          <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
          <span>إضافة فرع جديد</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative">
          <Icon name="search" className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الفرع، المدير المسؤول، أو العنوان..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBranches.map(branch => (
          <div key={branch.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2D5C] text-[#D4A017] flex items-center justify-center font-black shadow">
                    <Icon name="building" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0B2D5C]">{branch.name}</h3>
                    <span className="text-[11px] font-bold text-slate-500">
                      المدير: {branch.manager}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${branch.type === 'training' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                  {branch.type === 'training' ? 'دورات مهنية' : 'أكاديمي'}
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">العنوان:</span>
                  <span className="font-bold text-slate-800 text-[11px]">{branch.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">هاتف الفرع:</span>
                  <span className="font-mono font-bold text-slate-800" dir="ltr">{branch.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">القاعات المجهزة:</span>
                  <span className="font-bold text-[#0B2D5C]">{branch.hallsCount || 6} قاعات</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">نسبة الانضباط:</span>
                  <span className="font-bold text-emerald-600">%{branch.attendanceRate || 95}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
              <div>
                <span className="text-[10px] text-slate-400 block">الإيراد اليومي</span>
                <span className="text-xs font-black text-emerald-600">{(branch.todayRevenue || 0).toLocaleString('ar-EG')} شيكل</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(branch)}
                  className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition"
                  title="تعديل الفرع"
                >
                  <Icon name="edit" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(branch)}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition"
                  title="حذف الفرع"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingBranch ? 'تعديل بيانات الفرع' : 'إضافة فرع جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الفرع *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: فرع الرمال"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">كود الفرع (Code)</label>
                  <input
                    type="text"
                    placeholder="مثال: RIMAL"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المدير المسؤول *</label>
                  <input
                    type="text"
                    required
                    placeholder="أ. سامر مرتجى"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الفرع *</label>
                  <input
                    type="text"
                    required
                    placeholder="059xxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">العنوان والموقع *</label>
                <input
                  type="text"
                  required
                  placeholder="غزة - شارع عمر المختار"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عدد القاعات</label>
                  <input
                    type="number"
                    value={formData.hallsCount}
                    onChange={(e) => setFormData({ ...formData, hallsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الإيراد اليومي</label>
                  <input
                    type="number"
                    value={formData.todayRevenue}
                    onChange={(e) => setFormData({ ...formData, todayRevenue: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع الفرع</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="academic">أكاديمي وثانوي</option>
                    <option value="training">دورات وتدريب</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingBranch ? 'حفظ التعديلات' : 'إضافة الفرع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`حذف فرع "${deleteTarget?.name}"`}
        message={`هل أنت متأكد من حذف فرع ${deleteTarget?.name} نهائياً؟ سيتم إلغاء ارتباطه بالنظام.`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 6. شؤون وقبول الطلاب (Students Module - Full CRUD & Isolated)
// -------------------------------------------------------------
function StudentsView({ branches, currentUser, selectedBranchId, students, setStudents, showToast, addAuditLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isBranchLocked = currentUser.role === 'branch_manager';
  const defaultBranchId = isBranchLocked ? currentUser.branchId : (selectedBranchId === 'all' ? 'b1' : selectedBranchId);

  const initialForm = {
    name: '',
    phone: '',
    parentPhone: '',
    branchId: defaultBranchId,
    level: 'توجيهي علمي',
    className: 'شعبة أ - قاعة القدس',
    totalFees: 1200,
    paidAmount: 800,
    status: 'active',
    notes: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({ ...initialForm, branchId: defaultBranchId });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (stu) => {
    setEditingStudent(stu);
    setFormData({
      name: stu.name,
      phone: stu.phone,
      parentPhone: stu.parentPhone || '',
      branchId: stu.branchId,
      level: stu.levelNameAr || stu.level,
      className: stu.className || 'شعبة أ',
      totalFees: stu.totalFees || 1200,
      paidAmount: stu.paidAmount || 0,
      status: stu.status || 'active',
      notes: stu.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const branchObj = branches.find(b => b.id === formData.branchId) || branches[0];
    const remaining = Number(formData.totalFees) - Number(formData.paidAmount);

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
        ...s,
        ...formData,
        branchName: branchObj.name,
        remainingAmount: remaining
      } : s));
      showToast(`تم تعديل بيانات الطالب "${formData.name}"`);
      addAuditLog('UPDATE_STUDENT', `تعديل ملف الطالب ${formData.name}`);
    } else {
      const newStu = {
        id: `STU-${1000 + students.length + 1}`,
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        registrationDate: new Date().toISOString().split('T')[0],
        branchName: branchObj.name,
        remainingAmount: remaining,
        subjectsCount: 8,
        ...formData
      };
      setStudents(prev => [newStu, ...prev]);
      showToast(`تم تسجيل الطالب "${formData.name}" بنجاح`);
      addAuditLog('CREATE_STUDENT', `تسجيل طالب جديد: ${formData.name} في ${branchObj.name}`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setStudents(prev => prev.filter(s => s.id !== deleteTarget.id));
    showToast(`تم حذف الطالب "${deleteTarget.name}"`, 'error');
    addAuditLog('DELETE_STUDENT', `حذف الطالب ${deleteTarget.name} (${deleteTarget.id})`);
    setDeleteTarget(null);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.includes(searchTerm) || s.phone.includes(searchTerm) || s.id.includes(searchTerm);
      const matchLevel = levelFilter === 'all' || s.level === levelFilter || s.levelNameAr === levelFilter;
      
      let matchBranch = true;
      if (isBranchLocked) {
        matchBranch = s.branchId === currentUser.branchId;
      } else if (selectedBranchId !== 'all') {
        matchBranch = s.branchId === selectedBranchId;
      }

      return matchSearch && matchLevel && matchBranch;
    });
  }, [students, searchTerm, levelFilter, isBranchLocked, currentUser, selectedBranchId]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">شؤون وقبول الطلاب (Academic Students CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            إدارة الطلاب، التخصصات الأكاديمية (علمي وأدبي)، والبيانات المالية لكل طالب
            {isBranchLocked && <span className="font-bold text-blue-700"> • محصور في {currentUser.branchName}</span>}
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-sm shadow-md transition"
        >
          <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
          <span>تسجيل طالب جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative sm:col-span-2">
          <Icon name="search" className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="بحث بالاسم، كود الطالب، أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C]"
          />
        </div>

        <div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0B2D5C]"
          >
            <option value="all">جميع المراحل والتخصصات</option>
            <option value="توجيهي علمي">توجيهي علمي (8 مواد)</option>
            <option value="توجيهي أدبي">توجيهي أدبي (8 مواد)</option>
            <option value="حادي عشر علمي">الصف الحادي عشر علمي</option>
            <option value="حادي عشر أدبي">الصف الحادي عشر أدبي</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                <th className="py-4 px-6">كود الطالب</th>
                <th className="py-4 px-6">اسم الطالب</th>
                <th className="py-4 px-6">المرحلة والتخصص</th>
                <th className="py-4 px-6">الفرع</th>
                <th className="py-4 px-6">الهاتف / ولي الأمر</th>
                <th className="py-4 px-6">الرسوم والمتبقي</th>
                <th className="py-4 px-6">الحالة</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    لا يوجد طلاب مطابقون لمعايير البحث في هذا النطاق
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="table-row-hover">
                    <td className="py-4 px-6 font-mono font-black text-[#0B2D5C]">{student.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} 
                          alt={student.name} 
                          className="w-9 h-9 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <p className="font-extrabold text-slate-900">{student.name}</p>
                          <span className="text-[10px] text-slate-400 font-medium">تسجيل: {student.registrationDate}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-[#0B2D5C] border border-blue-200">
                        {student.levelNameAr || student.level}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-700">{student.branchName}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col text-[11px]">
                        <span className="font-mono text-slate-800" dir="ltr">{student.phone}</span>
                        <span className="text-[10px] text-slate-400 font-mono" dir="ltr">ولي الأمر: {student.parentPhone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-emerald-600 font-black">{student.paidAmount} شيكل</span>
                        {student.remainingAmount > 0 && (
                          <span className="block text-[10px] text-rose-600">متبقي: {student.remainingAmount} شيكل</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black ${
                        student.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        student.status === 'overdue' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {student.status === 'active' ? 'منتظم' : student.status === 'overdue' ? 'متأخر بالسداد' : 'موقوف'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                          title="تعديل الطالب"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(student)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="حذف الطالب"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingStudent ? 'تعديل بيانات الطالب' : 'تسجيل طالب جديد بالمنظومة'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الرباعي للطالب *</label>
                <input
                  type="text"
                  required
                  placeholder="محمد إبراهيم النجار"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المرحلة الدراسية *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="توجيهي علمي">توجيهي علمي (8 مواد)</option>
                    <option value="توجيهي أدبي">توجيهي أدبي (8 مواد)</option>
                    <option value="حادي عشر علمي">حادي عشر علمي</option>
                    <option value="حادي عشر أدبي">حادي عشر أدبي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الفرع التعليمي *</label>
                  {isBranchLocked ? (
                    <input
                      type="text"
                      disabled
                      value={currentUser.branchName}
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500"
                    />
                  ) : (
                    <select
                      value={formData.branchId}
                      onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الطالب *</label>
                  <input
                    type="text"
                    required
                    placeholder="059xxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">هاتف ولي الأمر</label>
                  <input
                    type="text"
                    placeholder="059xxxxxxx"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">إجمالي الرسوم (شيكل)</label>
                  <input
                    type="number"
                    value={formData.totalFees}
                    onChange={(e) => setFormData({ ...formData, totalFees: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المبلغ المسدد (شيكل)</label>
                  <input
                    type="number"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingStudent ? 'حفظ التعديلات' : 'تسجيل الطالب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`حذف ملف الطالب "${deleteTarget?.name}"`}
        message={`هل أنت متأكد من حذف الطالب ${deleteTarget?.name} (كود: ${deleteTarget?.id}) نهائياً؟`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 7. إدارة هيئة التدريس (Teachers Module - Full CRUD)
// -------------------------------------------------------------
function TeachersView({ branches, currentUser, selectedBranchId, teachers, setTeachers, showToast, addAuditLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isBranchLocked = currentUser.role === 'branch_manager';

  const initialForm = {
    name: '',
    phone: '',
    subject: 'الفيزياء',
    stream: 'الفرع العلمي',
    qualification: 'ماجستير مناهج وطرق تدريس',
    salary: 4500,
    weeklyClasses: 14,
    assignedBranches: [isBranchLocked ? currentUser.branchName : 'فرع الرمال']
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTeacher(t);
    setFormData({
      name: t.name,
      phone: t.phone,
      subject: t.subject,
      stream: t.stream || 'الفرع العلمي',
      qualification: t.qualification || '',
      salary: t.salary || 4000,
      weeklyClasses: t.weeklyClasses || 12,
      assignedBranches: t.assignedBranches || ['فرع الرمال']
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...t, ...formData } : t));
      showToast(`تم تحديث بيانات المحاضر "${formData.name}"`);
      addAuditLog('UPDATE_TEACHER', `تعديل ملف المعلم ${formData.name}`);
    } else {
      const newTeacher = {
        id: `TCH-${100 + teachers.length + 1}`,
        rating: 5.0,
        status: 'active',
        ...formData
      };
      setTeachers(prev => [...prev, newTeacher]);
      showToast(`تمت إضافة المحاضر "${formData.name}" بنجاح`);
      addAuditLog('CREATE_TEACHER', `إضافة محاضر جديد: ${formData.name}`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTeachers(prev => prev.filter(t => t.id !== deleteTarget.id));
    showToast(`تم حذف المحاضر "${deleteTarget.name}"`, 'error');
    addAuditLog('DELETE_TEACHER', `حذف المحاضر ${deleteTarget.name} (${deleteTarget.id})`);
    setDeleteTarget(null);
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchSearch = t.name.includes(searchTerm) || t.subject.includes(searchTerm);
      
      let matchBranch = true;
      if (isBranchLocked) {
        matchBranch = t.assignedBranches && t.assignedBranches.includes(currentUser.branchName);
      } else if (selectedBranchId !== 'all') {
        const curBranchObj = branches.find(b => b.id === selectedBranchId);
        if (curBranchObj) {
          matchBranch = t.assignedBranches && t.assignedBranches.includes(curBranchObj.name);
        }
      }

      return matchSearch && matchBranch;
    });
  }, [teachers, searchTerm, isBranchLocked, currentUser, selectedBranchId, branches]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">إدارة هيئة التدريس والمحاضرين (Teachers CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            كبار الأساتذة والمحاضرين لمواد التوجيهي الـ 8 المعتمدة عبر الفروع
            {isBranchLocked && <span className="font-bold text-blue-700"> • المعينون في {currentUser.branchName}</span>}
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-sm shadow-md transition"
        >
          <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
          <span>إضافة محاضر جديد</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative">
          <Icon name="search" className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم المحاضر أو التخصص والمادة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2D5C] text-[#D4A017] font-black text-sm flex items-center justify-center shadow">
                    {teacher.name.split(' ')[1]?.[0] || 'أ'}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{teacher.name}</h3>
                    <span className="text-xs font-black text-[#0B2D5C] bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      {teacher.subject}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-500">★ {teacher.rating || 4.9}</span>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">المؤهل:</span>
                  <span className="font-bold text-slate-800 text-[11px]">{teacher.qualification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الفروع المعين بها:</span>
                  <span className="font-bold text-indigo-700">{teacher.assignedBranches?.join('، ') || 'فرع الرمال'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الحصص الأسبوعية:</span>
                  <span className="font-bold text-slate-800">{teacher.weeklyClasses} حصة أسبوعياً</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الراتب الأساسي:</span>
                  <span className="font-black text-emerald-600">{teacher.salary?.toLocaleString('ar-EG')} شيكل</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs border-t border-slate-100 mt-2">
              <span className="font-mono text-slate-500" dir="ltr">{teacher.phone}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(teacher)}
                  className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                  title="تعديل المحاضر"
                >
                  <Icon name="edit" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(teacher)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                  title="حذف المحاضر"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingTeacher ? 'تعديل بيانات المحاضر' : 'إضافة محاضر جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم المحاضر *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أ. د. كمال رضوان"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المادة والتخصص *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الفيزياء"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف *</label>
                  <input
                    type="text"
                    required
                    placeholder="059xxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المؤهل الأكاديمي</label>
                <input
                  type="text"
                  placeholder="دكتوراه في الفيزياء"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الراتب الشهري (شيكل)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الحصص الأسبوعية</label>
                  <input
                    type="number"
                    value={formData.weeklyClasses}
                    onChange={(e) => setFormData({ ...formData, weeklyClasses: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingTeacher ? 'حفظ التعديلات' : 'إضافة المحاضر'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`حذف المحاضر "${deleteTarget?.name}"`}
        message={`هل أنت متأكد من حذف ${deleteTarget?.name} نهائياً؟`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 8. قسم الدورات التدريبية (Training Courses CRUD - Super Admin)
// -------------------------------------------------------------
function TrainingView({ branches, currentUser, selectedBranchId, trainingList, setTrainingList, showToast, addAuditLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const initialForm = {
    title: '',
    category: 'Computer courses',
    categoryAr: 'دورات الحاسوب والبرمجة',
    trainer: '',
    duration: '3 أشهر',
    hours: 80,
    price: 350,
    capacity: 20,
    hall: 'مختبر البرمجيات 1',
    branchId: 'b7',
    branchName: 'فرع الدورات التدريبية'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category || 'Computer courses',
      categoryAr: course.categoryAr || 'دورات الحاسوب والبرمجة',
      trainer: course.trainer,
      duration: course.duration,
      hours: course.hours || 60,
      price: course.price,
      capacity: course.capacity || 20,
      hall: course.hall || 'قاعة الرواد',
      branchId: course.branchId || 'b7',
      branchName: course.branchName || 'فرع الدورات التدريبية'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCourse) {
      setTrainingList(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
      showToast(`تم تعديل الدورة "${formData.title}"`);
      addAuditLog('UPDATE_COURSE', `تعديل دورة ${formData.title}`);
    } else {
      const newCourse = {
        id: `CRS-${500 + trainingList.length + 1}`,
        registeredStudents: 0,
        attendanceRate: 100,
        status: 'upcoming',
        startDate: new Date().toISOString().split('T')[0],
        ...formData
      };
      setTrainingList(prev => [...prev, newCourse]);
      showToast(`تمت إضافة الدورة "${formData.title}" بنجاح`);
      addAuditLog('CREATE_COURSE', `إضافة دورة تدريبية: ${formData.title}`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTrainingList(prev => prev.filter(c => c.id !== deleteTarget.id));
    showToast(`تم حذف الدورة "${deleteTarget.title}"`, 'error');
    addAuditLog('DELETE_COURSE', `حذف دورة ${deleteTarget.title} (${deleteTarget.id})`);
    setDeleteTarget(null);
  };

  const filteredCourses = useMemo(() => {
    return trainingList.filter(c => c.title.includes(searchTerm) || c.trainer.includes(searchTerm));
  }, [trainingList, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">قسم ودبلومات الدورات التدريبية (Training Courses CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            دبلومات البرمجة، العلوم الطبية، التصميم، اللغات، والتأهيل المهني
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-sm shadow-md transition"
        >
          <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
          <span>إضافة دورة / دبلوم جديد</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative">
          <Icon name="search" className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الدورة أو المدرب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B2D5C]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                  {course.categoryAr || 'دورة تدريبية'}
                </span>
                <span className="text-xs font-black text-emerald-600">{course.price} شيكل</span>
              </div>

              <h3 className="text-base font-black text-slate-900 mb-2 leading-tight">{course.title}</h3>
              <p className="text-xs font-bold text-slate-600 mb-3">المدرب: {course.trainer}</p>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">القاعة / المختبر:</span>
                  <span className="font-bold text-slate-800">{course.hall}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">المدة والساعات:</span>
                  <span className="font-bold text-slate-800">{course.duration} ({course.hours} ساعة)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">المقاعد:</span>
                  <span className="font-bold text-blue-700">{course.registeredStudents || 15} / {course.capacity} متدرب</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-[11px] text-slate-400 font-mono">البدء: {course.startDate}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                  title="تعديل الدورة"
                >
                  <Icon name="edit" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(course)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                  title="حذف الدورة"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingCourse ? 'تعديل الدورة التدريبية' : 'إضافة دبلوم أو دورة جديدة'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الدورة أو الدبلوم *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: دبلوم البرمجة الشاملة وتطوير الويب"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المدرب المسؤول *</label>
                  <input
                    type="text"
                    required
                    placeholder="م. حسام مقداد"
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القسم والتصنيف</label>
                  <select
                    value={formData.categoryAr}
                    onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="دورات الحاسوب والبرمجة">دورات الحاسوب والبرمجة</option>
                    <option value="الدورات والعلوم الطبية">الدورات والعلوم الطبية</option>
                    <option value="الدورات المهنية والتطبيقية">الدورات المهنية والتطبيقية</option>
                    <option value="دورات اللغات والترجمة">دورات اللغات والترجمة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الساعات</label>
                  <input
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الرسوم (شيكل)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القاعة</label>
                  <input
                    type="text"
                    value={formData.hall}
                    onChange={(e) => setFormData({ ...formData, hall: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingCourse ? 'حفظ التعديلات' : 'إضافة الدورة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`حذف الدورة التدريبية "${deleteTarget?.title}"`}
        message={`هل أنت متأكد من حذف ${deleteTarget?.title} نهائياً؟`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 9. الجداول الدراسية والمواعيد (Schedules Module - Full CRUD)
// -------------------------------------------------------------
function SchedulesView({ branches, currentUser, selectedBranchId, schedules, setSchedules, teachers, showToast, addAuditLog }) {
  const [dayFilter, setDayFilter] = useState('الكل');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const days = ['الكل', 'السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  const isBranchLocked = currentUser.role === 'branch_manager';
  const defaultBranchId = isBranchLocked ? currentUser.branchId : (selectedBranchId === 'all' ? 'b1' : selectedBranchId);

  const initialForm = {
    day: 'السبت',
    time: '08:30 ص - 10:30 ص',
    gradeAr: 'توجيهي علمي',
    className: 'شعبة أ',
    subject: 'الفيزياء',
    teacher: 'أ. د. كمال رضوان',
    branchId: defaultBranchId,
    hall: 'قاعة القدس (120 طالب)'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingSchedule(null);
    setFormData({ ...initialForm, branchId: defaultBranchId });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slot) => {
    setEditingSchedule(slot);
    setFormData({
      day: slot.day,
      time: slot.time,
      gradeAr: slot.gradeAr || 'توجيهي علمي',
      className: slot.className || 'شعبة أ',
      subject: slot.subject,
      teacher: slot.teacher,
      branchId: slot.branchId,
      hall: slot.hall || 'قاعة القدس'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const branchObj = branches.find(b => b.id === formData.branchId) || branches[0];

    if (editingSchedule) {
      setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? {
        ...s,
        ...formData,
        branchName: branchObj.name
      } : s));
      showToast('تم تعديل موعد الحصة الدراسية');
      addAuditLog('UPDATE_SCHEDULE', `تعديل موعد ${formData.subject} في ${formData.day}`);
    } else {
      const newSlot = {
        id: `SCH-${schedules.length + 1}`,
        branchName: branchObj.name,
        ...formData
      };
      setSchedules(prev => [...prev, newSlot]);
      showToast('تمت إضافة الحصة إلى الجدول بنجاح');
      addAuditLog('CREATE_SCHEDULE', `إضافة حصة ${formData.subject} للمحاضر ${formData.teacher}`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setSchedules(prev => prev.filter(s => s.id !== deleteTarget.id));
    showToast('تم حذف الحصة من الجدول', 'error');
    addAuditLog('DELETE_SCHEDULE', `حذف حصة ${deleteTarget.subject} (${deleteTarget.id})`);
    setDeleteTarget(null);
  };

  const filteredSchedules = useMemo(() => {
    return schedules.filter(s => {
      const matchDay = dayFilter === 'الكل' || s.day === dayFilter;
      
      let matchBranch = true;
      if (isBranchLocked) {
        matchBranch = s.branchId === currentUser.branchId;
      } else if (selectedBranchId !== 'all') {
        matchBranch = s.branchId === selectedBranchId;
      }

      return matchDay && matchBranch;
    });
  }, [schedules, dayFilter, isBranchLocked, currentUser, selectedBranchId]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">الجداول الدراسية والمواعيد (Schedules CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            مواعيد الحصص والمحاضرين لجميع القاعات مع إمكانية التصدير والطباعة
            {isBranchLocked && <span className="font-bold text-blue-700"> • محصور في {currentUser.branchName}</span>}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>طباعة الجدول</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md transition"
          >
            <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
            <span>إضافة حصة جديدة</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map(d => (
          <button
            key={d}
            onClick={() => setDayFilter(d)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              dayFilter === d ? 'bg-[#0B2D5C] text-white shadow' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchedules.map(slot => (
          <div key={slot.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 text-[#0B2D5C]">
                  {slot.day} • {slot.time}
                </span>
                <span className="text-xs font-bold text-slate-500">{slot.gradeAr}</span>
              </div>

              <h3 className="text-base font-black text-slate-900 mb-1">{slot.subject}</h3>
              <p className="text-xs font-bold text-slate-600 mb-3">{slot.className}</p>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">المحاضر:</span>
                  <span className="font-bold text-slate-800">{slot.teacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الفرع والقاعة:</span>
                  <span className="font-bold text-slate-800">{slot.branchName} • {slot.hall}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-1.5 border-t border-slate-100 mt-2">
              <button
                onClick={() => handleOpenEdit(slot)}
                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                title="تعديل الحصة"
              >
                <Icon name="edit" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(slot)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                title="حذف الحصة"
              >
                <Icon name="trash" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingSchedule ? 'تعديل موعد الحصة' : 'إضافة حصة ومحاضرة للجدول'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اليوم *</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">التوقيت *</label>
                  <input
                    type="text"
                    required
                    placeholder="08:30 ص - 10:30 ص"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المادة الدراسية *</label>
                  <input
                    type="text"
                    required
                    placeholder="الفيزياء"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المحاضر *</label>
                  <input
                    type="text"
                    required
                    placeholder="أ. د. كمال رضوان"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الفرع *</label>
                  {isBranchLocked ? (
                    <input
                      type="text"
                      disabled
                      value={currentUser.branchName}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500"
                    />
                  ) : (
                    <select
                      value={formData.branchId}
                      onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القاعة *</label>
                  <input
                    type="text"
                    required
                    placeholder="قاعة القدس (120 طالب)"
                    value={formData.hall}
                    onChange={(e) => setFormData({ ...formData, hall: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingSchedule ? 'حفظ التعديلات' : 'إضافة للجدول'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`حذف حصة "${deleteTarget?.subject}"`}
        message={`هل أنت متأكد من حذف حصة ${deleteTarget?.subject} يوم ${deleteTarget?.day} نهائياً؟`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 10. الخزينة والحسابات المستقلة (Financials Module - Full CRUD)
// -------------------------------------------------------------
function FinancialsView({ branches, currentUser, selectedBranchId, payments, setPayments, expenses, setExpenses, salaries, setSalaries, students, showToast, addAuditLog }) {
  const [subTab, setSubTab] = useState('payments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isBranchLocked = currentUser.role === 'branch_manager';
  const defaultBranchId = isBranchLocked ? currentUser.branchId : (selectedBranchId === 'all' ? 'b1' : selectedBranchId);

  const [paymentForm, setPaymentForm] = useState({
    receiptNumber: '',
    title: 'سداد قسط التوجيهي - فيزياء ورياضيات',
    studentName: 'محمد إبراهيم النجار',
    amount: 600,
    method: 'نقدي (خزينة)',
    branchId: defaultBranchId,
    date: new Date().toISOString().split('T')[0]
  });

  const [expenseForm, setExpenseForm] = useState({
    voucherNumber: '',
    title: 'مستلزمات مكتبية وطباعة ملازم',
    category: 'قرطاسية ومطبوعات',
    amount: 750,
    paidTo: 'مطبعة الأمل',
    branchId: defaultBranchId,
    date: new Date().toISOString().split('T')[0]
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    if (subTab === 'payments') {
      setPaymentForm({
        receiptNumber: `REC-${Date.now().toString().slice(-4)}`,
        title: 'سداد قسط دراسي',
        studentName: students[0]?.name || 'محمد النجار',
        amount: 500,
        method: 'نقدي (خزينة)',
        branchId: defaultBranchId,
        date: new Date().toISOString().split('T')[0]
      });
    } else if (subTab === 'expenses') {
      setExpenseForm({
        voucherNumber: `VOU-${Date.now().toString().slice(-4)}`,
        title: 'مصروفات تشغيلية',
        category: 'صيانة وتجهيزات',
        amount: 300,
        paidTo: 'شركة الصيانة',
        branchId: defaultBranchId,
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    if (subTab === 'payments') {
      setPaymentForm({
        receiptNumber: item.receiptNumber,
        title: item.title,
        studentName: item.studentName,
        amount: item.amount,
        method: item.method,
        branchId: item.branchId,
        date: item.date
      });
    } else if (subTab === 'expenses') {
      setExpenseForm({
        voucherNumber: item.voucherNumber,
        title: item.title,
        category: item.category,
        amount: item.amount,
        paidTo: item.paidTo,
        branchId: item.branchId,
        date: item.date
      });
    }
    setIsModalOpen(true);
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    const branchObj = branches.find(b => b.id === paymentForm.branchId) || branches[0];
    if (editingItem) {
      setPayments(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...paymentForm, branchName: branchObj.name } : p));
      showToast('تم تعديل سند القبض بنجاح');
      addAuditLog('UPDATE_PAYMENT', `تعديل سند قبض ${paymentForm.receiptNumber}`);
    } else {
      const newP = {
        id: `INV-${payments.length + 801}`,
        cashier: currentUser.userName,
        branchName: branchObj.name,
        ...paymentForm
      };
      setPayments(prev => [newP, ...prev]);
      showToast('تم إصدار سند القبض بنجاح');
      addAuditLog('CREATE_PAYMENT', `إصدار سند قبض بقيمة ${paymentForm.amount} شيكل للطالب ${paymentForm.studentName}`);
    }
    setIsModalOpen(false);
  };

  const handleSaveExpense = (e) => {
    e.preventDefault();
    const branchObj = branches.find(b => b.id === expenseForm.branchId) || branches[0];
    if (editingItem) {
      setExpenses(prev => prev.map(exp => exp.id === editingItem.id ? { ...exp, ...expenseForm, branchName: branchObj.name } : exp));
      showToast('تم تعديل سند الصرف بنجاح');
      addAuditLog('UPDATE_EXPENSE', `تعديل سند صرف ${expenseForm.voucherNumber}`);
    } else {
      const newExp = {
        id: `EXP-${expenses.length + 101}`,
        cashier: currentUser.userName,
        branchName: branchObj.name,
        ...expenseForm
      };
      setExpenses(prev => [newExp, ...prev]);
      showToast('تم إصدار سند الصرف بنجاح');
      addAuditLog('CREATE_EXPENSE', `إصدار سند صرف بقيمة ${expenseForm.amount} شيكل`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (subTab === 'payments') {
      setPayments(prev => prev.filter(p => p.id !== deleteTarget.id));
      showToast('تم حذف سند القبض', 'error');
      addAuditLog('DELETE_PAYMENT', `حذف سند قبض ${deleteTarget.receiptNumber}`);
    } else if (subTab === 'expenses') {
      setExpenses(prev => prev.filter(e => e.id !== deleteTarget.id));
      showToast('تم حذف سند الصرف', 'error');
      addAuditLog('DELETE_EXPENSE', `حذف سند صرف ${deleteTarget.voucherNumber}`);
    } else if (subTab === 'salaries') {
      setSalaries(prev => prev.filter(s => s.id !== deleteTarget.id));
      showToast('تم حذف بيان الراتب', 'error');
      addAuditLog('DELETE_SALARY', `حذف بيان راتب ${deleteTarget.employeeName}`);
    }
    setDeleteTarget(null);
  };

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      if (isBranchLocked) return p.branchId === currentUser.branchId;
      if (selectedBranchId !== 'all') return p.branchId === selectedBranchId;
      return true;
    });
  }, [payments, isBranchLocked, currentUser, selectedBranchId]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      if (isBranchLocked) return e.branchId === currentUser.branchId;
      if (selectedBranchId !== 'all') return e.branchId === selectedBranchId;
      return true;
    });
  }, [expenses, isBranchLocked, currentUser, selectedBranchId]);

  const filteredSalaries = useMemo(() => {
    return salaries.filter(s => {
      if (isBranchLocked) return s.branchId === currentUser.branchId;
      if (selectedBranchId !== 'all') return s.branchId === selectedBranchId;
      return true;
    });
  }, [salaries, isBranchLocked, currentUser, selectedBranchId]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#0B2D5C]">الخزينة والحسابات المالية المستقلة (Financials CRUD)</h2>
          <p className="text-xs text-slate-500 mt-1">
            سندات القبض، المصروفات التشغيلية، وصرف رواتب المدرسين مع العزل التام للفروع
            {isBranchLocked && <span className="font-bold text-blue-700"> • خزانة {currentUser.branchName}</span>}
          </p>
        </div>

        {subTab !== 'salaries' && (
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-sm shadow-md transition"
          >
            <Icon name="plus" className="w-4 h-4 text-[#D4A017]" />
            <span>{subTab === 'payments' ? 'إصدار سند قبض جديد' : 'إصدار سند صرف جديد'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setSubTab('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${subTab === 'payments' ? 'bg-[#0B2D5C] text-white shadow' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          سندات القبض والمقبوضات ({filteredPayments.length})
        </button>
        <button
          onClick={() => setSubTab('expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${subTab === 'expenses' ? 'bg-[#0B2D5C] text-white shadow' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          المصروفات وسندات الصرف ({filteredExpenses.length})
        </button>
        <button
          onClick={() => setSubTab('salaries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${subTab === 'salaries' ? 'bg-[#0B2D5C] text-white shadow' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          رواتب المدرسين ({filteredSalaries.length})
        </button>
      </div>

      {subTab === 'payments' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="py-4 px-6">رقم السند</th>
                  <th className="py-4 px-6">التاريخ</th>
                  <th className="py-4 px-6">البيان</th>
                  <th className="py-4 px-6">الفرع</th>
                  <th className="py-4 px-6">اسم الطالب</th>
                  <th className="py-4 px-6">المبلغ</th>
                  <th className="py-4 px-6">طريقة الدفع</th>
                  <th className="py-4 px-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredPayments.map(p => (
                  <tr key={p.id} className="table-row-hover">
                    <td className="py-4 px-6 font-mono text-[#0B2D5C]">{p.receiptNumber}</td>
                    <td className="py-4 px-6 text-slate-500">{p.date}</td>
                    <td className="py-4 px-6 text-slate-900">{p.title}</td>
                    <td className="py-4 px-6 font-bold">{p.branchName}</td>
                    <td className="py-4 px-6">{p.studentName}</td>
                    <td className="py-4 px-6 font-black text-emerald-600">+{p.amount} شيكل</td>
                    <td className="py-4 px-6 text-slate-500">{p.method}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                          title="تعديل السند"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="حذف السند"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'expenses' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="py-4 px-6">رقم السند</th>
                  <th className="py-4 px-6">التاريخ</th>
                  <th className="py-4 px-6">بيان الصرف</th>
                  <th className="py-4 px-6">الفرع</th>
                  <th className="py-4 px-6">المصروف لـ</th>
                  <th className="py-4 px-6">المبلغ</th>
                  <th className="py-4 px-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredExpenses.map(e => (
                  <tr key={e.id} className="table-row-hover">
                    <td className="py-4 px-6 font-mono text-rose-600">{e.voucherNumber}</td>
                    <td className="py-4 px-6 text-slate-500">{e.date}</td>
                    <td className="py-4 px-6 text-slate-900">{e.title}</td>
                    <td className="py-4 px-6 font-bold">{e.branchName}</td>
                    <td className="py-4 px-6">{e.paidTo}</td>
                    <td className="py-4 px-6 font-black text-rose-600">-{e.amount} شيكل</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(e)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                          title="تعديل السند"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(e)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="حذف السند"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'salaries' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="py-4 px-6">المحاضر</th>
                  <th className="py-4 px-6">المهمة</th>
                  <th className="py-4 px-6">الفرع</th>
                  <th className="py-4 px-6">الشهر</th>
                  <th className="py-4 px-6">الراتب الأساسي</th>
                  <th className="py-4 px-6">المكافأة</th>
                  <th className="py-4 px-6">صافي الراتب</th>
                  <th className="py-4 px-6 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredSalaries.map(s => (
                  <tr key={s.id} className="table-row-hover">
                    <td className="py-4 px-6 font-black text-slate-900">{s.employeeName}</td>
                    <td className="py-4 px-6 text-slate-600">{s.role}</td>
                    <td className="py-4 px-6 font-bold">{s.branchName}</td>
                    <td className="py-4 px-6 text-slate-500">{s.month}</td>
                    <td className="py-4 px-6">{s.baseSalary} شيكل</td>
                    <td className="py-4 px-6 text-emerald-600">+{s.bonus} شيكل</td>
                    <td className="py-4 px-6 font-black text-[#0B2D5C]">{s.netSalary} شيكل</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                        title="حذف بيان الراتب"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && subTab === 'payments' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingItem ? 'تعديل سند القبض' : 'إصدار سند قبض رسوم جديد'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم السند *</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.receiptNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, receiptNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المبلغ (شيكل) *</label>
                  <input
                    type="number"
                    required
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-black text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب *</label>
                <input
                  type="text"
                  required
                  value={paymentForm.studentName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, studentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">بيان القبض *</label>
                <input
                  type="text"
                  required
                  value={paymentForm.title}
                  onChange={(e) => setPaymentForm({ ...paymentForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الفرع *</label>
                  {isBranchLocked ? (
                    <input
                      type="text"
                      disabled
                      value={currentUser.branchName}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500"
                    />
                  ) : (
                    <select
                      value={paymentForm.branchId}
                      onChange={(e) => setPaymentForm({ ...paymentForm, branchId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">طريقة السداد</label>
                  <select
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="نقدي (خزينة)">نقدي (خزينة)</option>
                    <option value="PalPay محفظة">PalPay محفظة</option>
                    <option value="بنك فلسطين (تحويل)">بنك فلسطين (تحويل)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs shadow-md"
                >
                  {editingItem ? 'حفظ التعديلات' : 'إصدار السند'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && subTab === 'expenses' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-[#0B2D5C]">
                {editingItem ? 'تعديل سند الصرف' : 'إصدار سند صرف مصروفات'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم السند *</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.voucherNumber}
                    onChange={(e) => setExpenseForm({ ...expenseForm, voucherNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المبلغ (شيكل) *</label>
                  <input
                    type="number"
                    required
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-black text-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">بيان الصرف *</label>
                <input
                  type="text"
                  required
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المصروف لـ (الجهة/الشخص) *</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.paidTo}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الفرع *</label>
                  {isBranchLocked ? (
                    <input
                      type="text"
                      disabled
                      value={currentUser.branchName}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500"
                    />
                  ) : (
                    <select
                      value={expenseForm.branchId}
                      onChange={(e) => setExpenseForm({ ...expenseForm, branchId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                >
                  {editingItem ? 'حفظ التعديلات' : 'إصدار سند الصرف'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="تأكيد حذف المعاملة المالية"
        message={`هل أنت متأكد من حذف هذا السند نهائياً بقيمة ${deleteTarget?.amount || deleteTarget?.netSalary} شيكل؟`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 11. سجل التدقيق والرقابة (Audit Logs - Super Admin Only)
// -------------------------------------------------------------
function AuditLogsView({ auditLogs, showToast }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
            Super Admin Only
          </span>
          <h2 className="text-2xl font-black text-[#0B2D5C] mt-1">سجل الرقابة والتدقيق (Immutable Audit Logs)</h2>
          <p className="text-xs text-slate-500 mt-1">
            سجل غير قابل للتعديل يوثق جميع العمليات، إنشاء القيود، وتعديل الصلاحيات آلياً
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-4 px-6">المعرف</th>
                <th className="py-4 px-6">المستخدم</th>
                <th className="py-4 px-6">الصلاحية</th>
                <th className="py-4 px-6">الفرع</th>
                <th className="py-4 px-6">الحدث</th>
                <th className="py-4 px-6">التاريخ والوقت</th>
                <th className="py-4 px-6">التفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 text-[#0B2D5C] font-bold">#{log.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{log.user}</td>
                  <td className="py-4 px-6">{log.role}</td>
                  <td className="py-4 px-6">{log.branch}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{log.date} {log.time}</td>
                  <td className="py-4 px-6 text-slate-800">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. الموقع التعريفي العام (Public Website Portal)
// -------------------------------------------------------------
function PublicWebsitePortal({ onBackToERP, branches, publicData }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir="rtl">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./logo.jpg" alt="شعار مجموعة مراكز الصخرة" className="w-12 h-12 rounded-xl object-contain border border-[#D4A017] p-0.5 bg-[#0B2D5C]" />
            <div>
              <h2 className="text-base font-black text-[#0B2D5C]">مجموعة مراكز الصخرة التعليمية</h2>
              <p className="text-[11px] text-[#D4A017] font-bold">الموقع التعريفي الرسمي والتسجيل الإلكتروني</p>
            </div>
          </div>
          <button
            onClick={onBackToERP}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2D5C] hover:bg-[#143d75] text-white font-bold text-xs transition shadow-md"
          >
            <span>العودة للوحة التحكم (ERP)</span>
            <span>←</span>
          </button>
        </div>
      </header>

      <section className="py-16 bg-linear-to-b from-white to-slate-100 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-[#D4A017]/20 text-[#b5850e]">
            العام الأكاديمي 2026/2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B2D5C] mt-4 mb-4 leading-tight">
            صرح الصخرة الأكاديمي والمهني الرائد
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            نخبة المعلمين والمحاضرين لمواد التوجيهي، إلى جانب أحدث دبلومات البرمجة والعلوم الطبية واللغات عبر 6 فروع مستقلة في قطاع غزة.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-black text-[#0B2D5C] mb-6 text-center">الفروع الـ 6 التابعة للمجموعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.filter(b => b.type === 'academic').map(b => (
            <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 text-[#0B2D5C]">
                فرع أكاديمي وثانوي
              </span>
              <h4 className="text-base font-black text-slate-900 mt-2">{b.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{b.address}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400">هاتف الفرع:</span>
                <span className="font-mono font-bold text-slate-800" dir="ltr">{b.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#0B2D5C] text-white py-8 text-center text-xs">
        <p className="font-bold text-slate-300">جميع الحقوق محفوظة © 2026 مجموعة مراكز الصخرة التعليمية</p>
      </footer>
    </div>
  );
}

// تصيير المنظومة
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
