import React, { useState, useEffect, useRef } from 'react';
import { Share2, X, ChevronDown, Sparkles, Activity, Zap, Award, TrendingUp, Users, Clock, Heart, ThumbsUp } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    year: 2024,
    keyword: "破局",
    stats: {
        patients: 1850,
        surgeries: 320,
        hours: 2400,
        rating: 99.8
    },
    monthlyData: [45, 52, 48, 61, 55, 67, 72, 65, 58, 63, 59, 48],
    highlights: [
        { title: "年度科研突破", desc: "SCI 论文引用率创新高" },
        { title: "微创手术先锋", desc: "科室首例 TAVI 手术主刀" },
        { title: "患者信赖之选", desc: "年度锦旗数量全院第一" }
    ],
    abilities: [
        { name: '临床技术', value: 95 },
        { name: '科研学术', value: 85 },
        { name: '团队协作', value: 90 },
        { name: '医患沟通', value: 98 },
        { name: '应急处置', value: 88 }
    ],
    feedbacks: [
        { text: "医术精湛，妙手回春", author: "患者 李大爷" },
        { text: "耐心细致，如沐春风", author: "家属 张女士" },
        { text: "不仅治病，更治愈人心", author: "患者 王先生" },
        { text: "永远值得信赖的专家", author: "同行 这里的医生" }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 磨砂玻璃卡片
const GlassCard = ({ children, className = "" }) => (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${className}`}>
        {children}
    </div>
);

// 极光背景
const AuroraBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0f172a]">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-aurora opacity-50 blur-[100px] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" 
             style={{ backgroundImage: 'conic-gradient(from 0deg at 50% 50%, #000000 0deg, #2e1065 60deg, #0f172a 120deg, #1e3a8a 180deg, #0f172a 240deg, #4c1d95 300deg, #000000 360deg)' }} 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
);

// 1. 封面：极光涌动
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-8">
        <AuroraBackground />
        
        <div className={`relative z-10 text-center transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'}`}>
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float">
                <Activity className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-xl text-blue-200 font-medium tracking-widest mb-2">ANNUAL REPORT</h2>
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200 mb-6 font-sans">
                2024
            </h1>
            
            <GlassCard className="px-8 py-4 inline-block">
                <p className="text-white/90 text-lg font-light">医疗数据洞察报告</p>
            </GlassCard>
            
            <div className="mt-12 flex items-center justify-center gap-3 text-white/50 text-sm">
                <div className="w-12 h-[1px] bg-white/20" />
                <p>{reportData.name} · {reportData.role}</p>
                <div className="w-12 h-[1px] bg-white/20" />
            </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-white/30">
            <ChevronDown />
        </div>
    </div>
);

// 2. 数据概览：3D 悬浮
const StatsPage = ({ isActive }) => {
    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col p-6 justify-center">
            <AuroraBackground />
            
            <div className={`relative z-10 mb-8 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <h2 className="text-3xl font-bold text-white mb-2">核心指标</h2>
                <p className="text-blue-200/60 text-sm">Key Performance Indicators</p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
                {[
                    { label: "接诊患者", val: reportData.stats.patients, icon: Users, color: "from-blue-400 to-cyan-300" },
                    { label: "手术台次", val: reportData.stats.surgeries, icon: Zap, color: "from-purple-400 to-pink-300" },
                    { label: "工作时长", val: reportData.stats.hours, icon: Clock, color: "from-amber-400 to-orange-300" },
                    { label: "好评率", val: reportData.stats.rating + "%", icon: Award, color: "from-emerald-400 to-green-300" }
                ].map((item, idx) => (
                    <GlassCard 
                        key={idx} 
                        className={`p-5 transition-all duration-700 hover:bg-white/10`}
                        style={{ 
                            transitionDelay: `${idx * 100 + 300}ms`,
                            transform: isActive ? 'translateY(0)' : 'translateY(50px)',
                            opacity: isActive ? 1 : 0
                        }}
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
                            <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1 font-sans">{item.val}</div>
                        <div className="text-xs text-blue-100/60">{item.label}</div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

// 3. [新增] 能力分布：水晶玫瑰
const AbilityPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        series: [
            {
                type: 'pie',
                radius: [20, 120],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: reportData.abilities.map((item, index) => ({
                    value: item.value,
                    name: item.name,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: `rgba(34, 211, 238, ${0.4 + index * 0.1})` }, // Cyan with varying opacity
                                { offset: 1, color: `rgba(59, 130, 246, ${0.2 + index * 0.1})` }  // Blue with varying opacity
                            ]
                        },
                        shadowBlur: 20,
                        shadowColor: 'rgba(34, 211, 238, 0.5)'
                    }
                })),
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12,
                    formatter: '{b}\n{c}'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            }
        ]
    };

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col p-6 justify-center">
            <AuroraBackground />
            
            <div className={`relative z-10 mb-4 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">能力透视</h2>
                </div>
                <p className="text-blue-200/60 text-sm ml-1">Professional Competencies</p>
            </div>

            <div className={`relative z-10 h-[360px] w-full transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </div>
    );
};

// 4. 趋势分析：发光图表
const ChartPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 30, right: 10, bottom: 20, left: 30 },
        xAxis: { 
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: { show: false },
            axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
            axisTick: { show: false }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
            axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }
        },
        series: [{
            data: reportData.monthlyData,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: false,
            lineStyle: { width: 4, color: new Date().getHours() > 12 ? '#60a5fa' : '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.5)', shadowBlur: 20 },
            itemStyle: { color: '#60a5fa', borderColor: '#fff', borderWidth: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.5)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col p-6 justify-center">
            <AuroraBackground />
            
            <div className={`relative z-10 mb-6 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">工作量趋势</h2>
                </div>
            </div>

            <GlassCard className={`relative z-10 p-4 h-[300px] transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </GlassCard>
        </div>
    );
};

// 5. [新增] 患者反馈：漂流气泡
const FeedbackPage = ({ isActive }) => {
    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col p-6 justify-center">
            <AuroraBackground />

            <div className={`relative z-10 mb-8 transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                        <Heart className="w-6 h-6 text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">温暖回响</h2>
                </div>
            </div>

            <div className="relative z-10 h-[400px] w-full">
                {reportData.feedbacks.map((item, idx) => (
                    <div 
                        key={idx}
                        className={`absolute transition-all duration-[2000ms] ease-in-out`}
                        style={{
                            top: `${10 + idx * 22}%`,
                            left: idx % 2 === 0 ? '5%' : '20%',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? `translateY(0) scale(1)` : `translateY(${50 + idx * 20}px) scale(0.8)`,
                            transitionDelay: `${idx * 300}ms`
                        }}
                    >
                        <GlassCard className={`p-4 max-w-[280px] rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg animate-float`} style={{ animationDelay: `${idx}s` }}>
                            <p className="text-white/90 text-sm mb-2 leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center justify-end gap-2 text-xs text-blue-200/60">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{item.author}</span>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 6. 高光时刻：流光卡片
const HighlightPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col p-6 justify-center">
        <AuroraBackground />

        <div className={`relative z-10 mb-12 text-center transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">HIGHLIGHTS</h2>
            <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto mt-4 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>

        <div className="relative z-10 space-y-6">
            {reportData.highlights.map((item, idx) => (
                <div 
                    key={idx}
                    className={`relative group transition-all duration-700`}
                    style={{ 
                        transitionDelay: `${idx * 200 + 300}ms`,
                        transform: isActive ? 'translateX(0)' : idx % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
                        opacity: isActive ? 1 : 0
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <GlassCard className="relative p-6 flex items-center gap-4 group-hover:border-white/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-cyan-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-blue-100/70">{item.desc}</p>
                        </div>
                    </GlassCard>
                </div>
            ))}
        </div>
    </div>
);

// 7. 分享页：极简海报
const SharePage = ({ isActive }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-6">
            <AuroraBackground />
            
            <div className={`relative z-10 w-full max-w-sm transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 rotate-6'}`}>
                <GlassCard className="p-8 overflow-hidden relative">
                    {/* 顶部光效 */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/30 blur-3xl rounded-full" />
                    
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-md border border-white/20">
                            <Activity className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{reportData.name}</h2>
                        <p className="text-blue-200/60 text-sm">2024 年度听诊报告</p>
                    </div>

                    <div className="py-8 border-y border-white/10 mb-8 text-center">
                        <p className="text-xs text-blue-200/60 uppercase tracking-widest mb-2">Annual Keyword</p>
                        <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            {reportData.keyword}
                        </h3>
                    </div>

                    <button 
                        onClick={() => setShowModal(true)}
                        className="w-full py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Share2 className="w-5 h-5" />
                        生成专属海报
                    </button>
                </GlassCard>
            </div>

             {/* Share Modal */}
             {showModal && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end justify-center" onClick={() => setShowModal(false)}>
                    <div className="bg-slate-900/90 border-t border-white/10 w-full p-8 rounded-t-3xl animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-lg">分享给好友</h3>
                            <div className="p-1 bg-white/10 rounded-full"><X className="w-5 h-5 text-white/60" /></div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {['微信', '朋友圈', 'QQ', '保存'].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Share2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xs text-white/60">{item}</span>
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
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV8() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, StatsPage, AbilityPage, ChartPage, FeedbackPage, HighlightPage, SharePage];

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
            className="fixed inset-0 bg-[#0f172a] overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <style>{`
                @keyframes aurora {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-aurora { animation: aurora 20s linear infinite; }
                .animate-float { animation: float 3s ease-in-out infinite; }
            `}</style>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#0f172a]">
                {pages.map((Page, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                        style={{
                            transform: `translateY(${(idx - currentPage) * 100}%)`,
                            opacity: Math.abs(idx - currentPage) <= 1 ? 1 : 0, // 性能优化
                            zIndex: pages.length - idx
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                ))}

                {/* Glass Pagination */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                currentPage === idx ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
