import { useEffect, useRef } from 'react'

// Canvas粒子动画背景
export const ParticleBackground = ({ color = '#667eea', isActive = false }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = color
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 创建粒子
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制连线
      particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.strokeStyle = color
            ctx.globalAlpha = (120 - distance) / 120 * 0.2
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive, color])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1s' }}
    />
  )
}

// 渐变波纹背景
export const RippleBackground = ({ colors = ['#667eea', '#764ba2'], isActive = false }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let ripples = []
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    class Ripple {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = 0
        this.maxRadius = Math.random() * 200 + 100
        this.speed = Math.random() * 2 + 1
        this.opacity = 0.3
      }

      update() {
        this.radius += this.speed
        this.opacity = Math.max(0, this.opacity - 0.01)

        if (this.radius > this.maxRadius || this.opacity <= 0) {
          this.radius = 0
          this.opacity = 0.3
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        gradient.addColorStop(0, colors[0] + '40')
        gradient.addColorStop(1, colors[1] + '00')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 创建波纹
    for (let i = 0; i < 3; i++) {
      ripples.push(new Ripple())
    }

    const animate = () => {
      time += 0.01
      ctx.fillStyle = `rgba(255, 255, 255, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ripples.forEach(ripple => {
        ripple.update()
        ripple.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive, colors])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1s' }}
    />
  )
}

