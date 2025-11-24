import React, { useState, useEffect, useRef } from 'react';
import { Share2, X, ChevronDown, Wind, Mountain, Cloud, Circle, Feather } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    year: "甲辰", // 2024
    keyword: "仁心",
    summary: "医者仁心，悬壶济世。于方寸手术台间，修补生命之缺憾；在日夜轮转里，守护心跳之律动。",
    stats: {
        patients: "二八五六", // 2856
        surgeries: "三百廿八", // 328
        hours: "二四六零", // 2460
        nightShifts: "四十二", // 42
        consultations: "一百五十六", // 156
        rating: "上上" // 99.8
    },
    monthlyData: [
        { month: '一月', value: 45 }, { month: '二月', value: 52 }, { month: '三月', value: 58 },
        { month: '四月', value: 61 }, { month: '五月', value: 55 }, { month: '六月', value: 67 },
        { month: '七月', value: 72 }, { month: '八月', value: 65 }, { month: '九月', value: 58 },
        { month: '十月', value: 63 }, { month: '十一月', value: 75 }, { month: '十二月', value: 68 }
    ],
    achievements: [
        { title: "著书立说", desc: "发表 SCI 论文三篇" },
        { title: "妙手回春", desc: "主刀 TAVI 手术五十六例" },
        { title: "杏林春暖", desc: "获患者锦旗二十八面" }
    ],
    comments: [
        { text: "医术精湛，如春风化雨。", author: "李氏" },
        { text: "再造之恩，没齿难忘。", author: "张氏" },
        { text: "仁心仁术，当代华佗。", author: "王氏" }
    ],
    studyHours: 520,
    readBooks: 12
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 竖排文字组件
const VerticalText = ({ text, className = "" }) => (
    <div className={`writing-vertical-rl text-justify tracking-widest leading-loose ${className}`} style={{ writingMode: 'vertical-rl' }}>
        {text}
    </div>
);

// 印章组件
const Seal = ({ text, className = "" }) => (
    <div className={`w-12 h-12 border-2 border-red-800 rounded-lg p-1 flex items-center justify-center ${className}`}>
        <div className="text-red-800 text-xs font-serif font-bold leading-none text-center border border-red-800 p-1 w-full h-full flex items-center justify-center bg-red-800/5">
            {text}
        </div>
    </div>
);

