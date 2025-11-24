import React, { useState, useRef } from 'react';
import { Share2, ChevronDown, Activity, Clock, Users, Zap, TrendingUp, Layers, Star, Sparkles } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "主治医师",
    dept: "心血管外科",
    year: 2024,
    keyword: "破界",
    keywordDesc: "突破舒适圈，在微毫之间寻找生命的答案。",
    stats: {
        patients: "2,856",
        surgeries: "328",
        nightShifts: "42",
        consultations: "156",
        hours: "2,460",
        words: "168",
        families: "3,200",
        efficiency: "+15%"
    },
    monthlyData: [45, 52, 58, 61, 55, 67, 72, 65, 58, 63, 75, 68],
    tags: ["微创手术", "科研突破", "患者信赖", "效率提升"]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 动态噪点背景
const NoiseOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
);

// 磨砂玻璃卡片
const GlassCard = ({ children, className = "" }) => (
    <div className={`backdrop-blur-xl bg-white/40 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-2xl ${className}`}>
        {children}
    </div>
);

// 1. 封面：深邃极光
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* 动态渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 animate-gradient-slow" />
        <div className={`absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[120px] mix-blend-multiply animate-blob ${isActive ? 'scale-110' : 'scale-100'}`} />
        <div className={`absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000 ${isActive ? 'scale-110' : 'scale-100'}`} />
        <NoiseOverlay />
        
        <div className={`relative z-10 text-center transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-md rounded-full text-indigo-600 text-xs font-bold shadow-sm mb-8 tracking-wider uppercase border border-white/50">
                <Sparkles className="w-3 h-3" />
                Annual Insights 2024
            </div>
            
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 tracking-tighter drop-shadow-sm">
                年度<br/>数据洞察
            </h1>
            
            <p className="text-slate-600 text-lg font-medium mb-12">
                探索 {reportData.name} 医生的 2024
            </p>

            <GlassCard className="w-24 h-24 mx-auto flex items-center justify-center text-indigo-600 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Activity className="w-10 h-10" />
            </GlassCard>
        </div>

        <div className="absolute bottom-10 animate-bounce text-slate-400">
            <ChevronDown />
        </div>
    </div>
);

// 2. 影响力：清新蓝绿
const ImpactPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 via-teal-50 to-cyan-50" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-[100px] animate-pulse" />
        <NoiseOverlay />

        <div className={`relative z-10 mb-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl font-bold text-slate-800">核心影响力</h2>
            <p className="text-slate-500 text-sm mt-1">Core Impact Analysis</p>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
            <GlassCard className={`p-5 transition-all duration-700 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-3">
                    <Users className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{reportData.stats.patients}</div>
                <div className="text-xs text-slate-500">守护生命 (人次)</div>
            </GlassCard>

            <GlassCard className={`p-5 transition-all duration-700 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-3">
                    <Zap className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{reportData.stats.surgeries}</div>
                <div className="text-xs text-slate-500">关键手术 (台)</div>
            </GlassCard>

            <GlassCard className={`col-span-2 p-6 flex items-center justify-between transition-all duration-700 delay-400 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div>
                    <div className="text-sm text-slate-500 mb-1">高强度专注</div>
                    <div className="text-3xl font-bold text-slate-800">{reportData.stats.hours} <span className="text-sm font-normal text-slate-400">h</span></div>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-teal-100 border-t-teal-500 flex items-center justify-center rotate-45 shadow-lg">
                    <Clock className="w-5 h-5 text-teal-600 -rotate-45" />
                </div>
            </GlassCard>
        </div>
    </div>
);

// 3. 趋势：科技蓝紫
const TrendPage = ({ isActive }) => {
    const option = {
        grid: { top: 20, right: 0, bottom: 20, left: 0 },
        xAxis: { show: false, data: ['1','2','3','4','5','6','7','8','9','10','11','12'] },
        yAxis: { show: false },
        series: [{
            type: 'line',
            data: reportData.monthlyData,
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 4, color: '#6366f1' }, // Indigo
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(99, 102, 241, 0.4)' }, { offset: 1, color: 'rgba(99, 102, 241, 0)' }]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full flex flex-col justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
            <NoiseOverlay />

            <div className={`relative z-10 mb-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-slate-800">职业节奏</h2>
                    <div className="px-3 py-1 bg-indigo-100/50 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full border border-indigo-200">
                        效率 {reportData.stats.efficiency}
                    </div>
                </div>
                <p className="text-slate-500 text-sm">Work Rhythm</p>
            </div>

            <GlassCard className={`relative z-10 h-[280px] w-full p-2 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </GlassCard>

            <div className={`relative z-10 grid grid-cols-2 gap-4 mt-8 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <GlassCard className="p-4">
                    <div className="text-slate-400 text-xs mb-1">最忙碌月份</div>
                    <div className="text-indigo-600 font-bold text-lg">7 月</div>
                </GlassCard>
                <GlassCard className="p-4">
                    <div className="text-slate-400 text-xs mb-1">手术高峰</div>
                    <div className="text-indigo-600 font-bold text-lg">周三 / 周五</div>
                </GlassCard>
            </div>
        </div>
    );
};

// 4. 标签：活力暖阳
const TagPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-200 to-rose-200 rounded-full blur-[100px] opacity-40 animate-pulse" />
        <NoiseOverlay />

        <div className={`relative z-10 mb-12 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-slate-800">年度印记</h2>
            <p className="text-slate-500 text-sm mt-1">Annual Impressions</p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10">
            {reportData.tags.map((tag, idx) => (
                <GlassCard 
                    key={idx}
                    className={`px-6 py-3 !rounded-full text-slate-700 font-medium border-white/60 transition-all duration-700 hover:scale-105`}
                    style={{ 
                        transitionDelay: `${idx * 100 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0)',
                    }}
                >
                    #{tag}
                </GlassCard>
            ))}
            <div className={`px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full font-bold shadow-lg shadow-rose-200 transition-all duration-700 delay-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                #2024年度医生
            </div>
        </div>

        <Layers className="absolute bottom-20 right-10 w-32 h-32 text-rose-200/50 rotate-12" />
    </div>
);

// 5. 致敬医者：柔光叙事
const MessagePage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center items-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900" />
        <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <NoiseOverlay />

        <div className={`relative z-10 text-center text-white space-y-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">2025 dedication</p>
            <p className="text-2xl font-light">
                您用 <span className="text-4xl font-bold border-b border-white/40 pb-1 px-1">{reportData.stats.hours}</span> 小时的坚守
            </p>
            <p className="text-2xl font-light">
                守护了 <span className="text-4xl font-bold border-b border-white/40 pb-1 px-1">{reportData.stats.families}</span> 个生命的安康
            </p>
            <p className="text-lg font-light text-white/80 leading-relaxed">
                您写下的 <span className="text-3xl font-semibold text-white">{reportData.stats.words}</span> 万字病历，是这些家庭不能忘却的记忆。
            </p>
            <p className="text-base text-white/70">
                感谢您的每一分付出，愿新的一年，您救治的每一位患者都奔向健康，您付出的每一刻时光都收获回响。
            </p>
            <div className="pt-6">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-md text-sm tracking-[0.3em] font-semibold">
                    医路漫漫 · 感恩有您
                </div>
            </div>
        </div>
    </div>
);

