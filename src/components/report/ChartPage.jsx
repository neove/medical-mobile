import { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { GridPattern, DotsPattern } from '../decorations/SVGDecorations'
import { ParticleBackground } from '../decorations/CanvasBackground'

function ChartPage({ data, index, isActive }) {
  const { title, subtitle, months, values } = data
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
      bottom: '20%',
      containLabel: true
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
        data: values,
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#764ba2' },
                { offset: 1, color: '#667eea' }
              ]
            }
          }
        },
        animationDelay: (idx) => idx * 50,
        animationDuration: 1000
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: (params) => {
        const param = params[0]
        return `${param.name}<br/>${param.seriesName}: ${param.value}人`
      }
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 背景装饰 */}
      <GridPattern />
      <ParticleBackground color="#764ba2" isActive={isActive} />
      
      {/* 装饰性几何图形 */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,20 180,80 180,120 100,180 20,120 20,80" fill="currentColor" className="text-purple-400">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;360 100 100"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>

      <div className={`text-center mb-6 transform transition-all duration-1000 relative z-10 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <span className="text-5xl mr-3">📊</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 p-6 transform transition-all duration-1000 delay-300 relative z-10 group ${
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {/* 卡片光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
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

export default ChartPage
