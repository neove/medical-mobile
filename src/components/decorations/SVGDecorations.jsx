// SVG装饰元素组件

export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute top-10 left-10 w-20 h-20 opacity-30 animate-float" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
          <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="25" fill="currentColor" className="text-blue-300" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      <svg className="absolute top-32 right-16 w-16 h-16 opacity-20 animate-float-delayed" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="currentColor" className="text-purple-400">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur="8s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>

      <svg className="absolute bottom-20 left-20 w-24 h-24 opacity-25 animate-float" viewBox="0 0 100 100">
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400" rx="8">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;-360 50 50"
            dur="10s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      <svg className="absolute bottom-32 right-12 w-18 h-18 opacity-30 animate-float-delayed" viewBox="0 0 100 100">
        <path d="M50,10 Q90,50 50,90 Q10,50 50,10" fill="currentColor" className="text-indigo-400" opacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

export const MedicalCross = ({ className = "w-16 h-16" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="20" width="20" height="60" rx="4" fill="currentColor" className="text-red-400" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="40" width="60" height="20" rx="4" fill="currentColor" className="text-red-400" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

export const Heartbeat = ({ className = "w-20 h-20" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20,50 L30,40 L40,50 L50,30 L60,50 L70,40 L80,50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-pink-400"
      >
        <animate
          attributeName="d"
          values="M20,50 L30,40 L40,50 L50,30 L60,50 L70,40 L80,50;M20,50 L30,45 L40,50 L50,25 L60,50 L70,45 L80,50;M20,50 L30,40 L40,50 L50,30 L60,50 L70,40 L80,50"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
      <circle cx="50" cy="30" r="3" fill="currentColor" className="text-red-500">
        <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export const WavePattern = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-blue-400"
        >
          <animate
            attributeName="d"
            values="M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z;M0,60 Q300,80 600,60 T1200,60 L1200,120 L0,120 Z;M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,80 Q300,60 600,80 T1200,80 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-purple-400"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            values="M0,80 Q300,100 600,80 T1200,80 L1200,120 L0,120 Z;M0,80 Q300,60 600,80 T1200,80 L1200,120 L0,120 Z;M0,80 Q300,100 600,80 T1200,80 L1200,120 L0,120 Z"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

export const GridPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-600" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export const DotsPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2" fill="currentColor" className="text-blue-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  )
}