// 6. 尾页：神秘星空
const KeywordPage = ({ isActive }) => (
    <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900 opacity-90" />
        <div className={`absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[100px] ${isActive ? 'animate-pulse' : ''}`} />
        
        <div className={`relative z-10 w-full transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <GlassCard className="w-full aspect-[4/5] !bg-white/10 !border-white/10 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                
                <div className="flex justify-between items-start relative z-10">
                    <div className="text-white/60 font-medium tracking-widest text-xs">2024 REPORT</div>
                    <Activity className="w-6 h-6 text-indigo-300" />
                </div>

                <div className="relative z-10">
                    <div className="text-indigo-300 text-sm mb-2">Annual Keyword</div>
                    <h1 className="text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                        {reportData.keyword}
                    </h1>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                        {reportData.keywordDesc}
                    </p>
                </div>

                <div className="flex items-center gap-3 border-t border-white/10 pt-6 relative z-10">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center font-bold text-indigo-300 border border-indigo-500/30">
                        {reportData.name[0]}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">{reportData.name}</div>
                        <div className="text-xs text-white/50">心血管外科 · 主治医师</div>
                    </div>
                </div>
            </GlassCard>

            <div className={`mt-8 w-full px-4 flex gap-4 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("链接已复制");
                    }}
                    className="flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-white/80 backdrop-blur-md text-slate-700 rounded-2xl font-bold shadow-sm border border-white/50 hover:bg-white transition-all active:scale-95"
                >
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                        <Share2 className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm">复制链接</span>
                </button>
                
                <button 
                    onClick={() => alert("海报生成功能开发中...")}
                    className="flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95"
                >
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">保存海报</span>
                </button>
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV3() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, ImpactPage, TrendPage, TagPage, MessagePage, KeywordPage];

    const handleScroll = (direction) => {
        if (isScrolling.current) return;
        const next = currentPage + direction;
        if (next >= 0 && next < pages.length) {
            isScrolling.current = true;
            setCurrentPage(next);
            setTimeout(() => isScrolling.current = false, 1000);
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
            className="fixed inset-0 bg-slate-50 overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                
                @keyframes gradient-slow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-slow { 
                    background-size: 200% 200%;
                    animation: gradient-slow 10s ease infinite;
                }
            `}</style>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-white">
                {pages.map((Page, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                        style={{
                            transform: idx === currentPage ? 'translateY(0)' : idx < currentPage ? 'translateY(-100%)' : 'translateY(100%)',
                            opacity: idx === currentPage ? 1 : 0,
                            zIndex: idx === currentPage ? 10 : 0
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                ))}
                
                {/* Glass Indicator */}
                <div className="absolute top-6 right-6 z-50 flex gap-1.5 p-1.5 bg-white/30 backdrop-blur-md rounded-full border border-white/20">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                currentPage === idx ? 'bg-slate-800 scale-125' : 'bg-slate-400/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
