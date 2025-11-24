import { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { GridPattern, DotsPattern } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function LineChartPage({ data, index, isActive }) {
  const { title, subtitle, months, values, values2 } = data
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
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '15%',
      containLabel: true
    },
    legend: {
      data: ['门诊量', '手术量'],
      top: '5%',
      textStyle: {
        fontSize: 12,
        color: '#666'
      }
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        rotate: 45,
        fontSize: 10,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '门诊量',
        type: 'line',
        smooth: true,
        data: values,
        itemStyle: {
          color: '#667eea'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
            ]
          }
        },
        animationDelay: (idx) => idx * 30
      },
      {
        name: '手术量',
        type: 'line',
        smooth: true,
        data: values2,
        itemStyle: {
          color: '#f093fb'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(240, 147, 251, 0.3)' },
              { offset: 1, color: 'rgba(240, 147, 251, 0.05)' }
            ]
          }
        },
        animationDelay: (idx) => idx * 30 + 100
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <GridPattern />
      <ParticleBackground color="#f093fb" isActive={isActive} />
      
      {/* 装饰性SVG */}
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M100,20 Q180,100 100,180 Q20,100 100,20" fill="none" stroke="currentColor" strokeWidth="3" className="text-pink-400">
            <animate attributeName="stroke-dasharray" values="0 502;251 251;0 502" dur="6s" repeatCount="indefinite" />
          </path>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400" opacity="0.5">
            <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className={`text-center mb-6 transform transition-all duration-1000 relative z-10 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <span className="text-5xl mr-3">📈</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl border border-pink-100 p-6 transform transition-all duration-1000 delay-300 relative z-10 group ${
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {/* 卡片光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <ReactECharts
            ref={chartRef}
            option={option}
            style={{ height: '300px', width: '100%' }}
            opts={{ renderer: 'svg' }}
            notMerge={true}
            lazyUpdate={false}
          />
        </div>
      </div>
    </div>
  )
}

export default LineChartPage
