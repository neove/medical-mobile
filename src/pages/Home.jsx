import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto w-full h-[100vh] overflow-y-auto">
        <p className="text-gray-600 text-center mb-8">请选择报告风格</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 风格一：星际航行 */}
          <Link
            to="/report"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#050510]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px]"></div>
            
            <div className="relative p-8 text-white">
              <div className="text-3xl mb-4 animate-bounce">🚀</div>
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">
                风格一：星际航行
              </h2>
              <p className="text-cyan-100/70 text-sm mb-4">
                网易云叙事、科幻视觉、沉浸体验
              </p>
              <div className="flex items-center text-sm text-cyan-400">
                <span>立即启航</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格二：黑金商务 */}
          <Link
            to="/report-v2"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#0f172a]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black opacity-90"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
            
            <div className="relative p-8 text-white">
              <div className="text-3xl mb-4">⚖️</div>
              <h2 className="text-2xl font-bold mb-2 text-amber-500">风格二：黑金商务</h2>
              <p className="text-slate-400 text-sm mb-4">
                高端深色、流光金、臻致质感
              </p>
              <div className="flex items-center text-sm text-amber-500">
                <span>审阅报告</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格三：智慧洞察 */}
          <Link
            to="/report-v3"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-slate-50"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl transition-all group-hover:bg-blue-500/20"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative p-8 text-slate-900">
              <div className="text-3xl mb-4 group-hover:-translate-y-1 transition-transform">💡</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                风格三：智慧洞察
              </h2>
              <p className="text-slate-500 text-sm mb-4">
                App年度账单风、卡片设计、数据可视化
              </p>
              <div className="flex items-center text-sm text-blue-600 font-bold">
                <span>探索数据</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格四：沉浸式听歌报告风格 */}
          <Link
            to="/report-v4"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-green-600"></div>
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-colors"></div>
            <div className="relative p-8 text-white">
              <div className="text-3xl mb-4">🎵</div>
              <h2 className="text-2xl font-bold mb-2">风格四：沉浸式</h2>
              <p className="text-teal-100 text-sm mb-4">
                听歌报告风格、时间轴、分享卡片
              </p>
              <div className="flex items-center text-sm">
                <span>查看详情</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
          {/* 风格五：极简白金风格 */}
          <Link
            to="/report-v5"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200"></div>
            <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-colors"></div>
            <div className="relative p-8 text-gray-800">
              <div className="text-3xl mb-4">🏛️</div>
              <h2 className="text-2xl font-bold mb-2">风格五：极简白金</h2>
              <p className="text-gray-600 text-sm mb-4">
                杂志排版、优雅留白、高端质感
              </p>
              <div className="flex items-center text-sm">
                <span>查看详情</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
          {/* 风格六：深邃微光 */}
          <Link
            to="/report-v6"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative p-8 text-white font-serif">
              <div className="text-3xl mb-4">🌑</div>
              <h2 className="text-2xl font-bold mb-2 text-white/90">
                风格六：深邃微光
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                极致黑金、流体光效、电影叙事
              </p>
              <div className="flex items-center text-sm text-indigo-300">
                <span>沉浸体验</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格七：水墨国风 */}
          <Link
            to="/report-v7"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#fcfaf2]"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1517842360893-2838930b1358?w=1080&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-stone-800 rounded-tr-2xl opacity-20"></div>
            <div className="relative p-8 text-stone-800">
              <div className="text-3xl mb-4 font-serif">🏔️</div>
              <h2 className="text-2xl font-bold mb-2 font-serif">
                风格七：水墨国风
              </h2>
              <p className="text-stone-500 text-sm mb-4 font-serif">
                竖排版式、宣纸质感、印章元素
              </p>
              <div className="flex items-center text-sm text-red-800 font-serif">
                <span>展卷阅览</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
          {/* 风格八：极光玻璃 */}
          <Link
            to="/report-v8"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#0f172a]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-cyan-600/30 animate-pulse"></div>
            <div className="absolute inset-0 backdrop-blur-[1px]"></div>
            
            <div className="relative p-8 text-white">
              <div className="text-3xl mb-4 animate-float">💎</div>
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200">
                风格八：极光玻璃
              </h2>
              <p className="text-blue-200/70 text-sm mb-4">
                极光渐变、磨砂玻璃质感、悬浮3D
              </p>
              <div className="flex items-center text-sm text-cyan-300">
                <span>进入体验</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格九：时光胶囊 */}
          <Link
            to="/report-v9"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#4f6d7a]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/80 via-orange-300/80 to-yellow-200/80 opacity-90 transition-opacity group-hover:opacity-100"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
            
            <div className="relative p-8 text-white">
              <div className="text-3xl mb-4">💊</div>
              <h2 className="text-2xl font-bold mb-2 font-serif">
                风格九：时光胶囊
              </h2>
              <p className="text-white/90 text-sm mb-4 font-serif">
                网易云风格、叙事文案、治愈插画
              </p>
              <div className="flex items-center text-sm text-white font-bold">
                <span>开启回忆</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* 风格十：手绘手账 */}
          <Link
            to="/report-v10"
            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#fffdf0]"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            <div className="relative p-8 text-stone-700 font-mono">
              <div className="text-3xl mb-4 rotate-12">✏️</div>
              <h2 className="text-2xl font-bold mb-2">
                风格十：手绘手账
              </h2>
              <p className="text-stone-500 text-sm mb-4">
                涂鸦风格、纸张质感、随笔记录
              </p>
              <div className="flex items-center text-sm text-stone-800 font-bold">
                <span className="underline decoration-wavy decoration-yellow-400">翻阅手账</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
