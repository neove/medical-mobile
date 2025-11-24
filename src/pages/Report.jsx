import React, { useState, useRef, useEffect } from 'react';
import { Share2, Rocket, Moon, Zap, Heart, Star, ChevronDown, Map, Database, Microscope } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data & Story Scripts
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "星际领航员 (心外科)",
    year: 2024,
    keyword: "引力波",
    keywordDesc: "你的引力，拉住了无数想要逃逸的生命",
    monthlyData: [45, 52, 48, 61, 55, 67, 72, 65, 58, 63, 59, 48],
    story: {
        intro: {
            t1: "2024年，代号【守护者】飞船",
            t2: "在医疗星系",
            t3: "持续航行了 366 个地球日"
        },
        encounters: {
            count: 1850,
            t1: "雷达监测到",
            t2: "次生命信号的波动",
            t3: "每一次微弱的闪烁",
            t4: "都因你的到来而重新点亮"
        },
        night: {
            time: "03:42",
            date: "11月14日",
            t1: "飞船日志记录下最安静的一刻",
            t2: "那一刻，银河沉睡",
            t3: "只有监护仪的滴答声",
            t4: "在回应宇宙的脉搏"
        },
        battle: {
            count: 320,
            hours: 2400,
            t1: "这一年，你经历了",
            t2: "场惊心动魄的太空修补",
            t3: "2400 小时的全神贯注",
            t4: "将偏离轨道的生命",
            t5: "重新拉回安全航线"
        }
    },
    specimens: [
        { type: '科研', name: 'SCI 星云', desc: '影响因子 5.2', icon: Microscope },
        { type: '荣誉', name: '金质勋章', desc: '年度优秀医师', icon: Star },
        { type: '感谢', name: '来自地球的信', desc: '患者感谢信 x5', icon: Heart }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 粒子星空背景
const StarBackground = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#050510]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-pulse" />
        {/* 流星效果 */}
        <div className="absolute top-0 left-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 animate-meteor" style={{ animationDelay: '2s', left: '20%' }} />
        <div className="absolute top-0 left-1/2 w-1 h-60 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 animate-meteor" style={{ animationDelay: '5s', left: '80%' }} />
    </div>
);

// HUD 边框装饰
const HUDBorder = ({ children }) => (
    <div className="relative w-full h-full p-6">
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-900/20 border border-cyan-500/30 rounded-full text-[10px] text-cyan-400 tracking-[0.2em]">
            SYSTEM NORMAL
        </div>
        {children}
    </div>
);

// 1. 封面：启航
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden text-center">
        <StarBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
        
        <div className={`relative z-10 transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
            <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-cyan-500/30 flex items-center justify-center animate-spin-slow">
                <div className="w-20 h-20 rounded-full border border-cyan-400/50 flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-cyan-400" />
                </div>
            </div>
            
            <h2 className="text-cyan-400 text-sm tracking-[0.5em] mb-4 font-mono">MISSION REPORT</h2>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-400 mb-6 font-sans">
                2024
            </h1>
            <p className="text-blue-200/80 text-lg font-light tracking-widest">
                星际航行日志
            </p>
        </div>

        <div className="absolute bottom-12 animate-bounce text-cyan-500/50">
            <ChevronDown />
        </div>
    </div>
);

// 2. 探索：生命信号
const ExplorePage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col justify-center">
        <StarBackground />
        <HUDBorder>
            <div className="h-full flex flex-col justify-center relative z-10">
                <div className={`space-y-6 text-left transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <p className="text-cyan-100/70 text-lg font-light">{reportData.story.encounters.t1}</p>
                    
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] font-mono">
                            {reportData.story.encounters.count}
                        </span>
                        <span className="text-xl text-cyan-400">{reportData.story.encounters.t2}</span>
                    </div>
                    
                    <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent my-4" />
                    
                    <div className="space-y-2">
                        <p className="text-blue-100 text-xl leading-relaxed">{reportData.story.encounters.t3}</p>
                        <p className="text-white text-xl font-bold leading-relaxed">{reportData.story.encounters.t4}</p>
                    </div>
                </div>

                {/* 雷达扫描动画 */}
                <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center opacity-30">
                    <div className="w-full h-full rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent to-cyan-500 origin-bottom animate-radar-spin" />
                </div>
            </div>
        </HUDBorder>
    </div>
);

