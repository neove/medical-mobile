import React, { useState, useRef, useEffect } from 'react';
import { Share2, Music, Play, Pause, Heart, Star, Calendar, Clock, Sparkles } from 'lucide-react';

// ----------------------------------------------------------------------
// Data & Story Scripts
// ----------------------------------------------------------------------

const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    year: 2024,
    keyword: "光之愈梦者",
    keywordDesc: "你的温柔是手术刀无法切断的坚韧",
    story: {
        intro: {
            t1: "时光的指针拨回到 2024 年初",
            t2: "这一年，你在医院的走廊里",
            t3: "留下了无数匆忙的脚印"
        },
        patients: {
            count: 1850,
            t1: "这一年，你与",
            t2: "个生命产生了交集",
            t3: "每一次听诊器的触碰",
            t4: "都是一次对生命的郑重承诺"
        },
        lateNight: {
            date: "11月14日",
            time: "03:42",
            t1: "还记得",
            t2: "的那个凌晨吗？",
            t3: "城市已经睡去，星光也很微弱",
            t4: "而你，还在无影灯下守护心跳"
        },
        surgery: {
            count: 320,
            hours: 2400,
            t1: "这一年，你完成了",
            t2: "台高难度手术",
            t3: "在生死时速的博弈中",
            t4: "你用 2400 小时的专注",
            t5: "赢回了无数家庭的春天"
        },
        special: {
            date: "9月20日",
            count: 5,
            t1: "这一天大概很特别",
            t2: "你收到了",
            t3: "面锦旗和一封手写信",
            t4: "患者说：",
            t5: "“谢谢你，让我看到了明天的太阳”"
        }
    }
};

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

// 模拟网易云风格的进度条
const ProgressBar = ({ active, index, total }) => (
    <div className="absolute top-4 left-4 right-4 flex gap-2 z-50">
        {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                    className={`h-full bg-white/80 transition-all duration-300 ease-linear ${
                        i < index ? 'w-full' : i === index && active ? 'w-full' : 'w-0'
                    }`}
                    style={{ transitionDuration: i === index ? '5s' : '0s' }}
                />
            </div>
        ))}
    </div>
);

// 旋转的黑胶唱片 (装饰)
const Vinyl = ({ spinning }) => (
    <div className={`w-48 h-48 rounded-full border-[8px] border-gray-800 bg-gray-900 flex items-center justify-center shadow-2xl ${spinning ? 'animate-spin-slow' : ''}`}>
        <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-gray-700" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&q=80)' }} />
    </div>
);

