import { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { GridPattern, DotsPattern, FloatingShapes } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function TimePage({ data, index, isActive }) {
  const { title, subtitle, totalHours, breakdown } = data
  const chartRef = useRef(null)

  useEffect(() => {
    if (isActive && chartRef.current) {
      setTimeout(() => {
        const chart = chartRef.current?.getEchartsInstance()
        if (chart) {
          chart.resize()
        }
      }, 100)
    }
  }, [isActive])

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: '{b}: {c}小时 ({d}%)'
    },
    series: [
      {
        name: '工作时间',
        type: 'pie',
        radius: '70%',
        center: ['50%', '60%'],
        data: breakdown.map((item, idx) => ({
          value: item.hours,
          name: item.label,
          itemStyle: {
            color: [
              '#667eea',
              '#764ba2',
              '#f093fb',
              '#4facfe'
            ][idx % 4]
          }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 12,
          color: '#666'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 100
      }
    ]
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <GridPattern />
      <DotsPattern />
      <FloatingShapes />
      <ParticleBackground color="#10b981" isActive={isActive} />
      
      {/* 装饰性SVG */}
      <div className="absolute top-24 right-24 w-28 h-28 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
            <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-400">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;360 100 100"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className={`text-center mb-6 transform transition-all duration-1000 relative z-10 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <span className="text-5xl mr-3">⏱️</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-green-100 p-6 transform transition-all duration-1000 delay-300 relative z-10 group ${
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {/* 卡片光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {totalHours}
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-sm"></div>
            </div>
            <div className="text-gray-600 font-medium">总工作时长（小时）</div>
          </div>

          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: '280px', width: '100%' }}
            opts={{ renderer: 'svg' }}
            notMerge={true}
            lazyUpdate={false}
          />
        </div>
      </div>
    </div>
  )
}

export default TimePage
