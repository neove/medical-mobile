import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Clock, Users, Zap, Award, Target, TrendingUp, BriefcaseMedical, Smile, Star, Activity, Stethoscope, Sparkles, Calendar, MapPin, Share2, Download, X } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// ----------------------------------------------------------------------
// Fake Data - Extended for V4
// ----------------------------------------------------------------------
const reportData = {
    name: "王心怡",
    role: "心血管外科医师",
    year: 2024,
    keyword: "守护者", // 年度关键词
    stats: {
        patientsSeen: "2,856",
        surgeryHours: "2,460",
        criticalCases: 98,
        newProcedures: 5,
        consultations: 156,
        nightShifts: 42,
        words: "168",
        families: "3,200",
        successRate: 99.8,
    },
    timeline: [
        { date: "2024.02.14", event: "除夕夜坚守岗位，完成一台急诊手术" },
        { date: "2024.05.12", event: "获得“市级优秀青年医生”称号" },
        { date: "2024.08.20", event: "主刀完成首例微创瓣膜置换术" },
        { date: "2024.11.15", event: "发表SCI论文一篇，影响因子 5.2" }
    ],
    busiestDay: {
        date: "2024.09.10",
        hours: 16,
        surgeries: 4,
        desc: "这一天，你仿佛不知疲倦的陀螺，穿梭在手术室与病房之间。"
    },
    patientComments: [
        "医术精湛，仁心仁术", "谢谢您给了我第二次生命", "非常有耐心，解释很清楚", 
        "暖心的好医生", "技术一流", "守护生命的天使", "永远感激您", "妙手回春"
    ],
    memorableMoment: "成功完成了一例高难度、耗时18小时的复杂心脏移植手术，患者恢复良好。那一刻，所有的疲惫都化为值得。",
    nextYearGoal: "专注于微创技术的研究与推广，力争在心血管疾病的早期干预上取得突破，并带领团队完成一项临床科研项目。"
};

// 背景图配置 - 抽象、纹理、流体风格 - 优化版 (更具艺术感和沉浸感)
const backgroundImages = {
    // 封面：深邃星云，极简黑/蓝调，高级感
    p1: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1080&h=1920&fit=crop&q=80', 
    // 时间轴：更深邃的抽象流体，低对比度，不抢眼
    p2: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1080&h=1920&fit=crop&q=80', 
    // 忙碌：暖色调光晕，日出/日落的温暖感
    p3: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1080&h=1920&fit=crop&q=80', 
    // 数据：抽象几何/科技蓝，干净利落
    p4: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&h=1920&fit=crop&q=80', 
    // 评价：柔和的云朵/水波，治愈系粉/紫
    p5: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1080&h=1920&fit=crop&q=80', 
    // 成就：金色/琥珀色光斑，荣耀感
    p6: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1080&h=1920&fit=crop&q=80', 
    // 展望：广阔星空/未来感，深邃
    p7: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&h=1920&fit=crop&q=80', 
    // 分享：极简纯净，微纹理，突出卡片
    p8: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1080&h=1920&fit=crop&q=80'  
};

// ----------------------------------------------------------------------
// Shared Components
// ----------------------------------------------------------------------

const FadeInText = ({ children, delay = 0, className = "" }) => (
    <div 
        className={`transition-all duration-1000 ease-out ${className}`}
        style={{ 
            opacity: 0, 
            animation: `fadeInUp 1s ease-out ${delay}ms forwards` 
        }}
    >
        {children}
    </div>
);

