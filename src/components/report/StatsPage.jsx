import { GridPattern, DotsPattern } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function StatsPage({ data, index, isActive }) {
  const { title, subtitle, stats } = data

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-100 to-blue-200',
    green: 'bg-gradient-to-br from-green-100 to-green-200',
    purple: 'bg-gradient-to-br from-purple-100 to-purple-200',
    yellow: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    orange: 'bg-gradient-to-br from-orange-100 to-orange-200',
    red: 'bg-gradient-to-br from-red-100 to-red-200'
  }

  const borderColors = {
    blue: 'border-blue-300',
    green: 'border-green-300',
    purple: 'border-purple-300',
    yellow: 'border-yellow-300',
    orange: 'border-orange-300',
    red: 'border-red-300'
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white via-blue-50 to-purple-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <GridPattern />
      <DotsPattern />
      <ParticleBackground color="#667eea" isActive={isActive} />
      
      {/* 装饰性SVG */}
      <div className="absolute top-10 right-10 w-40 h-40 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
            <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400">
            <animate attributeName="r" values="50;60;50" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className={`text-center mb-10 transform transition-all duration-1000 delay-200 relative z-10 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-3">
          <div className="relative">
            <span className="text-5xl mr-3">📋</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className="w-full max-w-sm space-y-5 relative z-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl shadow-xl border-2 ${borderColors[stat.color] || 'border-gray-200'} p-6 transform transition-all duration-1000 relative overflow-hidden group ${
              isActive ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
            style={{ transitionDelay: `${300 + idx * 200}ms` }}
          >
            {/* 卡片光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-5">
                <div className={`${colorClasses[stat.color] || 'bg-gray-100'} text-5xl p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-gray-600 text-sm mb-2 font-medium">{stat.label}</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {stat.value.toLocaleString()}
                    <span className="text-xl text-gray-500 ml-2 font-normal">{stat.unit}</span>
                  </div>
                </div>
              </div>
              
              {/* 装饰性图标 */}
              <div className="opacity-20 group-hover:opacity-40 transition-opacity">
                <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
                  <path d="M30,50 L45,65 L70,35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsPage
