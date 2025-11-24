import { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { DotsPattern, FloatingShapes } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function PieChartPage({ data, index, isActive }) {
  const { title, subtitle, breakdown } = data
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
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle: {
        fontSize: 12,
        color: '#666'
      },
      itemGap: 15
    },
    series: [
      {
        name: '工作时间',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
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
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 100
      }
    ]
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <DotsPattern />
      <FloatingShapes />
      <ParticleBackground color="#f093fb" isActive={isActive} />
      
      {/* 装饰性SVG */}
      <div className="absolute top-20 left-20 w-36 h-36 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
            <animate attributeName="stroke-dasharray" values="0 502;251 251;0 502" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="currentColor" className="text-purple-400" opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.2;1"
              dur="3s"
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
            <span className="text-5xl mr-3">🥧</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 p-6 transform transition-all duration-1000 delay-300 relative z-10 group ${
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {/* 卡片光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: '350px', width: '100%' }}
            opts={{ renderer: 'svg' }}
            notMerge={true}
            lazyUpdate={false}
          />
        </div>
      </div>
    </div>
  )
}

export default PieChartPage