// 1. 封面：时光开启
const CoverPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200 animate-gradient-slow" />
        
        <div className={`relative z-10 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-white/80 text-sm font-serif tracking-[0.3em] mb-4 uppercase">Medical Report</div>
            <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg font-serif leading-tight">
                2024<br/>时光胶囊
            </h1>
            
            <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mb-8" />
            
            <p className="text-white font-serif text-lg opacity-90">
                这是属于 {reportData.name} 医生的<br/>独家记忆
            </p>
        </div>

        <div className="absolute bottom-16 animate-bounce">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play className="w-5 h-5 text-white fill-white" />
            </div>
        </div>
    </div>
);

// 2. 初遇：相遇的数字
const MeetPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4f6d7a]" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')] bg-cover bg-center mix-blend-overlay scale-110 animate-breathe" />
        
        <div className="relative z-10 text-white space-y-6 font-serif">
             <p className={`text-xl transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {reportData.story.patients.t1}
            </p>
            <div className={`transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <span className="text-7xl font-bold text-cyan-300 drop-shadow-lg font-sans">{reportData.story.patients.count}</span>
            </div>
            <p className={`text-xl transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {reportData.story.patients.t2}
            </p>
            <div className="h-px w-12 bg-white/30 my-4" />
            <div className={`text-lg text-white/80 leading-relaxed transition-all duration-1000 delay-[1500ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <p>{reportData.story.patients.t3}</p>
                <p>{reportData.story.patients.t4}</p>
            </div>
        </div>
    </div>
);

// 3. 深夜：守护星光
const NightPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1a2a3a]" />
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-100/10 rounded-full blur-[40px]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* 星空背景 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />

        <div className="relative z-10 text-white space-y-6 font-serif">
            <div className={`flex items-center gap-3 text-yellow-200/80 mb-4 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Clock className="w-5 h-5" />
                <span>深夜时刻</span>
            </div>
            
            <p className={`text-2xl transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {reportData.story.lateNight.t1} <span className="text-yellow-300 font-bold text-3xl">{reportData.story.lateNight.date}</span>
            </p>
            <p className={`text-2xl transition-all duration-1000 delay-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {reportData.story.lateNight.t2}
            </p>
            
            <div className={`p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mt-8 transition-all duration-1000 delay-[1200ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-lg leading-relaxed text-gray-200">
                    “{reportData.story.lateNight.t3}。<br/>
                    而你，还在无影灯下守护心跳。<br/>
                    那一刻的时间是：<span className="font-mono text-yellow-300 text-xl">{reportData.story.lateNight.time}</span>”
                </p>
            </div>
        </div>
    </div>
);

// 4. 专注：热血与汗水
const SurgeryPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#8d3b3b]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent animate-pulse" />

        <div className="relative z-10 text-white text-center font-serif">
            <div className={`mb-8 transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-12 h-12 text-red-300 fill-red-300/50" />
                </div>
            </div>

            <p className={`text-lg transition-all duration-1000 delay-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {reportData.story.surgery.t1}
            </p>
            <h2 className={`text-6xl font-bold my-4 text-red-200 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                {reportData.story.surgery.count} <span className="text-2xl font-normal text-white">台</span>
            </h2>
            <p className={`text-lg mb-8 transition-all duration-1000 delay-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {reportData.story.surgery.t2}
            </p>

            <div className={`text-white/80 space-y-2 transition-all duration-1000 delay-[1000ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p>{reportData.story.surgery.t3}</p>
                <p>你用 <span className="text-xl font-bold text-white">{reportData.story.surgery.hours}</span> 小时的专注</p>
                <p>{reportData.story.surgery.t5}</p>
            </div>
        </div>
    </div>
);

// 5. 特别：感动瞬间
const SpecialPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d4a373]" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-white font-serif">
            <div className={`flex items-center gap-2 text-orange-100 mb-6 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Sparkles className="w-5 h-5" />
                <span>难忘的一天</span>
            </div>

            <h2 className={`text-4xl font-bold mb-6 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                {reportData.story.special.date}
            </h2>

            <p className={`text-xl mb-2 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {reportData.story.special.t1}
            </p>
            <p className={`text-xl mb-8 transition-all duration-1000 delay-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {reportData.story.special.t2} <span className="text-3xl font-bold text-orange-200">{reportData.story.special.count}</span> {reportData.story.special.t3}
            </p>

            <div className={`relative p-6 bg-white text-stone-600 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm shadow-xl rotate-1 transition-all duration-1000 delay-[1200ms] ${isActive ? 'opacity-100 rotate-1 translate-y-0' : 'opacity-0 rotate-6 translate-y-10'}`}>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-400/50 rounded-full" />
                <p className="text-lg font-medium italic">{reportData.story.special.t5}</p>
                <div className="text-right text-sm mt-4 text-stone-400">— 患者致信</div>
            </div>
        </div>
    </div>
);

// 6. 关键词：年度形象
const KeywordPage = ({ isActive }) => (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-300 to-purple-400" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />

        <div className={`relative z-10 text-center transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/70 text-lg font-serif mb-8">你的 2024 年度关键词</p>
            
            <div className={`relative w-64 h-80 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex flex-col items-center justify-center shadow-2xl mx-auto transition-all duration-[1500ms] delay-500 ${isActive ? 'rotate-0 scale-100 opacity-100' : 'rotate-y-90 scale-50 opacity-0'}`} style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute -top-10">
                    <Vinyl spinning={isActive} />
                </div>
                
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md font-serif">{reportData.keyword}</h2>
                    <div className="w-8 h-1 bg-white/50 mx-auto mb-4" />
                    <p className="text-white/90 text-sm leading-relaxed font-serif">
                        {reportData.keywordDesc}
                    </p>
                </div>
                
                <div className="absolute bottom-4 text-xs text-white/40 uppercase tracking-widest">
                    Annual Report
                </div>
            </div>

            <div className={`mt-12 flex gap-4 justify-center transition-all duration-1000 delay-[2000ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                    <Share2 className="w-4 h-4" />
                    分享海报
                 </button>
            </div>
        </div>
    </div>
);

// ----------------------------------------------------------------------
// Main Layout
// ----------------------------------------------------------------------

export default function ReportV9() {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const pages = [CoverPage, MeetPage, NightPage, SurgeryPage, SpecialPage, KeywordPage];

    // 自动播放逻辑 (模拟网易云自动翻页，但这里保留手动控制体验更好)
    // 如果需要自动播放，可以在 useEffect 中设置定时器

    const handleScroll = (direction) => {
        if (isScrolling.current) return;
        const next = currentPage + direction;
        if (next >= 0 && next < pages.length) {
            isScrolling.current = true;
            setCurrentPage(next);
            setTimeout(() => isScrolling.current = false, 1500); // 增加冷却时间，让动画充分展示
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
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes breathe {
                    0%, 100% { transform: scale(1.1); }
                    50% { transform: scale(1.15); }
                }
                @keyframes gradient-slow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                .animate-breathe { animation: breathe 8s ease-in-out infinite; }
                .animate-gradient-slow { 
                    background-size: 200% 200%;
                    animation: gradient-slow 10s ease infinite;
                }
            `}</style>

            {/* Progress Bar */}
            <ProgressBar active={!isScrolling.current} index={currentPage} total={pages.length} />

            {/* Pages Container */}
            <div className="w-full h-full relative max-w-[600px] mx-auto bg-gray-900 shadow-2xl">
                {pages.map((Page, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-in-out`}
                        style={{
                            transform: idx === currentPage ? 'translateY(0) scale(1)' : idx < currentPage ? 'translateY(-100%) scale(0.9)' : 'translateY(100%) scale(0.9)',
                            opacity: idx === currentPage ? 1 : 0, // 这里的透明度让下一页在进入前不可见，模拟卡片覆盖
                            zIndex: idx === currentPage ? 10 : 0,
                            filter: idx === currentPage ? 'blur(0)' : 'blur(10px)'
                        }}
                    >
                        <Page isActive={currentPage === idx} />
                    </div>
                ))}
            </div>

            {/* Music Indicator (Decoration) */}
            <div className="absolute top-6 right-6 z-50 animate-spin-slow">
                <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
                    <Music className="w-4 h-4 text-white" />
                </div>
            </div>
        </div>
    );
}