const GlassCard = ({ children, className = "" }) => (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl ${className}`}>
        {children}
    </div>
);

// ----------------------------------------------------------------------
// Pages
// ----------------------------------------------------------------------

// P1: 封面 - 年度关键词
const CoverPage = ({ data, isActive }) => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p1})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="relative z-10 text-center px-8">
                {isActive && (
                    <>
                        <FadeInText delay={200} className="text-lg text-white/80 mb-4 tracking-[0.3em]">
                            2024年度听诊报告
                        </FadeInText>
                        <FadeInText delay={500} className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-8 font-serif">
                            {data.keyword}
                        </FadeInText>
                        <FadeInText delay={800} className="text-xl text-white font-light">
                            {data.name} · {data.role}
                        </FadeInText>
                        <div className="mt-20 animate-bounce text-white/50">
                            <p className="text-xs mb-2">开启回忆</p>
                            <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// P2: 时间足迹
const TimelinePage = ({ data, isActive }) => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p2})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-[2px]" />
            
            <div className="relative z-10 w-full max-w-md px-6">
                {isActive && (
                    <>
                        <FadeInText delay={200} className="text-3xl font-bold text-white mb-10 pl-4 border-l-4 border-blue-400">
                            时间足迹
                        </FadeInText>
                        <div className="space-y-8">
                            {data.timeline.map((item, index) => (
                                <FadeInText key={index} delay={400 + index * 300} className="flex relative">
                                    <div className="flex-none w-24 text-right pr-4 pt-1">
                                        <span className="text-blue-300 font-mono text-sm">{item.date}</span>
                                    </div>
                                    <div className="absolute left-[6rem] top-2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10" />
                                    <div className="absolute left-[6.2rem] top-4 bottom-[-2rem] w-[1px] bg-white/20 last:hidden" />
                                    <div className="flex-1 pl-8 pb-2">
                                        <p className="text-white text-lg leading-snug">{item.event}</p>
                                    </div>
                                </FadeInText>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// P3: 忙碌时刻
const BusiestPage = ({ data, isActive }) => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p3})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-orange-900/40 backdrop-blur-[2px]" />
            
            <div className="relative z-10 px-8 text-center">
                {isActive && (
                    <>
                        <FadeInText delay={200}>
                            <div className="inline-block px-4 py-1 border border-white/50 rounded-full text-white/80 text-sm mb-6">
                                难以忘怀的一天
                            </div>
                        </FadeInText>
                        
                        <FadeInText delay={500}>
                            <h2 className="text-6xl font-black text-white mb-2 font-mono">{data.busiestDay.date.split('.')[1]}.{data.busiestDay.date.split('.')[2]}</h2>
                            <p className="text-white/80 mb-10">这一天似乎格外漫长</p>
                        </FadeInText>
                        
                        <GlassCard className="text-left mb-8">
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-4xl font-bold text-orange-300">{data.busiestDay.hours}</span>
                                <span className="text-white/80 pb-1">小时</span>
                                <span className="text-white/50 text-sm pb-1 ml-auto">工作时长</span>
                            </div>
                            <div className="w-full h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
                                <div className="h-full bg-orange-400 w-[80%] animate-[growWidth_1.5s_ease-out_forwards]" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-orange-300">{data.busiestDay.surgeries}</span>
                                <span className="text-white/80 pb-1">台</span>
                                <span className="text-white/50 text-sm pb-1 ml-auto">手术连轴转</span>
                            </div>
                        </GlassCard>

                        <FadeInText delay={1000} className="text-white/90 text-lg leading-relaxed font-light">
                            "{data.busiestDay.desc}"
                        </FadeInText>
                    </>
                )}
            </div>
        </div>
    );
};

// P4: 核心数据 (ECharts 环形图)
const StatsPage = ({ data, isActive }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (isActive && chartRef.current) {
            setTimeout(() => {
                const chart = chartRef.current?.getEchartsInstance();
                if (chart) chart.resize();
            }, 100);
        }
    }, [isActive]);

    // 简化版圆环配置
    const simplePieOption = {
        color: ['#3b82f6', '#8b5cf6', '#f43f5e', '#fbbf24'],
        series: [
            {
                name: 'Work Stats',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold', color: '#fff' } },
                labelLine: { show: false },
                data: [
                    { value: 1850, name: '接诊' },
                    { value: 2460, name: '手术' },
                    { value: 98, name: '急救' },
                    { value: 156, name: '会诊' }
                ]
            }
        ]
    };

    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p4})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm" />
            
            <div className="relative z-10 w-full px-6">
                {isActive && (
                    <>
                        <FadeInText delay={200} className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">数字见证不凡</h2>
                            <p className="text-blue-200">Data Highlights</p>
                        </FadeInText>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                             <GlassCard className="flex flex-col items-center justify-center !p-4">
                                <Users className="w-6 h-6 text-blue-300 mb-2" />
                                <span className="text-2xl font-bold text-white">{data.stats.patientsSeen}</span>
                                <span className="text-xs text-white/60">接诊患者</span>
                            </GlassCard>
                            <GlassCard className="flex flex-col items-center justify-center !p-4">
                                <Clock className="w-6 h-6 text-purple-300 mb-2" />
                                <span className="text-2xl font-bold text-white">{data.stats.surgeryHours}</span>
                                <span className="text-xs text-white/60">手术时长</span>
                            </GlassCard>
                            <GlassCard className="flex flex-col items-center justify-center !p-4">
                                <Zap className="w-6 h-6 text-yellow-300 mb-2" />
                                <span className="text-2xl font-bold text-white">{data.stats.criticalCases}</span>
                                <span className="text-xs text-white/60">危重抢救</span>
                            </GlassCard>
                            <GlassCard className="flex flex-col items-center justify-center !p-4">
                                <BriefcaseMedical className="w-6 h-6 text-green-300 mb-2" />
                                <span className="text-2xl font-bold text-white">{data.stats.nightShifts}</span>
                                <span className="text-xs text-white/60">夜班值守</span>
                            </GlassCard>
                        </div>

                        <GlassCard className="!p-2 h-64 flex items-center justify-center">
                            <ReactECharts 
                                option={simplePieOption} 
                                style={{ height: '200px', width: '100%' }} 
                                opts={{ renderer: 'svg' }} 
                            />
                            <div className="absolute text-center pointer-events-none">
                                <div className="text-3xl font-bold text-white">99.8%</div>
                                <div className="text-xs text-white/60">成功率</div>
                            </div>
                        </GlassCard>
                    </>
                )}
            </div>
        </div>
    );
};

// P5: 患者评价 (词云概念)
const CommentsPage = ({ data, isActive }) => {
    // 随机位置生成
    const getRandomPos = (idx) => {
        const positions = [
            { top: '15%', left: '10%' }, { top: '25%', right: '10%' },
            { top: '40%', left: '20%' }, { top: '50%', right: '20%' },
            { top: '65%', left: '5%' },  { top: '75%', right: '15%' },
            { top: '30%', left: '50%', transform: 'translateX(-50%)' }, { top: '85%', left: '40%' }
        ];
        return positions[idx % positions.length];
    };

    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p5})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-pink-900/30 backdrop-blur-sm" />
            
            <div className="relative z-10 w-full h-full">
                {isActive && (
                    <>
                        <div className="absolute top-10 left-0 w-full text-center">
                            <FadeInText delay={200} className="inline-block px-6 py-2 bg-white/10 rounded-full border border-white/30">
                                <span className="text-white font-medium">来自患者的心声</span>
                            </FadeInText>
                        </div>

                        {data.patientComments.map((comment, idx) => (
                            <div
                                key={idx}
                                className="absolute px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/20 shadow-lg whitespace-nowrap"
                                style={{
                                    ...getRandomPos(idx),
                                    opacity: 0,
                                    animation: `floatIn 1s ease-out ${500 + idx * 300}ms forwards, float 6s ease-in-out ${idx * 1000}ms infinite`
                                }}
                            >
                                <span className="mr-2">❤️</span>{comment}
                            </div>
                        ))}

                        <div className="absolute bottom-20 w-full text-center px-8">
                            <FadeInText delay={3000}>
                                <p className="text-white/90 text-lg italic font-light">
                                    "您的每一次付出，<br/>都被人悄悄记在心里"
                                </p>
                            </FadeInText>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// P6: 年度成就
const AchievementPage = ({ data, isActive }) => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p6})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-amber-900/40" />

            <div className="relative z-10 w-full px-6">
                {isActive && (
                    <>
                        <FadeInText delay={200} className="text-center mb-12">
                            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                            <h2 className="text-4xl font-bold text-white">荣耀时刻</h2>
                        </FadeInText>

                        <GlassCard className="mb-6 !bg-gradient-to-br !from-white/20 !to-white/5">
                            <div className="flex items-center mb-4">
                                <Star className="w-8 h-8 text-yellow-300 mr-3" />
                                <span className="text-xl font-bold text-white">科研突破</span>
                            </div>
                            <p className="text-white/90">发表SCI论文1篇 (IF: 5.2)</p>
                            <p className="text-white/90">参与省级科研项目1项</p>
                        </GlassCard>

                        <GlassCard className="!bg-gradient-to-br !from-white/20 !to-white/5">
                            <div className="flex items-center mb-4">
                                <Target className="w-8 h-8 text-red-300 mr-3" />
                                <span className="text-xl font-bold text-white">技术精进</span>
                            </div>
                            <p className="text-white/90">独立完成微创手术50+例</p>
                            <p className="text-white/90">新技术应用考核优秀</p>
                        </GlassCard>
                    </>
                )}
            </div>
        </div>
    );
};

// P7: 展望 -> P7: 寄语
const MessagePage = ({ data, isActive }) => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p7})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-indigo-900/50 backdrop-blur-[1px]" />

            <div className="relative z-10 px-8 w-full text-center">
                {isActive && (
                    <>
                        <FadeInText delay={200} className="mb-12">
                            <h2 className="text-5xl font-bold text-white mb-4 font-serif">2025</h2>
                            <div className="h-1 w-20 bg-white/50 mx-auto rounded-full" />
                        </FadeInText>

                        <div className="space-y-8 text-white/90 font-light text-lg leading-relaxed">
                            <FadeInText delay={400}>
                                <p>
                                    用 <span className="text-2xl font-bold text-white mx-1">{data.stats.surgeryHours}</span> 小时的坚守
                                </p>
                                <p className="mt-2">
                                    守护 <span className="text-2xl font-bold text-white mx-1">{data.stats.families}</span> 个生命的安康
                                </p>
                            </FadeInText>

                            <FadeInText delay={600}>
                                <p>
                                    书写 <span className="text-2xl font-bold text-white mx-1">{data.stats.words}</span> 万字病历
                                </p>
                                <p className="mt-2">
                                    铭刻 <span className="text-2xl font-bold text-white mx-1">{data.stats.families}</span> 个家庭的记忆
                                </p>
                            </FadeInText>
                        </div>

                        <FadeInText delay={1000} className="mt-12">
                             <div className="inline-block px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full">
                                <span className="text-white font-bold tracking-widest">医路漫漫，感恩有您！</span>
                             </div>
                        </FadeInText>
                    </>
                )}
            </div>
        </div>
    );
};

// P8: 分享页 - 高级黑金风格
const SharePage = ({ data, isActive }) => {
    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center">
            {/* 背景层 */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                style={{ 
                    backgroundImage: `url(${backgroundImages.p8})`, 
                    transform: isActive ? 'scale(1.1)' : 'scale(1.0)' 
                }}
            />
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

            {/* 主要内容区 */}
            <div className="relative z-10 w-full max-w-sm mx-auto p-6">
                {isActive && (
                    <div className="transform transition-all duration-1000 translate-y-0 opacity-100 animate-[fadeInUp_0.8s_ease-out]">
                        {/* 海报卡片 */}
                        <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                            {/* 装饰光效 */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                            <div className="p-8 relative z-10 text-center">
                                {/* 顶部 Logo 区域 */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center animate-[pulse-glow_3s_infinite]">
                                        <Activity className="w-8 h-8 text-blue-400" />
                                    </div>
                                </div>

                                {/* 标题与关键词 */}
                                <h2 className="text-sm text-slate-400 tracking-[0.2em] mb-2 uppercase">Medical Report 2024</h2>
                                <div className="text-3xl font-bold text-white mb-6 font-serif">{data.name}的年度听诊</div>
                                
                                <div className="py-6 border-y border-white/5 mb-8">
                                    <div className="text-xs text-slate-500 mb-2">年度关键词</div>
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 tracking-wider" style={{ textShadow: '0 0 20px rgba(165, 180, 252, 0.3)' }}>
                                        {data.keyword}
                                    </div>
                                </div>
                                
                                {/* 核心数据网格 */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center justify-center gap-1 text-blue-300 mb-1">
                                            <Users className="w-3 h-3" />
                                            <span className="text-xs opacity-70">接诊</span>
                                        </div>
                                        <div className="text-xl font-bold text-white font-mono">{data.stats.patientsSeen}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center justify-center gap-1 text-purple-300 mb-1">
                                            <Clock className="w-3 h-3" />
                                            <span className="text-xs opacity-70">时长</span>
                                        </div>
                                        <div className="text-xl font-bold text-white font-mono">{data.stats.surgeryHours}h</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center justify-center gap-1 text-rose-300 mb-1">
                                            <Zap className="w-3 h-3" />
                                            <span className="text-xs opacity-70">急救</span>
                                        </div>
                                        <div className="text-xl font-bold text-white font-mono">{data.stats.criticalCases}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center justify-center gap-1 text-emerald-300 mb-1">
                                            <Award className="w-3 h-3" />
                                            <span className="text-xs opacity-70">成功率</span>
                                        </div>
                                        <div className="text-xl font-bold text-white font-mono">{data.stats.successRate}%</div>
                                    </div>
                                </div>

                                {/* 底部信息 */}
                                <div className="flex items-end justify-between">
                                    <div className="text-left">
                                        <p className="text-xs text-slate-500 mb-1">生成日期</p>
                                        <p className="text-xs text-slate-400 font-mono">2024.12.31</p>
                                    </div>
                                    {/* 模拟二维码 */}
                                    <div className="bg-white p-1 rounded-lg">
                                        <div className="w-12 h-12 bg-slate-900 flex flex-wrap gap-1 p-1 content-center justify-center">
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                             <div className="w-2 h-2 bg-transparent rounded-sm" />
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                             <div className="w-2 h-2 bg-transparent rounded-sm" />
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                             <div className="w-2 h-2 bg-transparent rounded-sm" />
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                             <div className="w-2 h-2 bg-white rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="mt-8 flex gap-4 px-4">
                            <button 
                                onClick={() => setShowShareModal(true)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-full font-medium shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-4 h-4" /> 
                                <span>分享报告</span>
                            </button>
                            <button 
                                className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-90"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 分享弹窗 */}
            {showShareModal && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={() => setShowShareModal(false)}>
                    <div className="bg-[#1a1a1a] w-full rounded-t-3xl p-6 animate-[slideUp_0.3s_ease-out] border-t border-white/10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-white">分享到</h3>
                            <button onClick={() => setShowShareModal(false)} className="p-1 rounded-full hover:bg-white/10"><X className="w-6 h-6 text-slate-400" /></button>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center pb-4">
                            {['微信', '朋友圈', 'QQ', '保存图片'].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                                        <Share2 className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{item}</span>
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
// Main App
// ----------------------------------------------------------------------

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef(null);
    const touchStartY = useRef(0);
    const isScrolling = useRef(false);

    const pages = [
        { id: 0, component: CoverPage, data: reportData },
        { id: 1, component: TimelinePage, data: reportData },
        { id: 2, component: BusiestPage, data: reportData },
        { id: 3, component: StatsPage, data: reportData },
        { id: 4, component: CommentsPage, data: reportData },
        { id: 5, component: AchievementPage, data: reportData },
        { id: 6, component: MessagePage, data: reportData },
        { id: 7, component: SharePage, data: reportData },
    ];

    useEffect(() => {
        setScrollY(currentPage * window.innerHeight);
    }, [currentPage]);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const delta = touchEndY - touchStartY.current;
        if (Math.abs(delta) > 50 && !isScrolling.current) {
            handlePageChange(delta < 0 ? 1 : -1);
        }
    };

    const handleWheel = useCallback((e) => {
        if (!isScrolling.current) {
            handlePageChange(e.deltaY > 0 ? 1 : -1);
        }
    }, []);

    const handlePageChange = (direction) => {
        if (isScrolling.current) return;
        const nextPage = currentPage + direction;
        if (nextPage >= 0 && nextPage < pages.length) {
            isScrolling.current = true;
            setCurrentPage(nextPage);
            setTimeout(() => isScrolling.current = false, 800);
        }
    };

    return (
        <div 
            className="h-screen w-screen overflow-hidden bg-black fixed inset-0 font-sans text-slate-800"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
        >
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes floatIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes growWidth { from { width: 0; } to { width: 80%; } }
                @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
            `}</style>

            {/* 页面切换容器 - 使用 transform 实现平滑过渡 */}
            <div 
                className="w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${currentPage * 100}%)` }}
            >
                {pages.map((page) => {
                    const PageComponent = page.component;
                    return (
                        <div key={page.id} className="w-full h-full relative flex-shrink-0">
                            <PageComponent 
                                data={page.data} 
                                isActive={currentPage === page.id} 
                                scrollY={scrollY}
                            />
                        </div>
                    );
                })}
            </div>
            
            {/* 进度指示器 */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
                {pages.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            currentPage === idx ? 'bg-white h-4' : 'bg-white/30'
                        }`}
                    />
                ))}
            </div>
            
            {/* 音乐播放按钮模拟 */}
            <div className="fixed top-4 right-4 z-50 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center animate-spin-slow border border-white/30">
                <div className="w-3 h-3 bg-white rounded-full" />
            </div>
        </div>
    );
};

export default App;

