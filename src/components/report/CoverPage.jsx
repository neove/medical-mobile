import { ParticleBackground, RippleBackground } from '../decorations/CanvasBackground'
import { FloatingShapes, WavePattern, MedicalCross, Heartbeat } from '../decorations/SVGDecorations'

function CoverPage({ data, index, isActive }) {
  const { doctorName = '张医生', department = '心内科', year = 2024 } = data

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden">
      {/* Canvas背景 */}
      <RippleBackground colors={['#667eea', '#764ba2']} isActive={isActive} />
      <ParticleBackground color="#ffffff" isActive={isActive} />
      
      {/* SVG装饰 */}
      <FloatingShapes />
      <WavePattern />
      
      {/* 医疗图标装饰 */}
      <div className="absolute top-20 right-20 opacity-20">
        <MedicalCross className="w-24 h-24 text-white" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-15">
        <Heartbeat className="w-32 h-32 text-white" />
      </div>

      {/* 主要内容 */}
      <div className={`relative z-10 text-center text-white transform transition-all duration-1000 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* 医生图标容器 */}
        <div className="relative mb-8">
          <div className={`text-8xl mb-2 transition-all duration-1000 ${isActive ? 'animate-bounce' : ''}`}>
            👨‍⚕️
          </div>
          {/* 光环效果 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-pulse-glow"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">{year}年度</h1>
          <div className="relative inline-block">
            <h2 className="text-4xl font-semibold mb-8 relative z-10">医务工作报告</h2>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xl opacity-90">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span>{doctorName} · {department}</span>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center space-y-2 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}>
        <span className="animate-bounce" style={{ animationDuration: '2s' }}>向上滑动查看报告</span>
        <svg className="w-6 h-6 animate-bounce" style={{ animationDuration: '1.5s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export default CoverPage
