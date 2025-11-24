import CoverPage from '../components/report/CoverPage'
import StatsPage from '../components/report/StatsPage'
import ChartPage from '../components/report/ChartPage'
import PieChartPage from '../components/report/PieChartPage'
import LineChartPage from '../components/report/LineChartPage'
import AchievementPage from '../components/report/AchievementPage'
import TimePage from '../components/report/TimePage'
import EndPage from '../components/report/EndPage'

// 假数据
export const reportData = {
  doctor: {
    name: '张医生',
    department: '心内科',
    avatar: '👨‍⚕️',
    year: 2024
  },
  stats: {
    totalPatients: 2847,
    totalHours: 1860,
    totalSurgeries: 156,
    satisfaction: 98.5,
    emergencyCases: 89
  },
  pages: [
    {
      component: CoverPage,
      data: {
        doctorName: '张医生',
        department: '心内科',
        year: 2024
      }
    },
    {
      component: StatsPage,
      data: {
        title: '年度工作统计',
        subtitle: '2024年度工作总结',
        stats: [
          { label: '服务患者', value: 2847, unit: '人', icon: '👥', color: 'blue' },
          { label: '工作时长', value: 1860, unit: '小时', icon: '⏰', color: 'green' },
          { label: '手术台次', value: 156, unit: '台', icon: '⚕️', color: 'purple' },
          { label: '患者满意度', value: 98.5, unit: '%', icon: '⭐', color: 'yellow' }
        ]
      }
    },
    {
      component: ChartPage,
      data: {
        title: '月度服务趋势',
        subtitle: '每月服务患者数量',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        values: [198, 203, 245, 267, 289, 312, 298, 315, 287, 301, 278, 254]
      }
    },
    {
      component: LineChartPage,
      data: {
        title: '门诊与手术趋势',
        subtitle: '月度工作量对比',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        values: [198, 203, 245, 267, 289, 312, 298, 315, 287, 301, 278, 254],
        values2: [12, 15, 18, 14, 16, 20, 19, 22, 17, 21, 18, 16]
      }
    },
    {
      component: PieChartPage,
      data: {
        title: '工作时间分布',
        subtitle: '各类工作占比分析',
        breakdown: [
          { label: '门诊', hours: 720, percentage: 39 },
          { label: '手术', hours: 480, percentage: 26 },
          { label: '查房', hours: 360, percentage: 19 },
          { label: '学习', hours: 300, percentage: 16 }
        ]
      }
    },
    {
      component: AchievementPage,
      data: {
        title: '年度成就',
        achievements: [
          { title: '优秀医生', desc: '连续3年获得优秀医生称号', icon: '🏆', color: 'yellow' },
          { title: '患者满意度', desc: '满意度达到98.5%', icon: '⭐', color: 'orange' },
          { title: '紧急救治', desc: '成功救治89例急危重症', icon: '🚑', color: 'red' },
          { title: '学术研究', desc: '发表论文5篇，参与课题3项', icon: '📚', color: 'blue' }
        ]
      }
    },
    {
      component: TimePage,
      data: {
        title: '时间记录',
        subtitle: '2024年工作时光',
        totalHours: 1860,
        breakdown: [
          { label: '门诊', hours: 720, percentage: 39 },
          { label: '手术', hours: 480, percentage: 26 },
          { label: '查房', hours: 360, percentage: 19 },
          { label: '学习', hours: 300, percentage: 16 }
        ]
      }
    },
    {
      component: EndPage,
      data: {
        year: 2024
      }
    }
  ]
}
