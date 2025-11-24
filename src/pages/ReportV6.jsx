import React, { useState, useRef } from 'react';
import { Share2, ChevronDown, Quote, Activity, Layers, Zap, Wind, Star, Clock, Download } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    year: 2024,
    keyword: "沉淀",
    stats: {
        patients: "2,856",
        surgeries: "328",
        hours: "2,460",
        nightShifts: "42",
        consultations: "156",
        words: "168",
        families: "3,200",
        rating: 99.8
    },
    monthlyData: [45, 52, 58, 61, 55, 67, 72, 65, 58, 63, 75, 68],
    highlights: [
        { title: "科研突破", desc: "SCI 论文 3 篇 (IF 12.5)" },
        { title: "微创先锋", desc: "独立主刀 TAVI 56 例" },
        { title: "患者信赖", desc: "锦旗 28 面，好评 Top 10" }
    ],
    abilities: [
        { name: '临床技术', max: 100, value: 95 },
        { name: '科研能力', max: 100, value: 88 },
        { name: '患者沟通', max: 100, value: 92 },
        { name: '团队协作', max: 100, value: 90 },
        { name: '应急处理', max: 100, value: 85 }
    ],
    moments: [
        { month: "03月", event: "主刀首例高难度 TAVI 手术" },
        { month: "06月", event: "参与国际心血管学术会议并发言" },
        { month: "09月", event: "收到患者手写的千字感谢信" },
        { month: "11月", event: "团队获得年度医疗质量金奖" }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 动态流光背景
const FlowBackground = ({ color }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
        {/* 动态光斑 1 */}
        <div 
            className={`absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-40 animate-flow-slow mix-blend-screen transition-colors duration-1000 ease-in-out`}
            style={{ backgroundColor: color[0] }}
        />
        {/* 动态光斑 2 */}
        <div 
            className={`absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-30 animate-flow-reverse mix-blend-screen transition-colors duration-1000 ease-in-out`}
            style={{ backgroundColor: color[1] }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

// 1. 封面：静谧深空
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-10 text-center">
        <FlowBackground color={['#4f46e5', '#c026d3']} /> {/* Indigo to Fuchsia */}
        
        <div className={`relative z-10 transition-all duration-1000 ease-out delay-300 ${isActive ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-lg'}`}>
            <div className="mb-6 inline-block p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Activity className="w-6 h-6 text-white/80" />
            </div>
            <h2 className="text-sm font-serif text-white/60 tracking-[0.5em] uppercase mb-4">Medical Report</h2>
            <h1 className="text-6xl font-serif text-white mb-8 font-light">
                二零<br/>二四
            </h1>
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-8" />
            <p className="text-white/80 font-serif text-lg tracking-widest">{reportData.name}</p>
        </div>

        <div className={`absolute bottom-12 transition-opacity duration-1000 delay-1000 ${isActive ? 'opacity-50' : 'opacity-0'}`}>
            <div className="animate-bounce">
                <ChevronDown className="text-white w-6 h-6" />
            </div>
        </div>
    </div>
);

// 2. 数据：极简浮动
const StatsPage = ({ isActive }) => {
    const stats = [
        { label: "接诊患者", value: reportData.stats.patients, unit: "人次" },
        { label: "主刀手术", value: reportData.stats.surgeries, unit: "台" },
        { label: "夜班值守", value: reportData.stats.nightShifts, unit: "次" },
        { label: "好评率", value: reportData.stats.rating, unit: "%" },
    ];

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-center p-8">
            <FlowBackground color={['#059669', '#0284c7']} /> {/* Emerald to Sky */}
            
            <div className={`relative z-10 mb-16 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl font-serif text-white mb-2">年度概览</h2>
                <p className="text-white/40 font-serif text-sm">Overview</p>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
                {stats.map((item, idx) => (
                    <div 
                        key={idx}
                        className="flex items-baseline justify-between border-b border-white/10 pb-4"
                        style={{
                            transition: 'all 1s ease-out',
                            transitionDelay: `${idx * 200 + 300}ms`,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(20px)'
                        }}
                    >
                        <span className="text-white/60 font-serif">{item.label}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-light text-white font-serif">{item.value}</span>
                            <span className="text-xs text-white/40">{item.unit}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. [新增] 能力图谱：雷达
const AbilityPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: reportData.abilities.map(a => ({ name: a.name, max: a.max })),
            shape: 'circle',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'serif',
                    fontSize: 12
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)',
                        'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)'
                    ]
                }
            },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
        },
        series: [{
            type: 'radar',
            data: [{ value: reportData.abilities.map(a => a.value) }],
            symbol: 'none',
            lineStyle: { width: 1, color: '#fff' },
            areaStyle: { color: 'rgba(255, 255, 255, 0.2)' }
        }]
    };

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-center p-6">
            <FlowBackground color={['#7c3aed', '#2563eb']} /> {/* Violet to Blue */}
            
            <div className={`relative z-10 mb-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl font-serif text-white mb-2">多维能力</h2>
                <p className="text-white/40 font-serif text-sm">Capabilities</p>
            </div>

            <div className={`relative z-10 h-[360px] w-full transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </div>
    );
};

// 4. 趋势：流光曲线
const ChartPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 40, right: 20, bottom: 20, left: 20, containLabel: true },
        xAxis: { 
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLine: { show: false },
            axisLabel: { color: 'rgba(255,255,255,0.4)', fontFamily: 'serif' },
            axisTick: { show: false }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
            axisLabel: { show: false }
        },
        series: [{
            data: reportData.monthlyData,
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2, color: '#fff' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(255, 255, 255, 0.2)' }, { offset: 1, color: 'rgba(255, 255, 255, 0)' }]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-center p-4">
            <FlowBackground color={['#ea580c', '#db2777']} /> {/* Orange to Pink */}
            
            <div className={`relative z-10 p-6 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-3xl font-serif text-white mb-2">忙碌时刻</h2>
                <p className="text-white/40 font-serif text-sm mb-8">Busy Hours</p>
                
                <div className="h-[300px] w-full">
                    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

// 5. [新增] 时光印记
const MomentsPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col justify-center p-8">
        <FlowBackground color={['#be185d', '#e11d48']} /> {/* Rose to Red */}
        
        <div className={`relative z-10 mb-12 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-serif text-white mb-2">时光印记</h2>
            <p className="text-white/40 font-serif text-sm">Memorable Moments</p>
        </div>

        <div className="relative z-10 space-y-8">
            {reportData.moments.map((item, idx) => (
                <div 
                    key={idx}
                    className="flex gap-6 group"
                    style={{
                        transition: 'all 1s ease-out',
                        transitionDelay: `${idx * 300 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                >
                    <div className="text-white/40 font-serif text-lg pt-1">{item.month}</div>
                    <div className="flex-1 border-l border-white/20 pl-6 pb-2 group-last:border-l-0 relative">
                        <div className="absolute -left-[5px] top-[10px] w-2 h-2 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-125 transition-all" />
                        <p className="text-white/90 font-serif text-lg leading-relaxed">{item.event}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// 6. 寄语：致敬医者
const MessagePage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
        <FlowBackground color={['#312e81', '#4c1d95']} /> {/* Indigo to Violet */}
        
        <div className={`relative z-10 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-12">
                <div className="w-1 h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto" />
            </div>

            <div className="font-serif font-light space-y-8 text-lg tracking-wide">
                <div className={`transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-white/60 text-sm mb-2">2025</p>
                    <p className="text-white">
                        以 <span className="text-2xl font-normal text-white border-b border-white/20 pb-1 mx-1">{reportData.stats.hours}</span> 时之微光
                    </p>
                    <p className="text-white mt-2">
                        照亮 <span className="text-2xl font-normal text-white border-b border-white/20 pb-1 mx-1">{reportData.stats.families}</span> 个生命角落
                    </p>
                </div>

                <div className={`transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-white">
                        书写 <span className="text-2xl font-normal text-white border-b border-white/20 pb-1 mx-1">{reportData.stats.words}</span> 万字医案
                    </p>
                    <p className="text-white mt-2">
                        铭刻 <span className="text-2xl font-normal text-white border-b border-white/20 pb-1 mx-1">{reportData.stats.families}</span> 户人间冷暖
                    </p>
                </div>

                <div className={`py-8 transition-all duration-1000 delay-[1200ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="inline-block px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                         <p className="text-xs text-white/60 uppercase tracking-[0.2em]">"Thank you"</p>
                    </div>
                </div>

                <div className={`transition-all duration-1000 delay-[1600ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-white/80 text-base">愿 悬壶济世 岁岁安康</p>
                    <p className="text-white/80 text-base mt-2">不负韶华 必有回响</p>
                </div>
            </div>
            
            <div className={`mt-12 transition-all duration-1000 delay-[2000ms] ${isActive ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}>
                <div className="text-xl font-serif text-white tracking-[0.5em] opacity-80">
                    感恩有您
                </div>
            </div>
        </div>
    </div>
);

// 7. 关键词：电影字幕
const KeywordPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
        <FlowBackground color={['#2563eb', '#4f46e5']} /> {/* Blue to Indigo */}
        
        <div className={`relative z-10 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Quote className="w-8 h-8 text-white/30 mx-auto mb-6" />
            <p className="text-white/60 font-serif text-lg mb-8 italic">"医学是科学，也是艺术。"</p>
            
            <div className="relative">
                <div className="absolute -inset-4 bg-white/10 blur-xl rounded-full opacity-50 animate-pulse" />
                <h2 className="relative text-7xl font-serif text-white font-bold tracking-widest">{reportData.keyword}</h2>
            </div>
            
            <div className="mt-12 space-y-2">
                {reportData.highlights.map((item, idx) => (
                    <p 
                        key={idx}
                        className="text-white/70 font-serif text-sm"
                        style={{
                            transition: 'all 1s ease',
                            transitionDelay: `${idx * 200 + 800}ms`,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(10px)'
                        }}
                    >
                        {item.title} · {item.desc}
                    </p>
                ))}
            </div>
        </div>
    </div>
);

// 7. 分享：极简名片
const SharePage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-8">
        <FlowBackground color={['#000000', '#111111']} /> {/* Deep Dark */}
        
        <div className={`relative z-10 w-full max-w-xs transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'opacity-100 rotate-0 translate-y-0' : 'opacity-0 rotate-3 translate-y-20'}`}>
            {/* 卡片主体 */}
            <div className="bg-white text-black p-8 pt-12 pb-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-2xl font-serif font-bold mb-1">{reportData.name}</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Cardiovascular Surgeon</p>
                    </div>
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full">
                        <span className="font-serif italic font-bold">24</span>
                    </div>
                </div>

                <div className="space-y-4 mb-10 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-serif">Annual Keyword</span>
                        <span className="font-bold font-serif">{reportData.keyword}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-serif">Patients</span>
                        <span className="font-bold font-serif">{reportData.stats.patients}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-serif">Rating</span>
                        <span className="font-bold font-serif">{reportData.stats.rating}%</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-serif mt-4">
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("链接已复制");
                        }}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                        <Share2 className="w-3 h-3" />
                        <span>Copy Link</span>
                    </button>
                    <span>|</span>
                    <button 
                        onClick={() => alert("海报生成功能开发中...")}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                        <Download className="w-3 h-3" />
                        <span>Save Card</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV6() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, StatsPage, AbilityPage, ChartPage, MomentsPage, MessagePage, KeywordPage, SharePage];

    const handleScroll = (direction) => {
        if (isScrolling.current) return;
        const next = currentPage + direction;
        if (next >= 0 && next < pages.length) {
            isScrolling.current = true;
            setCurrentPage(next);
            setTimeout(() => isScrolling.current = false, 1200);
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
            className="fixed inset-0 bg-black overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <style>{`
                @keyframes flow-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(10%, 10%) scale(1.1); }
                }
                @keyframes flow-reverse {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-10%, -5%) scale(1.2); }
                }
                .animate-flow-slow { animation: flow-slow 8s ease-in-out infinite; }
                .animate-flow-reverse { animation: flow-reverse 10s ease-in-out infinite; }
            `}</style>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto bg-black shadow-2xl">
                {pages.map((Page, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
                        style={{
                            transform: idx === currentPage ? 'translateY(0)' : idx < currentPage ? 'translateY(-100%)' : 'translateY(100%)',
                            opacity: idx === currentPage ? 1 : 0,
                            zIndex: idx === currentPage ? 10 : 0
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                ))}

                {/* Simple Dot Indicator */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-1 h-1 rounded-full transition-all duration-500 ${
                                currentPage === idx ? 'bg-white scale-150' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
