import React, { useState, useRef } from 'react';
import { Share2, ChevronDown, Award, Clock, Activity, User, TrendingUp, Star, BarChart2, Filter } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "主治医师",
    dept: "心血管外科",
    hospital: "第一中心医院",
    year: 2024,
    keyword: "臻·心",
    keywordDesc: "以至臻之术，护方寸之心",
    stats: {
        patients: 1850,
        surgeries: 320,
        hours: 2400,
        rating: "4.99"
    },
    monthlyData: [45, 52, 48, 61, 55, 67, 72, 65, 58, 63, 59, 48],
    abilities: [
        { name: '临床决策', max: 100, value: 96 },
        { name: '手术技能', max: 100, value: 92 },
        { name: '科研学术', max: 100, value: 88 },
        { name: '团队管理', max: 100, value: 85 },
        { name: '医患沟通', max: 100, value: 95 },
        { name: '危机处理', max: 100, value: 90 }
    ],
    timeStats: [
        { value: 100, name: '总在岗时长' },
        { value: 80, name: '临床工作' },
        { value: 60, name: '核心手术' },
        { value: 20, name: '高难度攻坚' }
    ],
    achievements: [
        { title: "SCI 核心期刊发表", sub: "Impact Factor 5.2" },
        { title: "年度 TAVI 手术", sub: "独立主刀突破 50 台" },
        { title: "零医疗纠纷", sub: "患者满意度全院 Top 10" }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 1. 封面：黑金质感
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#0b1121] flex flex-col justify-center p-10 relative overflow-hidden text-white">
        {/* 背景光效 */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[80px]" />
        
        <div className={`relative z-10 border-l-2 border-amber-500/50 pl-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-amber-500 text-sm font-serif tracking-[0.3em] uppercase mb-6">Annual Medical Report</h2>
            <h1 className="text-6xl font-serif font-bold leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
                年度<br/>述职报告
            </h1>
            <div className="text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-700 opacity-80">
                2024
            </div>
        </div>

        <div className={`mt-16 flex items-center gap-4 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-16 h-16 rounded-full border border-white/10 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-serif text-xl">
                    {reportData.name[0]}
                </div>
            </div>
            <div>
                <p className="text-xl font-medium text-white">{reportData.name}</p>
                <p className="text-slate-400 text-sm">{reportData.hospital} · {reportData.dept}</p>
            </div>
        </div>
    </div>
);

// 2. 概览：数据矩阵
const StatsPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#0f172a] flex flex-col justify-center p-8 relative overflow-hidden">
        <div className={`mb-10 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-serif text-white mb-2">核心绩效</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
            {[
                { label: "年度接诊量", val: reportData.stats.patients, unit: "人次", icon: User },
                { label: "主刀手术", val: reportData.stats.surgeries, unit: "台", icon: Activity },
                { label: "专注时长", val: reportData.stats.hours, unit: "小时", icon: Clock },
            ].map((item, idx) => (
                <div 
                    key={idx}
                    className={`relative bg-white/5 border border-white/5 p-6 transition-all duration-700 hover:bg-white/10 group`}
                    style={{ 
                        transitionDelay: `${idx * 200 + 300}ms`,
                        transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                        opacity: isActive ? 1 : 0
                    }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-sm">{item.label}</span>
                        <item.icon className="w-5 h-5 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white font-sans tracking-tight">{item.val}</span>
                        <span className="text-xs text-slate-500">{item.unit}</span>
                    </div>
                    {/* 底部金线 */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-700 group-hover:w-full" />
                </div>
            ))}
        </div>
    </div>
);

// 3. [新增] 能力矩阵：金色雷达
const AbilityPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: reportData.abilities.map(a => ({ name: a.name, max: a.max })),
            shape: 'polygon',
            radius: '65%',
            name: {
                textStyle: {
                    color: '#94a3b8',
                    fontSize: 12,
                    fontFamily: 'sans-serif'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)'],
                    type: 'dashed'
                }
            },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
        },
        series: [{
            type: 'radar',
            data: [{ value: reportData.abilities.map(a => a.value) }],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: '#f59e0b' },
            lineStyle: { width: 2, color: '#f59e0b' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(245, 158, 11, 0.5)' },
                        { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }
                    ]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full bg-[#0b1121] flex flex-col justify-center p-8">
            <div className={`mb-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-500/10 rounded">
                        <BarChart2 className="w-6 h-6 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-serif text-white">专业能力矩阵</h2>
                </div>
                <p className="text-slate-400 text-sm pl-1">Professional Competency</p>
            </div>

            <div className={`h-[360px] w-full bg-[#0f172a]/50 border border-white/5 rounded-lg relative transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="absolute top-4 right-4 flex flex-col gap-1 text-right">
                    <span className="text-amber-500 font-bold text-2xl">96</span>
                    <span className="text-slate-500 text-[10px] uppercase">Highest Score</span>
                </div>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </div>
    );
};

// 4. 趋势：深邃图表
const ChartPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 30, right: 10, bottom: 20, left: 10, containLabel: true },
        xAxis: { 
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#64748b', fontSize: 10 }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { color: '#334155', type: 'dashed', width: 0.5 } },
            axisLabel: { show: false }
        },
        series: [{
            data: reportData.monthlyData,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: { color: '#f59e0b', borderColor: '#fff', borderWidth: 2 },
            lineStyle: { width: 3, color: '#f59e0b' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(245, 158, 11, 0.3)' }, { offset: 1, color: 'rgba(245, 158, 11, 0)' }]
                }
            }
        }]
    };

    return (
        <div className="h-full w-full bg-[#0f172a] flex flex-col justify-center p-8">
            <div className={`mb-8 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-500/10 rounded">
                        <TrendingUp className="w-6 h-6 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-serif text-white">工作效能趋势</h2>
                </div>
                <p className="text-slate-400 text-sm pl-1">Monthly Performance Trend</p>
            </div>

            <div className={`h-[320px] w-full bg-[#1e293b]/50 border border-white/5 p-4 rounded-lg transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </div>
            
            <div className={`mt-6 flex gap-4 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex-1 bg-amber-500/10 p-4 rounded border-l-2 border-amber-500">
                    <div className="text-amber-500 text-xs mb-1">最高峰值</div>
                    <div className="text-white font-bold text-xl">7月 / 72台</div>
                </div>
                <div className="flex-1 bg-blue-500/10 p-4 rounded border-l-2 border-blue-500">
                    <div className="text-blue-500 text-xs mb-1">平均效能</div>
                    <div className="text-white font-bold text-xl">58.2</div>
                </div>
            </div>
        </div>
    );
};

// 5. [新增] 时间管理：漏斗
const TimePage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        series: [
            {
                name: 'Time Management',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    color: '#fff'
                },
                itemStyle: {
                    borderColor: '#0b1121',
                    borderWidth: 1
                },
                emphasis: { label: { fontSize: 20 } },
                data: reportData.timeStats.map((item, idx) => ({
                    value: item.value,
                    name: item.name,
                    itemStyle: {
                        color: `rgba(245, 158, 11, ${0.3 + idx * 0.2})` // Amber gradients
                    }
                }))
            }
        ]
    };

    return (
        <div className="h-full w-full bg-[#0b1121] flex flex-col justify-center p-8">
            <div className={`mb-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-500/10 rounded">
                        <Filter className="w-6 h-6 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-serif text-white">时间精力分配</h2>
                </div>
                <p className="text-slate-400 text-sm pl-1">Time Management Analysis</p>
            </div>

            <div className={`h-[360px] w-full bg-[#0f172a]/50 border border-white/5 rounded-lg relative transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                 <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                 
                 <div className="absolute bottom-4 right-4 text-right">
                    <p className="text-slate-400 text-xs">核心产出占比</p>
                    <p className="text-amber-500 font-bold text-2xl">20% <span className="text-sm text-slate-500">TOP</span></p>
                 </div>
            </div>
        </div>
    );
};

// 6. 荣誉：金榜题名
const AwardPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#0b1121] flex flex-col justify-center p-8 relative">
        {/* 背景纹理 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        <div className={`mb-12 text-center transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-white">年度高光时刻</h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </div>

        <div className="space-y-4 relative z-10">
            {reportData.achievements.map((item, idx) => (
                <div 
                    key={idx} 
                    className={`bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 border-l-4 border-amber-500 shadow-lg transition-all duration-700`}
                    style={{ 
                        transitionDelay: `${idx * 200 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(50px)'
                    }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="text-slate-400 text-sm">{item.sub}</p>
                </div>
            ))}
        </div>
    </div>
);

// 7. 关键词：身份象征
const KeywordPage = ({ isActive }) => (
    <div className="h-full w-full bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className={`relative z-10 transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {/* 类似黑金信用卡的卡片设计 */}
            <div className="w-full bg-gradient-to-br from-[#1e293b] to-[#020617] p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* 光效 */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
                
                <div className="flex justify-between items-start mb-12">
                    <Activity className="text-amber-500 w-8 h-8" />
                    <div className="text-slate-500 font-mono text-xs tracking-widest">NO.20248888</div>
                </div>

                <div className="text-left mb-8">
                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-2">Annual Keyword</div>
                    <h2 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-4">
                        {reportData.keyword}
                    </h2>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                        {reportData.keywordDesc}
                    </p>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="text-left">
                        <div className="text-slate-500 text-[10px] uppercase">Doctor</div>
                        <div className="text-white font-serif">{reportData.name}</div>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 transition-colors">
                        <Share2 className="w-3 h-3" />
                        生成名片
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV2() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, StatsPage, AbilityPage, ChartPage, TimePage, AwardPage, KeywordPage];

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
            className="fixed inset-0 bg-[#0b1121] overflow-hidden font-sans select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Elegant Pagination */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                {pages.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-[2px] h-4 transition-all duration-500 ${
                            currentPage === idx ? 'bg-amber-500 h-8' : 'bg-slate-700'
                        }`}
                    />
                ))}
            </div>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#0b1121]">
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
            </div>
        </div>
    );
}
