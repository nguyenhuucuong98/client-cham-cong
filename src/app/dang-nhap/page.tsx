"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
Clock,
User,
Lock,
Eye,
EyeOff,
ArrowRight,
Sparkles,
QrCode,
Scan,
MapPin,
Wifi,
ShieldCheck,
CheckCircle2,
AlertCircle,
HelpCircle,
Smartphone,
Briefcase,
ChevronRight,
X,
Send,
Camera,
RefreshCw,
LogIn,
Building2,
Key,
Calendar,
Check
} from 'lucide-react';

const DEMO_EMPLOYEES = [
{
role: 'Nhân viên Kỹ thuật (Dev)',
id: 'NV-8892',
email: 'dev.nguyen@worksync.vn',
password: 'Password123!',
avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
dept: 'Khối Công Nghệ',
shift: '08:30 - 17:30'
},
{
role: 'Nhân viên Kinh doanh (Sales)',
id: 'NV-4501',
email: 'sales.tran@worksync.vn',
password: 'Password123!',
avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
dept: 'Phòng Kinh Doanh',
shift: '08:00 - 17:00'
},
{
role: 'Nhân viên Hành chính (Admin)',
id: 'NV-1029',
email: 'hr.le@worksync.vn',
password: 'Password123!',
avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
dept: 'Phòng Nhân Sự',
shift: '08:00 - 17:00'
}
];

export default function App() {
// Form Input States
const [employeeId, setEmployeeId] = useState('NV-8892');
const [password, setPassword] = useState('Password123!');
const [rememberMe, setRememberMe] = useState(true);
const [showPassword, setShowPassword] = useState(false);

// Authentication Mode: 'standard' | 'faceid' | 'qr'
const [loginMethod, setLoginMethod] = useState('standard');

// UI Interactive States
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({});
const [activeTab, setActiveTab] = useState(0);
const [loggedInUser, setLoggedInUser] = useState(null);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

// Modal States
const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
const [forgotEmail, setForgotEmail] = useState('');
const [forgotStep, setForgotStep] = useState(1);
const [isForgotLoading, setIsForgotLoading] = useState(false);
const [forgotError, setForgotError] = useState('');

// Quick GPS Check-In State
const [isQuickCheckinOpen, setIsQuickCheckinOpen] = useState(false);
const [gpsStatus, setGpsStatus] = useState('locating'); // 'locating' | 'success' | 'failed'
const [wifiName, setWifiName] = useState('WorkSync_Office_5G');
const [isCheckinSuccess, setIsCheckinSuccess] = useState(false);

// Face ID Simulation State
const [faceScanning, setFaceScanning] = useState(false);
const [faceProgress, setFaceProgress] = useState(0);

// Time & Date Clock Header
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 1000);
return () => clearInterval(timer);
}, []);

const handleSelectDemo = (acc, idx) => {
setActiveTab(idx);
setEmployeeId(acc.id);
setPassword(acc.password);
setErrors({});
};

const validateForm = () => {
const newErrors = {};
if (!employeeId.trim()) {
newErrors.employeeId = 'Vui lòng nhập Mã NV, Email hoặc Số điện thoại';
}
if (!password) {
newErrors.password = 'Vui lòng nhập mật khẩu';
} else if (password.length < 6) {
newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên';
}
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleLoginSubmit = (e) => {
e.preventDefault();
if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const matched = DEMO_EMPLOYEES.find(
        (a) => a.id.toLowerCase() === employeeId.toLowerCase() || a.email.toLowerCase() === employeeId.toLowerCase()
      );

      setLoggedInUser(
        matched || {
          role: 'Nhân viên chính thức',
          id: employeeId.toUpperCase(),
          email: `${employeeId.toLowerCase()}@worksync.vn`,
          password: '••••••••',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
          dept: 'Khối Vận Hành',
          shift: '08:00 - 17:00'
        }
      );
      setIsSuccessModalOpen(true);
    }, 1200);

};

const startFaceScan = () => {
setFaceScanning(true);
setFaceProgress(0);

    const interval = setInterval(() => {
      setFaceProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFaceScanning(false);
          setLoggedInUser(DEMO_EMPLOYEES[0]);
          setIsSuccessModalOpen(true);
          return 100;
        }
        return prev + 20;
      });
    }, 400);

};

const handleOpenQuickCheckin = () => {
setIsQuickCheckinOpen(true);
setGpsStatus('locating');
setIsCheckinSuccess(false);

    setTimeout(() => {
      setGpsStatus('success');
    }, 1500);

};

const handleConfirmQuickCheckin = () => {
setIsLoading(true);
setTimeout(() => {
setIsLoading(false);
setIsCheckinSuccess(true);
}, 1200);
};

const handleForgotSubmit = (e) => {
e.preventDefault();
if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
setForgotError('Vui lòng nhập email hợp lệ');
return;
}
setForgotError('');
setIsForgotLoading(true);

    setTimeout(() => {
      setIsForgotLoading(false);
      setForgotStep(2);
    }, 1000);

};

