import { FloatingShapes, DotsPattern } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function AchievementPage({ data, index, isActive }) {
  const { title, achievements } = data

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <DotsPattern />
      <FloatingShapes />
      <ParticleBackground color="#f59e0b" isActive={isActive} />
      
      {/* 背景装饰图标 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 text-9xl animate-float">🏆</div>
        <div className="absolute bottom-10 left-10 text-9xl animate-float-delayed">⭐</div>
        <div className="absolute top-1/2 right-20 text-7xl animate-float" style={{ animationDelay: '2s' }}>🎖️</div>
      </div>

      {/* 装饰性SVG */}
      <div className="absolute top-20 left-20 w-40 h-40 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="3" className="text-yellow-400">
            <animate attributeName="stroke-dasharray" values="0 502;251 251;0 502" dur="5s" repeatCount="indefinite" />
          </circle>
          <polygon points="100,40 120,80 160,80 130,110 140,150 100,130 60,150 70,110 40,80 80,80" fill="currentColor" className="text-orange-400" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;360 100 100"
              dur="15s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>

      <div className={`text-center mb-10 transform transition-all duration-1000 relative z-10 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <span className="text-5xl mr-3">🏅</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-5 relative z-10">
        {achievements.map((achievement, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-6 transform transition-all duration-1000 relative overflow-hidden group ${
              isActive ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: `${300 + idx * 200}ms` }}
          >
            {/* 卡片渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* 光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-start space-x-5 relative z-10">
              <div className="relative">
                <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {achievement.icon}
                </div>
                {/* 图标光晕 */}
                <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{achievement.desc}</p>
              </div>
              
              {/* 装饰性对勾 */}
              <div className="opacity-20 group-hover:opacity-40 transition-opacity">
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" className="text-green-400" />
                  <path d="M30,50 L45,65 L70,35" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-green-500" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementPage
