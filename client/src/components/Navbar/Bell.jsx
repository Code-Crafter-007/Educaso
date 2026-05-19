import React, { useEffect, useRef } from 'react'

const Bell = ({ count = 0 }) => {
  const svgRef = useRef(null)

  const ringBell = () => {
    const svg = svgRef.current
    if (!svg) return
    svg.style.animation = 'none'
    svg.offsetHeight
    svg.style.animation = 'bell-ring 0.6s ease-out'
    svg.addEventListener('animationend', () => {
      svg.style.animation = ''
    }, { once: true })
  }

  useEffect(() => {
    ringBell()
  }, [count])

  return (
    <div className="bell-wrapper">
      <button
        className="icon-btn"
        onClick={ringBell}
        aria-label={count ? `${count} notifications` : 'Notifications'}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      {count === 1 && <span className="bell-dot" />}
      {count > 1 && <span className="bell-badge">{count}</span>}
    </div>
  )
}

export default Bell