import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">页面未找到</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default NotFound

