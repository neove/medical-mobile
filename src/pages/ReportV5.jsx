import React, { useState, useEffect, useRef } from 'react';
import { Share2, Download, X, ArrowRight, Quote, Activity, Calendar, Clock, Heart } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data & Assets
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    hospital: "第一人民医院",
    year: 2024,
    keyword: "坚守",
    summary: "在生与死的边界线上，你用冷静与专业，守住了生命的防线。2024，是平凡也不凡的一年。",
    stats: {
        patients: "2,856",
        surgeries: "328",
        hours: "2,460",
        nightShifts: "42",
        consultations: "156",
        words: "168",
        families: "3,200",
        rating: "4.99"
    },
    monthlyData: [
        { month: 'Jan', value: 45 }, { month: 'Feb', value: 52 }, { month: 'Mar', value: 58 },
        { month: 'Apr', value: 61 }, { month: 'May', value: 55 }, { month: 'Jun', value: 67 },
        { month: 'Jul', value: 72 }, { month: 'Aug', value: 65 }, { month: 'Sep', value: 58 },
        { month: 'Oct', value: 63 }, { month: 'Nov', value: 75 }, { month: 'Dec', value: 68 }
    ],
    highlights: [
        { title: "学术突破", desc: "发表 SCI 论文 3 篇" },
        { title: "技术革新", desc: "独立主刀 TAVI 56 例" },
        { title: "团队建设", desc: "年度绩效 Top 5%" }
    ],
    testimonials: [
        { text: "谢谢您给了我第二次生命，您是我的恩人。", author: "李阿姨 · 术后3个月" },
        { text: "从未见过如此耐心负责的医生，半夜还在回复我的疑问。", author: "张先生 · 患者家属" }
    ],
    quote: "医学不仅是一门科学，更是一门人学的艺术。"
};

