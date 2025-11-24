import React, { useState, useRef, useEffect } from 'react';
import { Share2, PenTool, Calendar, CheckCircle, Star, Heart, Paperclip, Smile } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科",
    year: 2024,
    stats: {
        patients: 1850,
        surgeries: 320,
        hours: 2400,
        cupsOfCoffee: 680 
    },
    monthlyData: [45, 52, 48, 61, 55, 67, 72, 65, 58, 63, 59, 48],
    notes: [
        { date: "3月12日", content: "今天的手术非常成功，患者家属哭了，我也差点哭了。", type: "happy" },
        { date: "8月5日", content: "连续工作了16个小时，咖啡是我的救命稻草。", type: "tired" },
        { date: "11月20日", content: "收到了小朋友送的画，画里的我像个超人。", type: "touched" }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 手绘风格容器
const PaperContainer = ({ children, className = "", rotate = 0 }) => (
    <div 
        className={`relative bg-[#fffdf0] shadow-[2px_4px_12px_rgba(0,0,0,0.1)] border border-stone-200 ${className}`}
        style={{ 
            transform: `rotate(${rotate}deg)`,
            backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}
    >
        {/* 顶部螺旋装订孔模拟 */}
        <div className="absolute -top-3 left-0 right-0 flex justify-evenly px-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-6 bg-stone-300 rounded-full shadow-inner border border-stone-400" />
            ))}
        </div>
        {children}
    </div>
);

// 胶带效果
const Tape = ({ className = "" }) => (
    <div className={`absolute h-8 w-24 bg-white/40 backdrop-blur-sm border-l border-r border-white/60 shadow-sm rotate-[-3deg] ${className}`} 
         style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h4v4H0z\' fill=\'%23ffffff\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")' }}
    />
);

// 1. 封面：手账本封面
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-[#f0f0f0]">
        <div className={`relative w-full max-w-sm transition-all duration-1000 ${isActive ? 'translate-y-0 rotate-0' : 'translate-y-20 rotate-3'}`}>
            <PaperContainer className="p-8 min-h-[500px] rounded-lg flex flex-col items-center text-center">
                <div className="mt-12 mb-8">
                    <div className="w-32 h-32 border-4 border-stone-800 rounded-full flex items-center justify-center mx-auto relative">
                        <PenTool className="w-16 h-16 text-stone-800" />
                        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-stone-800 border-2 border-stone-800 rotate-12 font-handwriting text-lg">
                            2024
                        </div>
                    </div>
                </div>
                
                <h1 className="text-4xl font-bold text-stone-800 mb-2 tracking-tight font-handwriting">工作手账</h1>
                <h2 className="text-xl text-stone-500 font-handwriting mb-8">年度医疗记录</h2>
                
                <div className="w-full border-t-2 border-dashed border-stone-300 my-4" />
                
                <div className="font-handwriting text-2xl text-stone-700 -rotate-2 space-y-2">
                    <p>姓名: {reportData.name}</p>
                    <p>科室: {reportData.role}</p>
                </div>

                <div className="absolute bottom-8 right-8">
                    <div className="text-red-500 font-bold text-2xl border-4 border-red-500 p-2 rounded-lg opacity-80 -rotate-12 font-handwriting">
                        绝密档案
                    </div>
                </div>
            </PaperContainer>
        </div>
    </div>
);

// 2. 涂鸦数据页
const StatsPage = ({ isActive }) => {
    const stats = [
        { label: "接诊患者", val: reportData.stats.patients, icon: Smile, color: "text-blue-600" },
        { label: "手术台数", val: reportData.stats.surgeries, icon: ActivityIcon, color: "text-red-600" },
        { label: "咖啡消耗", val: reportData.stats.cupsOfCoffee, icon: CoffeeIcon, color: "text-amber-700" }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#e8e8e8]">
            <PaperContainer className="p-6 w-full max-w-sm h-[580px] rounded-sm" rotate={-2}>
                <Tape className="-top-4 left-1/2 -translate-x-1/2" />
                
                <h2 className="text-3xl font-bold text-stone-800 mt-6 mb-8 font-handwriting border-b-4 border-yellow-300 inline-block">
                    关键数字
                </h2>

                <div className="space-y-8">
                    {stats.map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-4 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                            <div className="w-12 h-12 bg-stone-100 border-2 border-stone-800 rounded-lg flex items-center justify-center shadow-[4px_4px_0_#292524]">
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-stone-800 font-handwriting">{item.val}</div>
                                <div className="text-stone-500 font-bold text-sm tracking-wider font-handwriting">{item.label}</div>
                            </div>
                            {/* 模拟马克笔圈注 */}
                            {idx === 0 && isActive && (
                                <svg className="absolute right-4 w-16 h-16 pointer-events-none text-red-500/50" viewBox="0 0 100 100">
                                    <path d="M10,50 Q30,10 80,40 T60,90 T20,60" fill="none" stroke="currentColor" strokeWidth="5" className="animate-draw" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-4 bg-yellow-100 border border-yellow-300 rounded shadow-sm rotate-1">
                    <p className="font-handwriting text-stone-700 text-xl leading-relaxed">
                        "这一年真的辛苦了！特别是那 {reportData.stats.cupsOfCoffee} 杯咖啡..." ☕️
                    </p>
                </div>
            </PaperContainer>
        </div>
    );
};

// 3. 手绘图表页
const ChartPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 30, bottom: 30, left: 10, right: 10, containLabel: true },
        xAxis: { 
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: { lineStyle: { color: '#57534e', width: 2 } },
            axisTick: { show: false },
            axisLabel: { fontFamily: '"Long Cang", cursive', color: '#57534e', fontSize: 14 }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { type: 'dashed', color: '#d6d3d1' } },
            axisLabel: { fontFamily: '"Long Cang", cursive', color: '#57534e' }
        },
        series: [{
            data: reportData.monthlyData,
            type: 'line',
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: { color: '#ef4444', borderColor: '#000', borderWidth: 2 },
            lineStyle: { width: 3, color: '#000', type: 'solid' }, // 黑色描边模拟签字笔
            areaStyle: { color: '#fecaca', opacity: 0.5 } // 浅红色填充
        }]
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#f5f5f5]">
            <PaperContainer className="p-4 w-full max-w-sm h-[500px] rounded-lg" rotate={2}>
                 <Paperclip className="absolute -top-3 right-8 w-8 h-8 text-stone-400 rotate-12" />
                 
                 <h2 className="text-2xl font-bold text-stone-800 mt-4 mb-2 font-handwriting pl-2">
                    忙碌趋势
                 </h2>
                 <p className="text-stone-400 text-sm font-handwriting mb-6 pl-2 text-lg">// 月度工作量统计</p>

                 <div className="h-[300px] w-full border-2 border-stone-800 rounded bg-white p-2 shadow-[4px_4px_0_#e7e5e4]">
                    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                 </div>

                 <div className="mt-6 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-stone-800"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-stone-800"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-stone-800"></div>
                    <span className="ml-auto font-handwriting text-stone-500 pt-1 text-lg">记号笔涂鸦</span>
                 </div>
            </PaperContainer>
        </div>
    );
};