// 3. [新增] 星际航路：轨迹
const StarMapPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 40, right: 10, bottom: 20, left: 10, containLabel: true },
        xAxis: { 
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLine: { show: false },
            axisLabel: { color: 'rgba(6,182,212,0.7)', fontFamily: 'monospace' },
            axisTick: { show: false }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { color: 'rgba(6,182,212,0.1)', type: 'dashed' } },
            axisLabel: { show: false }
        },
        series: [{
            data: reportData.monthlyData,
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { width: 3, color: '#22d3ee', shadowColor: '#22d3ee', shadowBlur: 10 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(34, 211, 238, 0.3)' }, { offset: 1, color: 'rgba(34, 211, 238, 0)' }]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-center">
            <StarBackground />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [perspective:500px]" />

            <HUDBorder>
                <div className="h-full flex flex-col justify-center relative z-10">
                    <div className={`flex items-center gap-3 mb-2 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <Map className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-cyan-200 font-mono tracking-widest">FLIGHT PATH</span>
                    </div>
                    <h2 className={`text-2xl text-white font-bold mb-8 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>穿越 12 个星云</h2>

                    <div className={`h-[300px] w-full border border-cyan-500/20 bg-cyan-900/10 rounded-lg p-2 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                         <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>
            </HUDBorder>
        </div>
    );
};

// 4. 深空：静默守望
const NightPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[#020205]" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-900/20 rounded-full blur-[60px]" />
        
        <HUDBorder>
            <div className="h-full flex flex-col justify-center relative z-10 text-center">
                <div className={`mb-8 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    <Moon className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                    <div className="text-4xl font-mono text-blue-100 font-bold tracking-widest">
                        {reportData.story.night.time}
                    </div>
                    <div className="text-sm text-blue-400/60 mt-1">{reportData.story.night.date} · 深空坐标</div>
                </div>

                <div className={`space-y-4 transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-blue-200/80 text-lg">{reportData.story.night.t1}</p>
                    <p className="text-white text-xl font-medium">"{reportData.story.night.t3}"</p>
                    <p className="text-blue-200/80 text-lg">{reportData.story.night.t4}</p>
                </div>

                {/* 心跳线 */}
                <div className="absolute bottom-20 left-0 w-full h-12 flex items-center opacity-50">
                    <div className="w-full h-[1px] bg-blue-900/50" />
                    <svg className="absolute left-0 w-full h-full" preserveAspectRatio="none">
                        <polyline points="0,25 50,25 60,10 70,40 80,25 300,25" fill="none" stroke="#60a5fa" strokeWidth="2" className="animate-ecg" />
                    </svg>
                </div>
            </div>
        </HUDBorder>
    </div>
);

// 5. 修复：引力弹弓
const BattlePage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col justify-center">
        <StarBackground />
        {/* 能量场效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-cyan-900/20" />
        
        <HUDBorder>
            <div className="h-full flex flex-col justify-center relative z-10">
                <div className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                    <span className="text-yellow-100 font-mono tracking-wider">ENERGY LEVEL: MAX</span>
                </div>

                <h2 className={`text-5xl font-bold text-white mb-8 font-mono transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    {reportData.story.battle.count} <span className="text-2xl font-normal text-cyan-300">次修复</span>
                </h2>

                <div className={`space-y-6 text-lg transition-all duration-1000 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-cyan-100/80">{reportData.story.battle.t3}</p>
                    <div className="pl-4 border-l-2 border-yellow-400/50">
                        <p className="text-white font-bold text-xl mb-2">{reportData.story.battle.t4}</p>
                        <p className="text-white font-bold text-xl">{reportData.story.battle.t5}</p>
                    </div>
                </div>
            </div>
        </HUDBorder>
    </div>
);

// 6. [新增] 文明样本：成就
const SpecimenPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col justify-center">
        <StarBackground />
        <HUDBorder>
            <div className="h-full flex flex-col justify-center relative z-10">
                <div className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <Database className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-200 font-mono tracking-widest">SPECIMEN COLLECTION</span>
                </div>

                <div className="space-y-6">
                    {reportData.specimens.map((item, idx) => (
                        <div 
                            key={idx}
                            className={`relative group bg-cyan-900/20 border border-cyan-500/30 p-4 rounded-lg flex items-center gap-4 transition-all duration-700 hover:bg-cyan-900/30`}
                            style={{ 
                                transitionDelay: `${idx * 200 + 300}ms`,
                                transform: isActive ? 'translateX(0)' : 'translateX(50px)',
                                opacity: isActive ? 1 : 0
                            }}
                        >
                            <div className="w-12 h-12 bg-cyan-500/10 rounded border border-cyan-500/50 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow">
                                <item.icon className="w-6 h-6 text-cyan-300" />
                            </div>
                            <div>
                                <div className="text-xs text-cyan-500/70 font-mono mb-1">{item.type}</div>
                                <div className="text-white font-bold">{item.name}</div>
                                <div className="text-xs text-blue-200/60">{item.desc}</div>
                            </div>
                            <div className="absolute right-2 top-2 w-2 h-2 bg-cyan-500 rounded-full opacity-50 animate-pulse" />
                        </div>
                    ))}
                </div>
                
                <div className={`mt-8 text-center text-sm text-cyan-400/60 font-mono transition-all duration-1000 delay-[1000ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    [ ARCHIVE COMPLETE ]
                </div>
            </div>
        </HUDBorder>
    </div>
);

// 7. 终章：船票
const TicketPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center p-6">
        <StarBackground />
        
        <div className={`relative w-full max-w-xs transition-all duration-[1500ms] ${isActive ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-12 scale-90'}`}>
            {/* 船票卡片 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
                
                {/* 票据切口模拟 */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#050510] rounded-full" />
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#050510] rounded-full" />
                <div className="absolute top-1/2 left-2 right-2 h-[1px] border-t border-dashed border-white/20" />

                <div className="p-6 pb-8 text-center">
                    <p className="text-cyan-300 text-xs font-mono tracking-[0.3em] mb-4">BOARDING PASS</p>
                    <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                        <Star className="w-10 h-10 text-white fill-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-1">{reportData.keyword}</h2>
                    <p className="text-blue-200/60 text-xs px-4 leading-relaxed mb-2">{reportData.keywordDesc}</p>
                </div>

                <div className="p-6 pt-4 bg-black/20">
                    <div className="flex justify-between text-xs font-mono text-blue-200/50 mb-4">
                        <div>PASSENGER</div>
                        <div>{reportData.name}</div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-blue-200/50 mb-6">
                        <div>CLASS</div>
                        <div>{reportData.role}</div>
                    </div>
                    <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-sm tracking-widest transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" />
                        生成船票
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function Report() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, ExplorePage, StarMapPage, NightPage, BattlePage, SpecimenPage, TicketPage];

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
            className="fixed inset-0 bg-[#050510] overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <style>{`
                @keyframes meteor {
                    0% { transform: translateY(-100%) rotate(45deg); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(1000%) rotate(45deg); opacity: 0; }
                }
                .animate-meteor { animation: meteor 3s linear infinite; }
                
                @keyframes radar-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-radar-spin { animation: radar-spin 4s linear infinite; }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }

                @keyframes ecg {
                    0% { stroke-dashoffset: 1000; }
                    100% { stroke-dashoffset: 0; }
                }
                .animate-ecg {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: ecg 3s linear infinite;
                }
            `}</style>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#050510]">
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
                
                {/* Pagination Indicators */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                                currentPage === idx ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