// 杂志风背景图 - 偏向黑白、高雅、建筑感
const images = {
    cover: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1080&h=1920&fit=crop&q=80", // 抽象线条
    intro: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1080&h=1920&fit=crop&q=80", // 纸张/书写
    stats: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1080&h=1920&fit=crop&q=80", // 办公/思考
    calendar: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=1080&h=1920&fit=crop&q=80", // 日历/时间
    moments: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1080&h=1920&fit=crop&q=80", // 握手/关怀/黑白质感
    focus: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1080&h=1920&fit=crop&q=80", // 医院走廊黑白
    share: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&h=1920&fit=crop&q=80"  // 极简办公桌
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 1. 封面：大字报风格
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#f4f1ea] relative overflow-hidden flex flex-col p-8">
        {/* 装饰线 */}
        <div className={`absolute top-0 left-8 w-[1px] h-full bg-stone-300 transition-all duration-[1500ms] ${isActive ? 'scale-y-100' : 'scale-y-0 origin-top'}`} />
        <div className={`absolute top-0 right-8 w-[1px] h-full bg-stone-300 transition-all duration-[1500ms] delay-100 ${isActive ? 'scale-y-100' : 'scale-y-0 origin-bottom'}`} />
        
        <div className="flex-1 flex flex-col justify-center relative z-10">
            <div className={`transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="font-serif text-stone-500 italic text-lg mb-4">The Annual Report</p>
                <h1 className="text-[8rem] leading-[0.8] font-black text-stone-900 tracking-tighter font-serif mb-4">
                    20<br/>24
                </h1>
                <div className="w-20 h-2 bg-red-700 mb-8" />
                <h2 className="text-4xl font-light text-stone-800 mb-2">医路 · 行</h2>
                <p className="text-stone-500 tracking-widest uppercase text-sm">Medical Journey Review</p>
            </div>
        </div>

        <div className={`mt-auto relative z-10 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-between border-t border-stone-300 pt-6">
                <div>
                    <p className="font-bold text-stone-900">{reportData.name}</p>
                    <p className="text-stone-500 text-sm">{reportData.hospital} · {reportData.role}</p>
                </div>
                <Activity className="text-red-700 w-8 h-8" />
            </div>
        </div>
        
        {/* 背景纹理 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
    </div>
);

// 2. 序言：信件风格
const IntroPage = ({ isActive }) => (
    <div className="h-full w-full bg-stone-900 text-[#f4f1ea] relative overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: `url(${images.intro})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/80 to-stone-900" />

        <div className="relative z-10 flex-1 flex flex-col justify-end p-10 pb-20">
             <div className={`transition-all duration-1000 delay-200 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <Quote className="w-12 h-12 text-stone-600 mb-6 rotate-180" />
                <p className="text-2xl font-serif leading-relaxed mb-8 text-stone-200">
                    "{reportData.summary}"
                </p>
                <div className="w-full h-[1px] bg-stone-700 mb-8" />
            </div>

            <div className={`grid grid-cols-2 gap-8 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Keyword</p>
                    <p className="text-4xl font-serif text-red-500">{reportData.keyword}</p>
                </div>
                <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Days</p>
                    <p className="text-4xl font-serif">366</p>
                </div>
            </div>
        </div>
    </div>
);

// 3. 数据：报纸/财经版面
const StatsPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 20, right: 0, bottom: 20, left: 0 },
        xAxis: { show: false, data: reportData.monthlyData.map(d => d.month) },
        yAxis: { show: false },
        series: [{
            data: reportData.monthlyData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#333' },
            barWidth: '40%'
        }]
    };

    return (
        <div className="h-full w-full bg-[#e8e6e1] relative overflow-hidden flex flex-col p-6 pt-12">
            <div className={`mb-8 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-stone-300 pb-2 mb-4">Annual Statistics</h3>
                <h2 className="text-5xl font-serif text-stone-900">数读 2024</h2>
            </div>

            {/* 大数字网格 */}
            <div className="grid grid-cols-2 gap-[1px] bg-stone-300 border border-stone-300 mb-8">
                {[
                    { label: "接诊患者", val: reportData.stats.patients, unit: "人次" },
                    { label: "手术台次", val: reportData.stats.surgeries, unit: "台" },
                    { label: "夜班值守", val: reportData.stats.nightShifts, unit: "次" },
                    { label: "院内会诊", val: reportData.stats.consultations, unit: "例" }
                ].map((item, idx) => (
                    <div key={idx} className={`bg-[#f4f1ea] p-6 flex flex-col justify-between aspect-square transition-all duration-700 delay-${idx * 100 + 300} ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <span className="text-stone-400 text-xs">{item.label}</span>
                        <div className="mt-auto">
                            <span className="text-3xl font-bold text-stone-800">{item.val}</span>
                            <span className="text-xs ml-1 text-stone-500">{item.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 图表区域 */}
            <div className={`bg-white p-6 shadow-sm transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-xs text-stone-400 uppercase">Trend</p>
                        <p className="font-bold text-stone-800">月度工作量趋势</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                </div>
                <div className="h-32 w-full">
                     <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

// 4. 日历墙：极简网格
const CalendarPage = ({ isActive }) => {
    // 模拟一年 12 个月，每月 4 周的忙碌程度
    const weeks = Array.from({ length: 48 }, (_, i) => ({
        level: Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1
    }));

    return (
        <div className="h-full w-full bg-[#1a1a1a] text-[#f4f1ea] relative overflow-hidden flex flex-col p-8">
             <div className={`transition-all duration-1000 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="flex items-center gap-4 mb-8">
                    <Calendar className="w-6 h-6 text-stone-500" />
                    <h2 className="text-xl font-serif italic text-stone-400">365 Days of Persistence</h2>
                </div>
                <h1 className="text-4xl font-bold mb-12 text-white leading-tight">
                    每一个<br/>
                    被点亮的<br/>
                    <span className="text-stone-500">黎明与深夜</span>
                </h1>
            </div>

            {/* 热力图网格 */}
            <div className={`flex-1 grid grid-cols-6 gap-3 content-start transition-all duration-[1500ms] delay-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {weeks.map((w, i) => (
                    <div 
                        key={i} 
                        className={`aspect-square rounded-sm transition-all duration-500 hover:scale-110 ${
                            w.level === 3 ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 
                            w.level === 2 ? 'bg-stone-500' : 'bg-stone-800'
                        }`}
                        style={{ transitionDelay: `${i * 20}ms` }}
                    />
                ))}
            </div>

            <div className={`mt-auto pt-8 border-t border-stone-800 transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="flex justify-between items-end">
                    <div>
                         <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">Total Hours</p>
                         <p className="text-4xl font-mono font-bold text-white">{reportData.stats.hours}</p>
                    </div>
                    <p className="text-xs text-stone-600 max-w-[150px] text-right">
                        你的坚持，是患者最坚实的依靠。
                    </p>
                </div>
            </div>
        </div>
    );
};

// 5. 温暖时刻：大留白+引用
const MomentsPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#f4f1ea] relative overflow-hidden flex flex-col">
        <div className="h-1/2 w-full relative overflow-hidden">
            <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out ${isActive ? 'scale-100 rotate-0' : 'scale-110 rotate-1'} grayscale brightness-90 contrast-125`}
                style={{ backgroundImage: `url(${images.moments})` }}
            />
            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
        </div>

        <div className="h-1/2 w-full p-8 flex flex-col justify-center relative bg-[#f4f1ea]">
            {/* 装饰引号 */}
            <Quote className="absolute top-8 right-8 w-20 h-20 text-stone-200 rotate-180" />

            <div className="space-y-10 relative z-10">
                {reportData.testimonials.map((item, idx) => (
                     <div key={idx} className={`transition-all duration-1000 delay-${idx * 300 + 300} ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-xl text-stone-800 font-serif leading-relaxed mb-3">
                            "{item.text}"
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[1px] bg-red-700" />
                            <p className="text-xs text-stone-500 uppercase tracking-wider">{item.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// 6. 特写：图文混排
const FocusPage = ({ isActive }) => (
    <div className="h-full w-full bg-white relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-[60%] transition-transform duration-[2000ms] ease-out ${isActive ? 'scale-100' : 'scale-110'}`}>
            <img src={images.focus} alt="Focus" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-[45%] bg-white flex flex-col p-8">
             <div className={`-mt-12 bg-red-700 text-white w-16 h-16 flex items-center justify-center mb-6 transition-all duration-700 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Heart className="w-6 h-6" />
             </div>

             <div className={`transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                 <h3 className="text-2xl font-serif font-bold mb-4">高光时刻</h3>
                 <div className="space-y-6">
                    {reportData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-baseline border-b border-stone-100 pb-2">
                            <span className="text-stone-400 font-mono text-sm mr-4">0{idx + 1}</span>
                            <div>
                                <p className="font-bold text-stone-800 text-sm">{item.title}</p>
                                <p className="text-stone-500 text-xs">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
        </div>
    </div>
);

// 7. 寄语：致敬医者
const MessagePage = ({ isActive }) => (
    <div className="h-full w-full bg-[#f4f1ea] relative overflow-hidden flex flex-col justify-center p-10 text-center">
        <div className={`transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Quote className="w-10 h-10 text-stone-400 mx-auto mb-8" />
            
            <div className="font-serif text-xl text-stone-800 leading-loose space-y-6">
                <p>
                    2025，您用 <span className="font-bold text-3xl mx-1 border-b-2 border-stone-300">{reportData.stats.hours}</span> 小时的坚守，
                </p>
                <p>
                    守护了 <span className="font-bold text-3xl mx-1 border-b-2 border-stone-300">{reportData.stats.families}</span> 个生命的安康。
                </p>
                <p>
                    您写下的 <span className="font-bold text-3xl mx-1 border-b-2 border-stone-300">{reportData.stats.words}</span> 万字病历，
                </p>
                <p>
                    是 <span className="font-bold text-3xl mx-1 border-b-2 border-stone-300">{reportData.stats.families}</span> 个家庭不能忘却的记忆。
                </p>
            </div>

            <div className={`mt-12 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="inline-block border-y border-stone-400 py-3 px-8">
                    <span className="text-stone-600 font-serif tracking-[0.2em] uppercase text-sm">Thank you for everything</span>
                    <div className="text-2xl font-bold text-stone-900 mt-1">医路漫漫，感恩有您</div>
                </div>
            </div>
        </div>
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
    </div>
);

// 8. 分享：极简卡片
const SharePage = ({ isActive }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="h-full w-full bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center p-6">
            {/* 背景图模糊处理 */}
             <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                 <img src={images.share} className="w-full h-full object-cover" />
             </div>

            <div className={`relative z-10 bg-[#f4f1ea] w-full max-w-sm aspect-[3/5] p-8 flex flex-col shadow-2xl transition-all duration-1000 ${isActive ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-3 scale-95'}`}>
                {/* 顶部孔洞装饰 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1a] rounded-full" />
                
                <div className="border-b-2 border-stone-900 pb-6 mb-auto">
                    <h1 className="text-5xl font-black font-serif mb-2 text-stone-900">20<br/>24</h1>
                    <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Medical Report</p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end">
                        <span className="text-stone-500 text-xs uppercase">Doctor</span>
                        <span className="font-bold text-stone-900 border-b border-stone-300 pb-1">{reportData.name}</span>
                    </div>
                    <div className="flex justify-between items-end">
                         <span className="text-stone-500 text-xs uppercase">Keyword</span>
                         <span className="font-serif italic text-xl text-red-800">{reportData.keyword}</span>
                    </div>
                    <div className="flex justify-between items-end">
                         <span className="text-stone-500 text-xs uppercase">Patients</span>
                         <span className="font-mono text-lg">{reportData.stats.patients}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <p className="text-xs text-center text-stone-400 mb-4 font-serif italic">"{reportData.quote}"</p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("链接已复制");
                            }}
                            className="flex-1 py-4 bg-stone-200 text-stone-800 text-sm font-bold uppercase tracking-widest hover:bg-stone-300 transition-colors flex items-center justify-center gap-1"
                        >
                            <Share2 className="w-4 h-4" /> Link
                        </button>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="flex-1 py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-1"
                        >
                            <Download className="w-4 h-4" /> Poster
                        </button>
                    </div>
                </div>
            </div>

             {/* Share Modal */}
             {showModal && (
                <div className="absolute inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setShowModal(false)}>
                    <div className="bg-white w-full p-6 animate-slide-up rounded-t-xl">
                        <div className="flex justify-between mb-6">
                            <h3 className="font-bold">分享报告</h3>
                            <X className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center">
                            {['微信', '朋友圈', 'QQ', '保存'].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-gray-500">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------
// Main Container
// ----------------------------------------------------------------------

export default function ReportV5() {
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef(null);
    const isScrolling = useRef(false);

    const pages = [CoverPage, IntroPage, StatsPage, CalendarPage, MomentsPage, FocusPage, MessagePage, SharePage];

    const handleScroll = (direction) => {
        if (isScrolling.current) return;
        const next = currentPage + direction;
        if (next >= 0 && next < pages.length) {
            isScrolling.current = true;
            setCurrentPage(next);
            setTimeout(() => isScrolling.current = false, 1000); // 较长的冷却时间配合慢速动画
        }
    };

    const handleWheel = (e) => {
        if (Math.abs(e.deltaY) > 20) {
            handleScroll(e.deltaY > 0 ? 1 : -1);
        }
    };

    // Touch handling
    const touchStart = useRef(0);
    const handleTouchStart = (e) => touchStart.current = e.touches[0].clientY;
    const handleTouchEnd = (e) => {
        const diff = touchStart.current - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 50) handleScroll(diff > 0 ? 1 : -1);
    };

    return (
        <div 
            className="fixed inset-0 bg-black overflow-hidden font-sans"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* 页面容器：使用堆叠+滑动效果，而非简单的整屏平移，营造卡片感 */}
            {pages.map((Page, idx) => {
                // 计算每个页面的状态
                let zIndex = pages.length - idx;
                let translateY = '100%';
                let scale = 0.9;
                let opacity = 1;

                if (idx === currentPage) {
                    translateY = '0%';
                    scale = 1;
                } else if (idx < currentPage) {
                    translateY = '-100%'; // 上一页移上去
                    scale = 1;
                    opacity = 0;
                } else {
                    // 下一页待命
                    translateY = '100%'; 
                    scale = 0.95;
                }

                return (
                    <div
                        key={idx}
                        className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white shadow-2xl"
                        style={{
                            zIndex,
                            transform: `translateY(${translateY}) scale(${scale})`,
                            opacity
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                );
            })}

            {/* 极简进度条 */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 mix-blend-difference">
                {pages.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-[1px] transition-all duration-500 bg-white ${currentPage === idx ? 'h-8' : 'h-2 opacity-30'}`}
                    />
                ))}
            </div>

            {/* Logo / Watermark */}
            <div className="fixed top-6 left-6 z-50 mix-blend-difference text-white font-bold text-xs tracking-widest uppercase opacity-50 pointer-events-none">
                Medical Report
            </div>
        </div>
    );
}