// 4. 便签日记页
const NotePage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#e5e5e5]">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 tracking-tight font-handwriting bg-white px-4 py-1 -rotate-2 shadow-lg">
            心情日记
        </h2>

        <div className="relative w-full max-w-sm space-y-6">
            {reportData.notes.map((note, idx) => (
                <div 
                    key={idx}
                    className={`p-6 shadow-md transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ 
                        backgroundColor: note.type === 'happy' ? '#fef3c7' : note.type === 'tired' ? '#e0f2fe' : '#fecaca',
                        transform: `rotate(${idx % 2 === 0 ? -2 : 3}deg)`,
                        transitionDelay: `${idx * 300}ms`
                    }}
                >
                    <div className="w-3 h-3 rounded-full bg-black/10 mx-auto mb-4 shadow-inner" /> {/* 钉子孔 */}
                    <div className="flex justify-between items-center mb-3 border-b border-black/10 pb-2">
                        <span className="font-bold font-handwriting text-stone-700 text-xl">{note.date}</span>
                        {note.type === 'happy' && <Smile className="w-5 h-5 text-stone-600" />}
                        {note.type === 'touched' && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
                    </div>
                    <p className="font-handwriting text-xl text-stone-800 leading-snug">
                        {note.content}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// 5. 拍立得分享页
const SharePage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-stone-200">
        <div className={`relative w-full max-w-xs transition-all duration-1000 ${isActive ? 'scale-100 rotate-0' : 'scale-90 rotate-6'}`}>
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-16 shadow-2xl transform rotate-[-2deg]">
                <div className="aspect-square bg-stone-100 border border-stone-100 mb-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80')] bg-cover bg-center filter sepia contrast-125 grayscale-[0.3]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-4xl font-bold font-handwriting tracking-tighter">2024</div>
                        <div className="text-sm font-handwriting opacity-80 text-lg">年度最佳医生</div>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="font-handwriting text-3xl text-stone-800 mb-2">{reportData.name} 医生</p>
                    <p className="font-handwriting text-stone-400 text-lg">年度工作总结</p>
                </div>
            </div>
            
            {/* Action Button */}
            <button className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[200px] bg-stone-800 text-white font-bold font-handwriting text-xl py-3 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                分享美好回忆
            </button>
        </div>
    </div>
);

// Icons
const ActivityIcon = (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const CoffeeIcon = (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV10() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, StatsPage, ChartPage, NotePage, SharePage];

    const handleScroll = (direction) => {
        if (isScrolling.current) return;
        const next = currentPage + direction;
        if (next >= 0 && next < pages.length) {
            isScrolling.current = true;
            setCurrentPage(next);
            setTimeout(() => isScrolling.current = false, 800);
        }
    };

    const handleWheel = (e) => {
        if (Math.abs(e.deltaY) > 20) handleScroll(e.deltaY > 0 ? 1 : -1);
    };

    const touchStart = useRef(0);
    const handleTouchStart = (e) => touchStart.current = e.touches[0].clientY;
    const handleTouchEnd = (e) => {
        const diff = touchStart.current - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 50) handleScroll(diff > 0 ? 1 : -1);
    };

    return (
        <div 
            className="fixed inset-0 bg-[#f0f0f0] overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* 引入 Long Cang 中文字体模拟手写 */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Long+Cang&display=swap');
                .font-handwriting { font-family: 'Long Cang', cursive; }
                
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
                .animate-draw {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 2s ease-out forwards;
                }
            `}</style>

            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#f0f0f0]">
                {pages.map((Page, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out origin-bottom-left`}
                        style={{
                            transform: idx === currentPage ? 'rotate(0deg)' : idx < currentPage ? 'rotate(-10deg) translateX(-120%)' : 'rotate(5deg) translateX(100%)',
                            opacity: idx === currentPage ? 1 : 0,
                            zIndex: idx === currentPage ? 10 : 0,
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                ))}
                
                {/* Page Indicator: Sticky Notes */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-3 h-8 rounded-l-sm shadow-sm transition-all duration-300 ${
                                currentPage === idx ? 'bg-red-500 w-6 translate-x-0' : 'bg-yellow-300 translate-x-1'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
