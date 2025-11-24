import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Report from './pages/Report'
import ReportV2 from './pages/ReportV2'
import ReportV3 from './pages/ReportV3'
import ReportV4 from './pages/ReportV4'
import ReportV5 from './pages/ReportV5'
import ReportV6 from './pages/ReportV6'
import ReportV7 from './pages/ReportV7'
import ReportV8 from './pages/ReportV8'
import ReportV9 from './pages/ReportV9'
import ReportV10 from './pages/ReportV10'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="report" element={<Report />} />
        <Route path="report-v2" element={<ReportV2 />} />
        <Route path="report-v3" element={<ReportV3 />} />
        <Route path="report-v4" element={<ReportV4 />} />
        <Route path="report-v5" element={<ReportV5 />} />
        <Route path="report-v6" element={<ReportV6 />} />
        <Route path="report-v7" element={<ReportV7 />} />
        <Route path="report-v8" element={<ReportV8 />} />
        <Route path="report-v9" element={<ReportV9 />} />
        <Route path="report-v10" element={<ReportV10 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

