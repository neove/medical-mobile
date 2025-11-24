import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const isReportPage = location.pathname === '/report' || 
                       location.pathname === '/report-v2' || 
                       location.pathname === '/report-v3' ||
                       location.pathname === '/report-v4' ||
                       location.pathname === '/report-v5' ||
                       location.pathname === '/report-v6' ||
                       location.pathname === '/report-v7' ||
                       location.pathname === '/report-v8'

  // 报告页面不需要布局容器，直接全屏显示
  if (isReportPage) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