// 1. 封面：水墨山水
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#fcfaf2]">
        {/* 水墨背景 - 大气磅礴 */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1517842360893-2838930b1358?w=1080&q=80')] bg-cover bg-center grayscale opacity-20" />
        {/* 叠加一层宣纸纹理 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply" />
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-stone-200/50 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center h-full py-20">
            <div className={`transition-all duration-[2000ms] ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-stone-500 font-serif tracking-[0.5em] text-sm mb-8 border-b border-stone-300 pb-2">二零二四年度听诊录</p>
            </div>

            <div className="flex-1 flex items-center justify-center gap-12">
                <div className={`transition-all duration-[2000ms] delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-stone-900 writing-vertical-rl tracking-widest ml-4">
                        医路
                    </h1>
                </div>
                <div className={`transition-all duration-[2000ms] delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-stone-900 writing-vertical-rl tracking-widest text-stone-400">
                         漫漫
                    </h1>
                </div>
            </div>

            <div className={`mt-auto flex flex-col items-center transition-all duration-[2000ms] delay-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                 <Seal text="仁心" className="mb-6 animate-pulse" />
                 <div className="text-stone-800 font-serif text-lg tracking-widest">{reportData.name} · {reportData.role}</div>
            </div>
        </div>
    </div>
);

// 2. 序言：卷轴书写
const IntroPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex items-center justify-center p-8">
        {/* 背景 - 梅花点缀 */}
        <div className="absolute left-[-50px] top-[-50px] w-[300px] opacity-10 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1516205651411-a42796f471f5?w=800&q=80" className="w-full grayscale contrast-150" />
        </div>

        <div className="absolute left-10 top-20 opacity-10 text-[12rem] font-serif text-stone-300 writing-vertical-rl pointer-events-none select-none">
            初心
        </div>
        
        <div className={`relative z-10 max-w-md w-full border-y-2 border-stone-800 py-12 px-6 transition-all duration-[1500ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfaf2] px-4">
                 <Circle className="w-4 h-4 text-stone-800 fill-stone-800" />
             </div>
             
             <div className="flex gap-8 justify-center h-[300px]">
                 <VerticalText text={reportData.summary} className="text-xl text-stone-800 font-medium" />
                 <div className="w-[1px] h-full bg-stone-200 mx-4" />
                 <div className="flex flex-col justify-between py-4">
                     <VerticalText text="年度关键词" className="text-xs text-stone-400" />
                     <div className="text-4xl font-serif text-red-800 writing-vertical-rl font-bold">{reportData.keyword}</div>
                 </div>
             </div>

             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#fcfaf2] px-4">
                 <Circle className="w-4 h-4 text-stone-800 fill-stone-800" />
             </div>
        </div>
    </div>
);

// 3. 数据：水墨图表
const StatsPage = ({ isActive }) => {
    const option = {
        backgroundColor: 'transparent',
        grid: { top: 40, right: 20, bottom: 20, left: 40 },
        xAxis: { 
            type: 'category',
            data: reportData.monthlyData.map(d => d.month),
            axisLine: { lineStyle: { color: '#78716c' } },
            axisLabel: { fontFamily: 'serif', rotate: 45 }
        },
        yAxis: { 
            type: 'value',
            splitLine: { lineStyle: { type: 'dashed', color: '#e7e5e4' } }
        },
        series: [{
            data: reportData.monthlyData.map(d => d.value),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: { color: '#991b1b' },
            areaStyle: { color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{ offset: 0, color: 'rgba(153,27,27,0.2)' }, { offset: 1, color: 'rgba(153,27,27,0)' }]
            }}
        }]
    };

    return (
        <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] p-6 flex flex-col">
             {/* 背景 - 淡淡松柏 */}
            <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-10 pointer-events-none">
                 <img src="https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?w=800&q=80" className="w-full h-full object-cover grayscale mix-blend-multiply" />
            </div>

            <div className={`mt-8 mb-12 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-1 h-8 bg-red-800" />
                    <h2 className="text-3xl font-serif font-bold text-stone-800">岁时记</h2>
                </div>
                <p className="text-stone-500 text-sm font-serif pl-5">光阴流转，步履不停</p>
            </div>

            {/* 数据概览 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                    { label: "接诊(人次)", val: reportData.stats.patients },
                    { label: "手术(台)", val: reportData.stats.surgeries },
                    { label: "时长(时)", val: reportData.stats.hours },
                    { label: "夜班(次)", val: reportData.stats.nightShifts }
                ].map((item, idx) => (
                    <div key={idx} className={`border-l border-stone-300 pl-4 transition-all duration-700 delay-${idx * 100 + 300} ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <div className="text-xs text-stone-400 font-serif mb-1">{item.label}</div>
                        <div className="text-xl font-serif font-bold text-stone-800">{item.val}</div>
                    </div>
                ))}
            </div>

            <div className={`flex-1 bg-white/50 rounded-xl p-4 shadow-sm border border-stone-100 transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </div>
    );
};

// 4. 成就：条幅
const AchievementPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex items-center justify-center p-8">
        {/* 背景 - 远山 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1080&q=80" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-stone-100/50 -skew-x-12 translate-x-20" />
        
        <div className="relative z-10 w-full max-w-md space-y-12">
            {reportData.achievements.map((item, idx) => (
                <div 
                    key={idx} 
                    className={`flex items-center gap-6 transition-all duration-[1500ms] ease-out`}
                    style={{ 
                        transitionDelay: `${idx * 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : idx % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'
                    }}
                >
                    <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center shrink-0 bg-white">
                        <span className="font-serif text-stone-400 italic">{idx + 1}</span>
                    </div>
                    <div className="flex-1 border-b border-stone-200 pb-4">
                        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-stone-500 font-serif">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="absolute bottom-8 left-8 opacity-20">
            <Mountain className="w-32 h-32 text-stone-800" strokeWidth={1} />
        </div>
    </div>
);

// 5. 心语：祈福挂签
const CommentPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex flex-col items-center p-8">
        {/* 背景竹影 */}
        <div className="absolute right-[-100px] bottom-0 opacity-10 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1525127752301-99b0b6379811?w=600&q=80" alt="bamboo" className="w-[400px] grayscale contrast-200" />
        </div>

        <div className={`mt-10 mb-16 text-center transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block border-y border-stone-800 py-2 px-8">
                <h2 className="text-2xl font-serif font-bold text-stone-800">杏林佳话</h2>
            </div>
            <p className="text-stone-400 text-xs mt-2 font-serif">口耳相传 · 医患情深</p>
        </div>

        <div className="flex justify-center gap-6 h-[400px] w-full max-w-md">
            {reportData.comments.map((item, idx) => (
                <div 
                    key={idx}
                    className={`relative w-16 bg-red-50 border border-stone-200 shadow-md flex flex-col items-center py-6 transition-all duration-[2000ms] ease-out origin-top`}
                    style={{ 
                        transitionDelay: `${idx * 400 + 300}ms`,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? `translateY(${idx % 2 === 0 ? 0 : 40}px) rotate(${idx % 2 === 0 ? 1 : -1}deg)` : 'translateY(-100vh)'
                    }}
                >
                    {/* 挂绳孔 */}
                    <div className="w-2 h-2 bg-stone-800 rounded-full mb-4" />
                    <div className="flex-1 writing-vertical-rl text-stone-800 font-serif tracking-widest border-l border-stone-300/50 pl-1">
                        {item.text}
                    </div>
                    <div className="mt-4 writing-vertical-rl text-xs text-red-800 font-serif">
                        {item.author} · 敬赠
                    </div>
                    
                    {/* 底部流苏模拟 */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                         <div className="w-[1px] h-4 bg-red-800" />
                         <div className="w-1 h-1 rounded-full bg-red-800" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// 6. 寄语：致敬医者
const MessagePage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex flex-col items-center justify-center p-8">
        {/* 背景 - 竹叶剪影 */}
        <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
             <img src="https://images.unsplash.com/photo-1520509414578-d94865923ad0?w=800&q=80" className="w-[300px] grayscale contrast-150 mix-blend-multiply" />
        </div>

        <div className={`relative z-10 w-full max-w-md transition-all duration-[1500ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center mb-12">
                <div className="w-[2px] h-16 bg-red-800/50" />
            </div>

            <div className="space-y-8 text-center font-serif leading-loose">
                <div className={`transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-stone-500 text-sm mb-2">乙巳年 · 愿</p>
                    <div className="text-xl text-stone-800">
                        用 <span className="text-2xl font-bold text-red-900 mx-1 border-b border-stone-300">{reportData.stats.hours}</span> 时之坚守
                    </div>
                    <div className="text-xl text-stone-800 mt-2">
                        护 <span className="text-2xl font-bold text-red-900 mx-1 border-b border-stone-300">三千二百</span> 家之安康
                    </div>
                </div>

                <div className={`transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="text-xl text-stone-800">
                        书 <span className="text-2xl font-bold text-red-900 mx-1 border-b border-stone-300">百六十八万</span> 字之医案
                    </div>
                    <div className="text-xl text-stone-800 mt-2">
                        铭 <span className="text-2xl font-bold text-red-900 mx-1 border-b border-stone-300">三千二百</span> 户之深情
                    </div>
                </div>

                <div className={`py-6 transition-all duration-1000 delay-[1200ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-16 h-16 border-2 border-red-800 rounded-full mx-auto p-1 flex items-center justify-center rotate-3 opacity-80">
                         <div className="w-full h-full border border-red-800 rounded-full flex items-center justify-center bg-red-50 text-red-900 font-bold text-xs writing-vertical-rl">
                            感恩有您
                         </div>
                    </div>
                </div>

                <div className={`transition-all duration-1000 delay-[1600ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-stone-600">愿君 悬壶济世 岁岁安康</p>
                    <p className="text-stone-600 mt-2">不负韶华 必有回响</p>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none translate-y-1/2 translate-x-1/4">
                <Seal text="医者" className="w-40 h-40" />
            </div>
        </div>
    </div>
);

// 7. 研习：文房卷轴
const StudyPage = ({ isActive }) => (
    <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex flex-col items-center justify-center p-8">
        {/* 背景 - 书房一角 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <img src="https://images.unsplash.com/photo-1507842217121-9e691b2d0905?w=1080&q=80" className="w-full h-full object-cover grayscale" />
        </div>

        <div className={`relative z-10 w-full max-w-md bg-stone-100/90 backdrop-blur-sm p-8 shadow-inner border border-stone-200 transition-all duration-[1500ms] ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 origin-center'}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fcfaf2] px-4 text-stone-500 font-serif text-sm">
                研精覃思
            </div>

            <div className="grid grid-cols-2 gap-8 py-8 text-center">
                <div className={`transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex justify-center mb-4">
                        <Feather className="w-8 h-8 text-stone-600" />
                    </div>
                    <div className="text-4xl font-serif font-bold text-stone-900 mb-2">{reportData.studyHours}</div>
                    <div className="text-xs text-stone-500 font-serif">研习时长(时)</div>
                </div>
                <div className={`transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex justify-center mb-4">
                        <Cloud className="w-8 h-8 text-stone-600" />
                    </div>
                    <div className="text-4xl font-serif font-bold text-stone-900 mb-2">{reportData.readBooks}</div>
                    <div className="text-xs text-stone-500 font-serif">阅览医典(部)</div>
                </div>
            </div>

            <div className="text-center border-t border-stone-200 pt-6">
                <p className="text-stone-600 font-serif leading-relaxed">
                    "博学之，审问之，慎思之，明辨之，笃行之。"
                </p>
            </div>
        </div>
    </div>
);

// 7. 分享：请柬
const SharePage = ({ isActive }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="h-full w-full relative overflow-hidden bg-[#fcfaf2] flex items-center justify-center p-6">
             {/* 背景 - 喜庆纹样 */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                 <img src="https://images.unsplash.com/photo-1613686294898-288b5f0256a9?w=1080&q=80" className="w-full h-full object-cover grayscale" />
            </div>
            
            {/* 边框纹样 */}
            <div className="absolute inset-4 border border-stone-300 pointer-events-none" />
            <div className="absolute inset-5 border border-stone-200 pointer-events-none" />
            
            <div className={`relative z-10 w-full max-w-xs bg-white shadow-2xl p-8 flex flex-col items-center transition-all duration-[1500ms] ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 rotate-3'}`}>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <div className="w-12 h-12 border border-red-800 rounded-full flex items-center justify-center">
                        <span className="text-red-800 font-serif font-bold">医</span>
                    </div>
                </div>

                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2 writing-vertical-rl h-32 mx-auto tracking-[0.5em]">年度报告</h2>
                
                <div className="w-full h-[1px] bg-stone-200 my-8" />
                
                <div className="text-center space-y-4 mb-8">
                    <div>
                        <p className="text-xs text-stone-400 mb-1">医师</p>
                        <p className="text-lg font-serif text-stone-800">{reportData.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 mb-1">关键词</p>
                        <p className="text-xl font-serif text-red-800">{reportData.keyword}</p>
                    </div>
                </div>

                <button 
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 border border-stone-800 text-stone-800 font-serif hover:bg-stone-800 hover:text-white transition-colors"
                >
                    呈递分享
                </button>
            </div>

             {/* Share Modal */}
             {showModal && (
                <div className="absolute inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-8" onClick={() => setShowModal(false)}>
                    <div className="bg-[#fcfaf2] w-full max-w-sm p-8 shadow-xl animate-scale-up">
                        <div className="flex justify-between mb-8 border-b border-stone-200 pb-4">
                            <h3 className="text-stone-800 font-serif text-lg">请选择分享方式</h3>
                            <X className="w-5 h-5 text-stone-400 cursor-pointer" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {['微信', '朋友圈', 'QQ', '保存'].map((item, i) => (
                                <button key={i} className="py-3 bg-white border border-stone-200 text-stone-600 font-serif hover:border-red-800 hover:text-red-800 transition-colors">
                                    {item}
                                </button>
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

export default function ReportV7() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, IntroPage, StatsPage, AchievementPage, CommentPage, StudyPage, MessagePage, SharePage];

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
            className="fixed inset-0 bg-[#e5e5e5] overflow-hidden font-serif select-none"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto shadow-2xl bg-[#fcfaf2]">
                {pages.map((Page, idx) => {
                    // Ink transition logic
                    let style = {};
                    if (idx === currentPage) {
                        style = { opacity: 1, pointerEvents: 'auto', zIndex: 10 };
                    } else if (idx < currentPage) {
                         // Past pages fade out with a slight upward drift
                        style = { opacity: 0, transform: 'translateY(-50px)', zIndex: 0 };
                    } else {
                        // Future pages wait
                        style = { opacity: 0, zIndex: 0 };
                    }

                    return (
                        <div
                            key={idx}
                            className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
                            style={style}
                        >
                            <Page isActive={currentPage === idx} />
                        </div>
                    );
                })}

                {/* Custom Pagination - Red Ink Dots */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                    {pages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all duration-500 border border-stone-300 ${
                                currentPage === idx ? 'bg-red-800 border-red-800 scale-125' : 'bg-transparent'
                            }`}
                        />
                    ))}
                </div>
            </div>
            
            {/* Background Texture for the Desktop Wrapper */}
            <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        </div>
    );
}

