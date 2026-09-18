'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Calendar,
  LogOut,
  History,
  Sparkles,
  User,
  Building,
  Camera,
  X,
  CreditCard,
  DollarSign,
  Mail,
  Phone,
  Briefcase,
  Download,
  Play,
  Square
} from 'lucide-react';

const OFFICE_LOCATION = {
  lat: 21.028511,
  lng: 105.804817,
  name: 'Văn phòng Trụ sở Chính - Tầng 8'
};

const ALLOWED_RADIUS_METERS = 350;

const PAYROLL_DATA = [
  {
    month: 'Tháng 08/2026',
    baseSalary: 18000000,
    allowance: 1500000,
    otPay: 1250000,
    deductions: 1980000,
    workDays: '22/22',
    netSalary: 18770000,
    status: 'Đã thanh toán'
  },
  {
    month: 'Tháng 07/2026',
    baseSalary: 18000000,
    allowance: 1500000,
    otPay: 800000,
    deductions: 1980000,
    workDays: '21/22',
    netSalary: 18320000,
    status: 'Đã thanh toán'
  }
];

export default function EmployeeHomePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // State GPS & Chấm công
  const [userDistance, setUserDistance] = useState<number>(120);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTimeStr, setCheckInTimeStr] = useState<string | null>(null);
  const [checkOutTimeStr, setCheckOutTimeStr] = useState<string | null>(null);

  // State Modals
  const [showAttendanceModal, setShowAttendanceModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [profileActiveTab, setProfileActiveTab] = useState<'info' | 'payroll'>('info');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [historyLogs, setHistoryLogs] = useState([
    { id: '1', date: 'Hôm qua (17/09)', checkIn: '07:55:10', checkOut: '17:32:05', status: 'Đúng giờ', distance: '85m' },
    { id: '2', date: '16/09/2026', checkIn: '08:12:00', checkOut: '17:30:00', status: 'Đi trễ 12m', distance: '140m' }
  ]);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isWithinZone = userDistance <= ALLOWED_RADIUS_METERS;

  const handleRefreshGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      showToast('Đã cập nhật tọa độ GPS mới nhất!');
    }, 800);
  };

  const toggleLocationDemo = (distance: number) => {
    setUserDistance(distance);
    if (distance > ALLOWED_RADIUS_METERS) {
      showToast(`Đã chuyển vị trí ra xa (${distance}m) — Không thể chấm công!`);
    } else {
      showToast(`Đã chuyển vị trí gần (${distance}m) — Hợp lệ để chấm công!`);
    }
  };

  const handleMainActionClick = () => {
    if (!isWithinZone) {
      showToast('⚠️ Vị trí của bạn vượt quá 350m từ văn phòng!');
      return;
    }
    setShowAttendanceModal(true);
  };

  const confirmAttendance = () => {
    setIsProcessing(true);
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('vi-VN', { hour12: false });

    setTimeout(() => {
      setIsProcessing(false);
      setShowAttendanceModal(false);

      if (!isCheckedIn) {
        setIsCheckedIn(true);
        setCheckInTimeStr(timeFormatted);
        showToast('🎉 Đã BẮT ĐẦU làm việc! Nút chuyển sang màu đỏ đếm giờ ca làm.');
      } else {
        setIsCheckedIn(false);
        setCheckOutTimeStr(timeFormatted);
        showToast('✅ Đã TAN LÀM thành công!');

        setHistoryLogs([
          {
            id: Date.now().toString(),
            date: 'Hôm nay (' + now.toLocaleDateString('vi-VN') + ')',
            checkIn: checkInTimeStr || timeFormatted,
            checkOut: timeFormatted,
            status: 'Hoàn thành',
            distance: `${userDistance}m`
          },
          ...historyLogs
        ]);
      }
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedPayroll = PAYROLL_DATA[selectedMonthIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER TOP BAR */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-4 md:px-8 py-3 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              setProfileActiveTab('info');
              setShowProfileModal(true);
            }}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-2xl transition-all cursor-pointer group text-left border border-transparent hover:border-slate-200"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                Nguyễn Văn A
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold">Lập trình viên</span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                {OFFICE_LOCATION.name}
              </p>
            </div>
          </button>

          <button
            onClick={() => showToast('Đăng xuất thành công')}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        {/* DEMO TEST PANEL */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md">DEMO TEST</span>
            <span className="font-semibold text-slate-200">Giả lập vị trí GPS nhân viên:</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleLocationDemo(120)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                userDistance <= ALLOWED_RADIUS_METERS
                  ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              📍 Trong vùng (120m)
            </button>
            <button
              onClick={() => toggleLocationDemo(1850)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                userDistance > ALLOWED_RADIUS_METERS
                  ? 'bg-rose-500 text-white ring-2 ring-rose-300'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              🚫 Ngoài vùng (1.8km)
            </button>
          </div>
        </div>

        {/* HERO SECTION - CHẤM CÔNG VÀ ĐỒNG HỒ */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-slate-50 -z-0"></div>

          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {currentTime ? currentTime.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }) : '...'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-mono">
              {currentTime ? currentTime.toLocaleTimeString('vi-VN', { hour12: false }) : '00:00:00'}
            </h1>
          </div>

          <div className="relative z-10 max-w-sm mx-auto bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${isWithinZone ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-slate-900 font-bold">Khoảng cách: <span className={isWithinZone ? 'text-emerald-600' : 'text-rose-600'}>{userDistance}m</span></p>
                <p className="text-[10px] text-slate-400 font-medium">Bán kính tối đa: {ALLOWED_RADIUS_METERS}m</p>
              </div>
            </div>

            <button
              onClick={handleRefreshGPS}
              disabled={isLocating}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-white rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
              <RotateCcw className={`w-4 h-4 ${isLocating ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>

          {/* NÚT CHẤM CÔNG NỔI BẬT: ĐỔI MÀU LỤC / ĐỎ CHUẨN MÌNH */}
          <div className="relative z-10 py-4 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              
              {/* Vòng sáng viền mờ tinh tế - chỉ lan ra nhẹ quanh viền nút */}
              {isWithinZone && (
                <div
                  className={`absolute -inset-2 rounded-full animate-pulse opacity-60 blur-md pointer-events-none transition-all ${
                    isCheckedIn ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                ></div>
              )}

              {/* Nút bấm chính */}
              <button
                onClick={handleMainActionClick}
                disabled={!isWithinZone}
                className={`relative w-44 h-44 md:w-48 md:h-48 rounded-full font-black text-white shadow-lg flex flex-col items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer ${
                  !isWithinZone
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : isCheckedIn
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <div className="p-3 bg-white/20 rounded-full mb-2">
                  {isCheckedIn ? (
                    <Square className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
                  ) : (
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-white ml-0.5" />
                  )}
                </div>

                <span className="text-base md:text-lg font-black tracking-wider uppercase">
                  {!isWithinZone ? 'NGOÀI VÙNG' : isCheckedIn ? 'TAN LÀM' : 'BẮT ĐẦU LÀM'}
                </span>

                <span className="text-[10px] md:text-[11px] text-white/90 font-medium mt-1">
                  {!isWithinZone
                    ? 'Chấm công bị khóa'
                    : isCheckedIn
                    ? 'Đang tính giờ đi làm'
                    : 'Bấm để điểm danh'}
                </span>
              </button>
            </div>

            {!isWithinZone && (
              <p className="mt-4 text-xs font-bold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Bạn cách văn phòng {userDistance - ALLOWED_RADIUS_METERS}m. Vui lòng di chuyển lại gần!</span>
              </p>
            )}
          </div>

           

          <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl text-left">
              <span className="text-slate-400 font-semibold block text-[11px]">Bắt đầu ca làm</span>
              <p className="text-sm font-black text-emerald-600 mt-0.5">
                {checkInTimeStr ? checkInTimeStr : '--:--:--'}
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl text-left">
              <span className="text-slate-400 font-semibold block text-[11px]">Kết thúc tan làm</span>
              <p className="text-sm font-black text-rose-600 mt-0.5">
                {checkOutTimeStr ? checkOutTimeStr : '--:--:--'}
              </p>
            </div>
          </div>
        </div>

        {/* THỐNG KÊ LƯƠNG & CÔNG */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => {
              setProfileActiveTab('payroll');
              setShowProfileModal(true);
            }}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <p className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
              <span>Lương thực nhận</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </p>
            <p className="text-lg font-black text-emerald-600 mt-1">18.77 <span className="text-xs text-slate-400 font-semibold">tr/tháng</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400">Công tích lũy</p>
            <p className="text-xl font-black text-slate-900 mt-1">18.5 <span className="text-xs text-slate-400 font-semibold">ngày</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400">Đi trễ / Về sớm</p>
            <p className="text-xl font-black text-amber-600 mt-1">1 <span className="text-xs text-slate-400 font-semibold">lần</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400">Giờ OT (Tăng ca)</p>
            <p className="text-xl font-black text-purple-600 mt-1">6.5 <span className="text-xs text-slate-400 font-semibold">giờ</span></p>
          </div>
        </div>

        {/* NHẬT KÝ CHẤM CÔNG */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <span>Lịch sử chấm công gần đây</span>
            </h2>
            <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline">Xem tất cả</span>
          </div>

          <div className="space-y-2.5">
            {historyLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between text-xs hover:bg-slate-100 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">{log.date}</p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Vào: <strong className="text-slate-700">{log.checkIn}</strong> — Ra: <strong className="text-slate-700">{log.checkOut}</strong>
                  </p>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {log.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono">Cách VP: {log.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL THÔNG TIN CÁ NHÂN & BẢNG LƯƠNG TỪNG THÁNG */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="p-5 bg-slate-900 text-white relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar Detail"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                />
                <div>
                  <h3 className="text-base font-black">Nguyễn Văn A</h3>
                  <p className="text-xs text-slate-300 font-medium">Mã NV: <strong className="text-amber-400">WS-8842</strong></p>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 text-slate-400 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
              <button
                onClick={() => setProfileActiveTab('info')}
                className={`flex-1 py-3.5 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                  profileActiveTab === 'info'
                    ? 'border-emerald-600 text-emerald-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Thông tin cá nhân</span>
              </button>
              <button
                onClick={() => setProfileActiveTab('payroll')}
                className={`flex-1 py-3.5 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                  profileActiveTab === 'payroll'
                    ? 'border-emerald-600 text-emerald-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Bảng lương từng tháng</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {profileActiveTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] font-bold">Họ và tên</span>
                      <p className="font-extrabold text-slate-900 mt-0.5">Nguyễn Văn A</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] font-bold">Chức danh</span>
                      <p className="font-extrabold text-emerald-600 mt-0.5">Lập trình viên Frontend</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Email</span>
                        <p className="font-bold text-slate-800">nguyenvana@worksync.vn</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Số điện thoại</span>
                        <p className="font-bold text-slate-800">0988 123 456</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Phòng ban / Ngày vào làm</span>
                        <p className="font-bold text-slate-800">Phòng Công Nghệ — 15/03/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                      <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tài khoản ngân hàng</span>
                        <p className="font-bold text-slate-800">MB Bank — 1900 8888 9999</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {profileActiveTab === 'payroll' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-100 p-2 rounded-2xl">
                    <span className="text-slate-600 font-bold px-2">Chọn tháng lương:</span>
                    <select
                      value={selectedMonthIndex}
                      onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                      className="bg-white border border-slate-200 text-slate-900 font-extrabold px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      {PAYROLL_DATA.map((item, idx) => (
                        <option key={idx} value={idx}>
                          {item.month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <p className="text-[11px] text-slate-400">Phiếu lương chi tiết</p>
                        <p className="text-lg font-black text-amber-400">{selectedPayroll.month}</p>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {selectedPayroll.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Lương cơ bản:</span>
                        <span className="font-bold">{selectedPayroll.baseSalary.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Phụ cấp:</span>
                        <span className="font-bold text-emerald-400">+{selectedPayroll.allowance.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Lương OT:</span>
                        <span className="font-bold text-emerald-400">+{selectedPayroll.otPay.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Trừ BHXH & Thuế:</span>
                        <span className="font-bold text-rose-400">-{selectedPayroll.deductions.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="font-bold text-slate-200">THỰC NHẬN (NET):</span>
                      <span className="text-xl font-black text-emerald-400">
                        {selectedPayroll.netSalary.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Đang tải phiếu lương PDF...')}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải phiếu lương PDF</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL XÁC THỰC FACEID CHẤM CÔNG */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-5 relative">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pt-2">
              <h3 className="text-base font-black text-slate-900">
                Xác thực {isCheckedIn ? 'Tan Làm' : 'Bắt Đầu Làm'}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Hệ thống đang quét FaceID & vị trí GPS của bạn
              </p>
            </div>

            <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 border-4 border-emerald-500/30 flex items-center justify-center relative overflow-hidden shadow-inner">
              <Camera className="w-10 h-10 text-emerald-600 animate-pulse" />
              <div className="absolute inset-0 border-t-2 border-emerald-600 animate-spin"></div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-800">Khoảng cách xác nhận: {userDistance}m</p>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Định vị GPS hợp lệ (Dưới 350m)
              </p>
            </div>

            <button
              onClick={confirmAttendance}
              disabled={isProcessing}
              className={`w-full py-3 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 text-white cursor-pointer ${
                isCheckedIn ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isProcessing ? 'Đang xác thực FaceID...' : 'Xác Nhận Chấm Công'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}