return (
<div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#1151c5] selection:text-white relative overflow-x-hidden">

      {/* Background Lighting Effects */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-[#1151c5]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />

      {}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1151c5] via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-[#1151c5]/30 ring-1 ring-white/20">
              <Clock className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                WorkSync <span className="text-xs text-blue-400 font-bold px-2 py-0.5 rounded-md bg-[#1151c5]/20 border border-[#1151c5]/30">Employee Portal</span>
              </span>
            </div>
          </div>

          {/* Realtime Digital Clock */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentTime.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="font-mono text-emerald-400 font-bold tracking-wider">
              {currentTime.toLocaleTimeString('vi-VN')}
            </div>
          </div>

          {/* Quick Support Link */}
          <button
            onClick={() => alert('Hotline hỗ trợ nhân viên WorkSync: 1900 6868 (Phím 1 cho Khối Nhân sự)')}
            className="text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Trợ giúp Nhân sự</span>
          </button>
        </div>
      </header>

      {}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-auto">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1151c5]/15 border border-[#1151c5]/30 text-blue-400 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Cổng Thông Tin & Chấm Công Cá Nhân</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                Chấm Công Nhanh. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                  An Toàn & Chính Xác.
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Đăng nhập để theo dõi ca làm việc, đăng ký nghỉ phép, xem bảng công thời gian thực và thực hiện chấm công FaceID/GPS.
              </p>
            </div>

            {/* QUICK NO-LOGIN CHECKIN BUTTON */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#1151c5]/10 border border-[#1151c5]/30 shadow-xl space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                  Chế độ Chấm công Nhanh (GPS / Wi-Fi)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">Chân thực</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Dành cho nhân viên đang ở văn phòng hoặc địa điểm chấm công cho phép. Không cần nhập mật khẩu.
              </p>
              <button
                type="button"
                onClick={handleOpenQuickCheckin}
                className="w-full bg-[#1151c5]/20 hover:bg-[#1151c5] text-blue-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-[#1151c5]/40 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:border-[#1151c5]"
              >
                <Scan className="w-4 h-4" />
                <span>Chấm công nhanh bằng vị trí GPS</span>
              </button>
            </div>

            {/* Feature Highlights List */}
            <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-300 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bảo mật vân tay / FaceID</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Wifi className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Nhận diện Wi-Fi công ty</span>
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative space-y-6">

            {/* DEMO PRESET SELECTOR (1-Click Fill) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Thử nghiệm 1-Click Tài khoản mẫu:
                </span>
                <span className="text-slate-500">Tự động điền</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {DEMO_EMPLOYEES.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDemo(acc, idx)}
                    className={`p-2 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      activeTab === idx
                        ? 'bg-[#1151c5]/20 border-[#1151c5] text-white shadow-sm ring-1 ring-[#1151c5]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={acc.avatar} alt={acc.role} className="w-5 h-5 rounded-full object-cover border border-slate-700" />
                      <span className="text-[11px] font-bold truncate text-white">{acc.id}</span>
                    </div>
                    <span className="text-[10px] truncate text-slate-400">{acc.role.split(' ')[2] || acc.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB SELECTOR: STANDARD / FACEID / QR CODE */}
            <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setLoginMethod('standard')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'standard'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Mật khẩu</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('faceid')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'faceid'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>FaceID AI</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('qr')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'qr'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Mã QR</span>
              </button>
            </div>

            {}
            {loginMethod === 'standard' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                {/* Employee ID / Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mã Nhân Viên / Email / SĐT <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                        if (errors.employeeId) setErrors((prev) => ({ ...prev, employeeId: '' }));
                      }}
                      placeholder="Nhập NV-8892 hoặc dev.nguyen@worksync.vn"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-950 border ${
                        errors.employeeId ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-[#1151c5] focus:ring-[#1151c5]'
                      } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                    />
                  </div>
                  {errors.employeeId && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.employeeId}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Mật khẩu <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                      }}
                      placeholder="••••••••••••"
                      className={`w-full pl-10 pr-10 py-3 bg-slate-950 border ${
                        errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-[#1151c5] focus:ring-[#1151c5]'
                      } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-[#1151c5] focus:ring-[#1151c5] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Duy trì đăng nhập cho ca làm việc
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#1151c5] via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-[#1151c5]/30 hover:shadow-[#1151c5]/50 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang xác thực thông tin...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Đăng Nhập Vào Cổng Nhân Viên</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {}
            {loginMethod === 'faceid' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Xác thực khuôn mặt FaceID AI</h3>
                  <p className="text-xs text-slate-400">Giữ khuôn mặt trong khung hình camera để tự động nhận diện</p>
                </div>

                {/* Simulated Camera Viewfinder */}
                <div className="relative w-44 h-44 mx-auto rounded-full border-4 border-[#1151c5] bg-slate-900 overflow-hidden flex items-center justify-center shadow-2xl group">
                  <img
                    src={DEMO_EMPLOYEES[activeTab].avatar}
                    alt="Camera view"
                    className="w-full h-full object-cover filter brightness-90"
                  />

                  {/* Scanner Grid Overlay */}
                  <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px]" />

                  {/* Scanning Animation */}
                  {faceScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 animate-bounce shadow-lg shadow-cyan-500" />
                  )}

                  <div className="absolute inset-0 border-2 border-dashed border-blue-400/60 rounded-full animate-spin-slow pointer-events-none" />
                </div>

                {faceScanning ? (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${faceProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-400 font-semibold animate-pulse">
                      Đang phân tích điểm sinh trắc học... {faceProgress}%
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startFaceScan}
                    className="w-full bg-gradient-to-r from-[#1151c5] to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>[Giả Lập Demo] Bắt đầu Quét FaceID</span>
                  </button>
                )}
              </div>
            )}

            {}
            {loginMethod === 'qr' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Quét mã QR Cá nhân</h3>
                  <p className="text-xs text-slate-400">Đưa mã QR trên thẻ nhân viên hoặc App Mobile vào vùng quét</p>
                </div>

                <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-4 border-[#1151c5]/40 relative overflow-hidden">
                  <QrCode className="w-36 h-36 text-slate-900" />
                  <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setLoggedInUser(DEMO_EMPLOYEES[1]);
                      setIsSuccessModalOpen(true);
                    }, 1200);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>[Giả Lập Demo] Quét QR Thẻ Nhân Viên</span>
                </button>
              </div>
            )}

            {/* Footer Note */}
            <p className="text-[11px] text-center text-slate-500 pt-1">
              Bảo mật bởi hệ thống WorkSync Security Standard v4.28.0
            </p>

          </div>
        </div>
      </main>

      {}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotStep(1);
                setForgotEmail('');
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {forgotStep === 1 ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Yêu cầu cấp lại mật khẩu</h3>
                    <p className="text-xs text-slate-400">Gửi thông báo tới Trưởng phòng HR / IT Admin</p>
                  </div>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email / Mã Nhân Viên</label>
                    <input
                      type="text"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="VD: NV-8892 hoặc dev.nguyen@worksync.vn"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-[#1151c5]"
                    />
                    {forgotError && <p className="text-[11px] text-rose-400 mt-1">{forgotError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="w-full bg-[#1151c5] hover:bg-blue-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isForgotLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi Yêu Cầu Tới Admin HR</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Đã gửi yêu cầu thành công!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Yêu cầu đã được chuyển trực tiếp tới Bộ phận Nhân sự. Mật khẩu tạm thời sẽ gửi qua email trong vòng 5-10 phút.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotStep(1);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {isQuickCheckinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-center">
            <button
              onClick={() => setIsQuickCheckinOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isCheckinSuccess ? (
              <>
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Chấm Công Định Vị GPS / Wi-Fi</h3>
                  <p className="text-xs text-slate-400">Hệ thống đang xác thực tọa độ văn phòng hiện tại</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-blue-400" /> Mạng Wi-Fi:
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{wifiName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" /> Tòa nhà:
                    </span>
                    <span className="text-white font-medium">WorkSync Tower (Tầng 12)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Sai số GPS:
                    </span>
                    <span className="text-emerald-400 font-medium">1.2 mét (Hợp lệ)</span>
                  </div>
                </div>

                {gpsStatus === 'locating' ? (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-blue-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang lấy vị trí vệ tinh GPS...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleConfirmQuickCheckin}
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Xác Nhận Chấm Công Vào Ca (Check-In)</span>
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Chấm Công Thành Công!</h4>
                  <p className="text-xs text-slate-300">
                    Thời gian ghi nhận: <strong className="text-emerald-400 font-mono">{currentTime.toLocaleTimeString('vi-VN')}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">Trạng thái: Đúng giờ (Ca Sáng 08:00 - 17:00)</p>
                </div>
                <button
                  onClick={() => setIsQuickCheckinOpen(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700"
                >
                  Đóng cửa sổ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {isSuccessModalOpen && loggedInUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl relative">

            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Đăng nhập thành công
              </span>
              <h3 className="text-2xl font-black text-white">Xin chào, {loggedInUser.id}!</h3>
              <p className="text-xs text-slate-300">Chuyển hướng vào Cổng thông tin làm việc cá nhân...</p>
            </div>

            {/* Profile Brief */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-left flex items-center gap-3">
              <img
                src={loggedInUser.avatar}
                alt={loggedInUser.role}
                className="w-12 h-12 rounded-xl object-cover border border-blue-500/30"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{loggedInUser.role}</p>
                <p className="text-[11px] text-slate-400 truncate">{loggedInUser.dept}</p>
                <p className="text-[10px] text-blue-400 font-medium">Ca làm việc: {loggedInUser.shift}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  alert(`Demo: Đang chuyển vào Bảng điều khiển Nhân viên (${loggedInUser.id})`);
                }}
                className="w-full bg-gradient-to-r from-[#1151c5] to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#1151c5]/30 flex items-center justify-center gap-2"
              >
                <span>Vào Bảng Điều Khiển Nhân Viên</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>© 2026 WorkSync Enterprise HRMS. Bản quyền thuộc về WorkSync Vietnam Co., Ltd.</p>
      </footer>

    </div>

);
}
