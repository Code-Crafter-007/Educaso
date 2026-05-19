import React, { useEffect, useRef } from 'react'

const MessageIcon = ({ count = 0 }) => {
  const svgRef = useRef(null)

  const popIcon = () => {
    const svg = svgRef.current
    if (!svg) return
    svg.style.animation = 'none'
    svg.offsetHeight
    svg.style.animation = 'msg-pop 0.5s ease-out'
    svg.addEventListener('animationend', () => {
      svg.style.animation = ''
    }, { once: true })
  }

  useEffect(() => {
    popIcon()
  }, [count])

  return (
    <div className="msg-wrapper">
      <button
        className="icon-btn"
        onClick={popIcon}
        aria-label={count ? `${count} messages` : 'Messages'}
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {count === 1 && <span className="msg-dot" />}
      {count > 1 && <span className="msg-badge">{count}</span>}
    </div>
  )
}

export default MessageIcon