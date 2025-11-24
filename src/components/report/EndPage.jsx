import { RippleBackground, ParticleBackground } from '../decorations/CanvasBackground'
import { WavePattern, FloatingShapes, MedicalCross, Heartbeat } from '../decorations/SVGDecorations'

function EndPage({ data, index, isActive }) {
  const { year = 2024 } = data

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 overflow-hidden">
      {/* Canvas背景 */}
      <RippleBackground colors={['#764ba2', '#667eea']} isActive={isActive} />
      <ParticleBackground color="#ffffff" isActive={isActive} />
      
      {/* SVG装饰 */}
      <FloatingShapes />
      <WavePattern />
      
      {/* 医疗图标装饰 */}
      <div className="absolute top-20 right-20 opacity-15">
        <MedicalCross className="w-32 h-32 text-white" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-10">
        <Heartbeat className="w-40 h-40 text-white" />
      </div>
      
      {/* 背景光效 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-300 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 装饰性SVG */}
      <div className="absolute top-32 left-32 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <animate attributeName="r" values="40;50;40" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="25" fill="currentColor" className="text-white" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className={`relative z-10 text-center text-white transform transition-all duration-1000 ${
        isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      }`}>
        {/* 图标容器 */}
        <div className="relative mb-8">
          <div className={`text-8xl mb-2 transition-all duration-1000 ${isActive ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }}>
            🙏
          </div>
          {/* 光环效果 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-pulse-glow"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">感谢您的付出</h1>
          <div className="relative inline-block">
            <p className="text-2xl opacity-90 mb-8 relative z-10">医者仁心，大爱无疆</p>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-lg opacity-80">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span>{year}年度医务工作报告</span>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndPage
