import React, { useState, useRef, useEffect } from 'react';
import { Share2, ChevronDown, Activity, Shield, Clock, FileText, Database, Scan, CheckCircle, Stethoscope, Moon } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    id: "DOC-2024-8888",
    dept: "心血管外科",
    role: "主治医师",
    year: 2024,
    keyword: "心流",
    keywordDesc: "在每一次体外循环的静默中，寻找生命的律动。",
    stats: {
        patients: "2,856",    // 真实门诊量
        surgeries: "328",     // 真实手术量
        consultations: "156", // 院内会诊
        nightShifts: "42",    // 夜班次数 (20-60区间)
        hours: "2,460",       // 工作时长
        words: "168",         // 病历字数（万）
        families: "3,200",    // 服务家庭
        successRate: "99.8%"
    },
    // 模拟真实月度手术/操作量波动 (40-80区间)
    monthlyData: [45, 52, 58, 61, 55, 67, 72, 65, 58, 63, 75, 68],
    records: [
        { time: "03:42", date: "2024.11.14", event: "急性A型主动脉夹层抢救", type: "急诊" },
        { time: "14:00", date: "2024.07.20", event: "单日完成 4 台瓣膜置换术", type: "峰值" },
        { time: "09:30", date: "2024.09.10", event: "收到康复患者手写感谢信", type: "荣誉" }
    ],
    achievements: [
        { label: "SCI 论文", val: "3 篇", sub: "IF 总计 12.5" },
        { label: "TAVI 手术", val: "56 例", sub: "独立主刀" },
        { label: "年度绩效", val: "Top 5%", sub: "全院排名前列" }
    ]
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 医疗监护背景
const MonitorBackground = () => (
    <div className="absolute inset-0 bg-[#0b1121] overflow-hidden pointer-events-none">
        {/* 心电网格 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* 扫描线 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-scan" />
        
        {/* 边缘暗角 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b1121_90%)]" />
    </div>
);

// 系统面板容器
const SystemPanel = ({ children, title, className = "" }) => (
    <div className={`relative bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden ${className}`}>
        {/* 顶部状态栏 */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-cyan-950/30">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">{title}</span>
            </div>
            <div className="flex gap-1">
                <div className="w-8 h-1 bg-cyan-500/20" />
                <div className="w-2 h-1 bg-cyan-500/20" />
            </div>
        </div>
        <div className="p-6 relative">
            {/* 四角装饰 */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500" />
            {children}
        </div>
    </div>
);

// 1. 登录：身份验证
const LoginPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 w-full max-w-xs transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto bg-cyan-950/30 rounded-full border-2 border-cyan-500/50 flex items-center justify-center relative mb-6 group">
                    <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin-slow" />
                    <Scan className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-cyan-500 font-mono text-sm tracking-[0.3em] mb-2">SYSTEM ACCESS</h2>
                <h1 className="text-3xl font-bold text-white mb-1">医师年度档案</h1>
                <p className="text-slate-400 text-xs font-mono">ID: {reportData.id}</p>
            </div>

            <div className="space-y-4">
                <div className="bg-cyan-950/30 border border-cyan-500/30 p-4 rounded flex items-center justify-between">
                    <span className="text-cyan-200 text-sm">身份验证通过</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="h-1 w-full bg-cyan-900/50 rounded overflow-hidden">
                    <div className={`h-full bg-cyan-500 transition-all duration-[2000ms] ease-out ${isActive ? 'w-full' : 'w-0'}`} />
                </div>
                <div className="flex justify-between text-[10px] text-cyan-500/60 font-mono">
                    <span>正在加载数据...</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-12 animate-bounce text-cyan-500/50">
            <ChevronDown />
        </div>
    </div>
);

// 2. 概览：核心指标
const OverviewPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-6 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-1">
                <Activity className="text-green-500" />
                临床核心指标
            </h2>
            <p className="text-slate-400 text-sm mb-8 pl-9">Annual Performance Overview</p>
        </div>

        <div className="grid grid-cols-2 gap-3 relative z-10">
            {[
                { label: "门诊接诊", val: reportData.stats.patients, unit: "人次", icon: Database, color: "text-cyan-400" },
                { label: "主刀手术", val: reportData.stats.surgeries, unit: "台", icon: Shield, color: "text-purple-400" },
                { label: "夜班值守", val: reportData.stats.nightShifts, unit: "次", icon: Moon, color: "text-amber-400" },
                { label: "院内会诊", val: reportData.stats.consultations, unit: "例", icon: Stethoscope, color: "text-emerald-400" }
            ].map((item, idx) => (
                <SystemPanel 
                    key={idx} 
                    title={item.label} 
                    className={`transition-all duration-700`}
                    style={{ 
                        transitionDelay: `${idx * 100 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(20px)'
                    }}
                >
                    <div className="flex flex-col h-full justify-between gap-2">
                        <div className="flex justify-between items-start">
                             <item.icon className={`w-6 h-6 ${item.color} opacity-80`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white font-mono tracking-tighter">{item.val}</div>
                            <div className="text-[10px] text-slate-400 font-mono uppercase">{item.unit}</div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                        <div className={`h-full ${item.color.replace('text', 'bg')} opacity-50 transition-all duration-1000 delay-1000`} style={{ width: isActive ? '85%' : '0%' }} />
                    </div>
                </SystemPanel>
            ))}
        </div>
    </div>
);

// 3. 趋势：心电图表
const ChartPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 30, right: 10, bottom: 20, left: 10, containLabel: true },
        xAxis: { 
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: { lineStyle: { color: '#1e293b' } },
            axisTick: { show: false },
            axisLabel: { color: '#64748b', fontFamily: 'monospace', fontSize: 10 }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
            axisLabel: { show: false }
        },
        series: [{
            type: 'line',
            data: reportData.monthlyData,
            smooth: 0.2,
            symbol: 'none',
            lineStyle: { width: 2, color: '#22c55e', shadowColor: '#22c55e', shadowBlur: 10 }, // 生命绿
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: 'rgba(34, 197, 94, 0.2)' }, { offset: 1, color: 'rgba(34, 197, 94, 0)' }]
                }
            },
            markLine: {
                symbol: 'none',
                label: { show: false },
                lineStyle: { color: '#ef4444', width: 1, type: 'solid' },
                data: [{ yAxis: 60 }] // 警戒线模拟
            }
        }]
    };

    return (
        <div className="h-full w-full flex flex-col justify-center p-6 relative">
            <MonitorBackground />

            <div className={`relative z-10 mb-6 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl font-bold text-white mb-1">工作负荷分析</h2>
                <div className="flex items-center gap-2 text-green-500 text-xs font-mono">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    实时监测中...
                </div>
            </div>

            <SystemPanel 
                title="心电监控_V1" 
                className={`relative z-10 h-[320px] w-full transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
                
                {/* 模拟心跳扫描动画 */}
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-scan-horizontal pointer-events-none" />
            </SystemPanel>

            <div className={`relative z-10 mt-6 grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-cyan-950/30 border border-cyan-500/20 p-3 rounded">
                    <div className="text-xs text-cyan-500/60 font-mono mb-1">峰值月份</div>
                    <div className="text-white font-bold">7 月</div>
                </div>
                <div className="bg-cyan-950/30 border border-cyan-500/20 p-3 rounded">
                    <div className="text-xs text-cyan-500/60 font-mono mb-1">手术成功率</div>
                    <div className="text-green-400 font-bold">{reportData.stats.successRate}</div>
                </div>
            </div>
        </div>
    );
};

// 4. 档案：重要记录
const RecordPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-6 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 mb-8 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white">关键事件记录</h2>
            <p className="text-slate-400 text-sm">Key Medical Records</p>
        </div>

        <div className="space-y-4 relative z-10">
            {reportData.records.map((item, idx) => (
                <div 
                    key={idx}
                    className={`flex gap-4 transition-all duration-700`}
                    style={{ 
                        transitionDelay: `${idx * 200 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(30px)'
                    }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full border border-cyan-200 shadow-[0_0_10px_#06b6d4]" />
                        {idx !== reportData.records.length - 1 && <div className="w-[1px] h-full bg-cyan-500/20 my-1" />}
                    </div>
                    <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-cyan-400 font-mono text-sm">{item.time}</span>
                            <span className="text-xs text-slate-500 bg-slate-800 px-1.5 rounded border border-slate-700">{item.type}</span>
                        </div>
                        <div className="text-white font-medium mb-1">{item.event}</div>
                        <div className="text-xs text-slate-500 font-mono">{item.date}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// 5. 荣誉：X光风格
const AchievementPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-6 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 mb-8 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white">职业成就档案</h2>
            <p className="text-slate-400 text-sm">Professional Milestones</p>
        </div>

        <div className="space-y-4 relative z-10">
            {reportData.achievements.map((item, idx) => (
                <SystemPanel 
                    key={idx} 
                    title={`FILE_0${idx+1}`} 
                    className={`transition-all duration-700`}
                    style={{ 
                        transitionDelay: `${idx * 200 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0.95)'
                    }}
                >
                    {/* 模拟 X 光片的反相效果 */}
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-lg font-bold text-white mb-1">{item.label}</div>
                            <div className="text-xs text-cyan-500/70 font-mono">{item.sub}</div>
                        </div>
                        <div className="text-2xl font-bold text-white font-mono bg-white/10 px-3 py-1 rounded border border-white/20">
                            {item.val}
                        </div>
                    </div>
                </SystemPanel>
            ))}
        </div>
    </div>
);

// 6. 寄语：致敬医者
const MessagePage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 max-w-md w-full transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-8 text-center">
                <Activity className="w-12 h-12 text-cyan-500 mx-auto mb-4 animate-pulse" />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
            </div>

            <div className="space-y-6 font-mono text-sm leading-loose text-justify">
                <div className={`transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-cyan-400 text-lg font-bold">2025，</span>
                    <span className="text-slate-300">您用 </span>
                    <span className="text-white font-bold text-lg border-b border-cyan-500/50 mx-1">{reportData.stats.hours}</span>
                    <span className="text-slate-300">小时的坚守，</span>
                </div>

                <div className={`transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-slate-300">守护了 </span>
                    <span className="text-white font-bold text-lg border-b border-cyan-500/50 mx-1">{reportData.stats.families}</span>
                    <span className="text-slate-300">个生命的安康。</span>
                </div>

                <div className={`transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-slate-300">您写下的 </span>
                    <span className="text-white font-bold text-lg border-b border-cyan-500/50 mx-1">{reportData.stats.words}</span>
                    <span className="text-slate-300">万字病历，</span>
                    <br />
                    <span className="text-slate-300">是 </span>
                    <span className="text-white font-bold text-lg border-b border-cyan-500/50 mx-1">{reportData.stats.families}</span>
                    <span className="text-slate-300">个家庭不能忘却的记忆。</span>
                </div>

                <div className={`py-4 transition-all duration-1000 delay-[1500ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4" />
                    <p className="text-slate-400 text-center italic">"感谢您的每一分付出"</p>
                </div>

                <div className={`space-y-2 text-center transition-all duration-1000 delay-[2000ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-slate-300">愿新的一年，</p>
                    <p className="text-slate-300">您救治的每一位患者都奔向健康，</p>
                    <p className="text-slate-300">您付出的每一刻时光都收获回响。</p>
                </div>
            </div>

            <div className={`mt-12 text-center transition-all duration-1000 delay-[2500ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="inline-block border border-cyan-500/30 bg-cyan-950/30 px-6 py-2 rounded-full relative overflow-hidden">
                    <span className="text-cyan-400 font-bold tracking-widest relative z-10">医路漫漫，感恩有您！</span>
                    <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

// 7. 身份卡：电子工牌
const IDCardPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative">
        <MonitorBackground />
        
        <div className={`relative z-10 w-full transition-all duration-1000 ${isActive ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-y-90 scale-90'}`} style={{ perspective: '1000px' }}>
            {/* 电子工牌 */}
            <div className="bg-[#e2e8f0] rounded-xl overflow-hidden shadow-2xl relative">
                {/* 挂绳孔 */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#cbd5e1] rounded-full shadow-inner border border-[#94a3b8]" />
                
                {/* 头部信息 */}
                <div className="bg-[#0f172a] p-6 pt-12 text-center relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                     <div className="w-24 h-24 mx-auto bg-white rounded-lg p-1 mb-4 shadow-lg">
                         <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center text-4xl font-bold text-slate-400">
                             {reportData.name[0]}
                         </div>
                     </div>
                     <h2 className="text-2xl font-bold text-white mb-1">{reportData.name}</h2>
                     <p className="text-cyan-400 text-sm font-mono uppercase">{reportData.dept}</p>
                </div>

                {/* 详细信息 */}
                <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="text-[10px] text-slate-400 uppercase font-bold">职位</div>
                            <div className="text-slate-800 font-bold text-sm">{reportData.role}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-400 uppercase font-bold">工号 ID</div>
                            <div className="text-slate-800 font-bold text-sm font-mono">{reportData.id}</div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded border border-slate-200 mb-6">
                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">年度关键词</div>
                        <div className="text-xl font-bold text-slate-900 mb-1">{reportData.keyword}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{reportData.keywordDesc}</div>
                    </div>

                    <div className="flex items-end justify-between gap-2">
                         <div className="w-16 h-8 bg-slate-800" /> {/* 模拟条形码 */}
                         <div className="flex gap-2">
                             <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("链接已复制");
                                }}
                                className="bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded hover:bg-slate-600 transition-colors flex items-center gap-1"
                             >
                                <Share2 className="w-3 h-3" />
                                复制链接
                             </button>
                             <button 
                                onClick={() => alert("海报生成功能开发中...")}
                                className="bg-cyan-600 text-white text-xs font-bold px-3 py-2 rounded hover:bg-cyan-500 transition-colors flex items-center gap-1"
                             >
                                <Share2 className="w-3 h-3" />
                                保存工牌
                             </button>
                         </div>
                    </div>
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
    const pages = [LoginPage, OverviewPage, ChartPage, RecordPage, AchievementPage, MessagePage, IDCardPage];

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
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .animate-scan { animation: scan 3s linear infinite; }

                @keyframes scan-horizontal {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-scan-horizontal { animation: scan-horizontal 2s linear infinite; }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 4s linear infinite; }
            `}</style>

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#0b1121] border-x border-cyan-900/30">
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
                
                {/* System Status Bar */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-[#0f172a] border-t border-cyan-900/30 flex items-center justify-between px-4 text-[10px] font-mono text-cyan-500/50 z-50">
                    <div>系统状态: 在线</div>
                    <div className="flex gap-2">
                        <span>页码: {currentPage + 1}/{pages.length}</span>
                        <span>能量: 100%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
