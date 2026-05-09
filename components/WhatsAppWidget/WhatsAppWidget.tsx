'use client'

import { useState, useEffect } from 'react'

interface WhatsAppWidgetProps {
  phoneNumber: string
  message?: string
  welcomeMessage?: string
}

export default function WhatsAppWidget({
  phoneNumber,
  message = 'Hello! I am interested in your Laos travel packages. Could you please help me?',
  welcomeMessage = '👋 Sabaidee! How can we help you plan your Laos adventure?',
}: WhatsAppWidgetProps) {
  const [visible, setVisible] = useState(false)
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const buttonTimer = setTimeout(() => setVisible(true), 1500)
    const bubbleTimer = setTimeout(() => setBubbleVisible(true), 2500)
    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(bubbleTimer)
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setNavOpen(document.body.classList.contains('nav-open'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`

  const showBubble = bubbleVisible && !bubbleDismissed

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', opacity: navOpen ? 0 : 1, pointerEvents: navOpen ? 'none' : 'auto', transition: 'opacity 0.25s ease' }}>
      {/* Welcome message bubble */}
      <div
        style={{
          maxWidth: '220px',
          backgroundColor: '#fff',
          borderRadius: '12px 12px 0 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          padding: '10px 14px',
          fontSize: '14px',
          lineHeight: '1.4',
          color: '#111',
          position: 'relative',
          opacity: showBubble ? 1 : 0,
          transform: showBubble ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: showBubble ? 'auto' : 'none',
        }}
      >
        {welcomeMessage}
        <button
          onClick={() => setBubbleDismissed(true)}
          aria-label="Dismiss"
          style={{
            position: 'absolute',
            top: '4px',
            right: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#999',
            lineHeight: 1,
            padding: '0 2px',
          }}
        >
          ✕
        </button>
      </div>

      {/* WhatsApp button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => setBubbleDismissed(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.37.632 4.694 1.832 6.732L2.667 29.333l6.8-1.78A13.28 13.28 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24.267a11.02 11.02 0 01-5.618-1.537l-.402-.24-4.033 1.056 1.073-3.928-.263-.415A10.988 10.988 0 015.001 16c0-6.075 4.926-11 11.002-11C22.075 5 27 9.925 27 16c0 6.074-4.925 11-10.997 11zm6.035-8.232c-.33-.166-1.953-.963-2.255-1.073-.303-.11-.524-.166-.744.165-.22.33-.855 1.073-1.048 1.293-.193.22-.386.248-.716.083-.33-.166-1.393-.513-2.653-1.636-.98-.874-1.642-1.953-1.834-2.283-.193-.33-.02-.51.145-.674.149-.148.33-.386.496-.579.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.579-.083-.165-.744-1.793-1.02-2.455-.268-.644-.54-.557-.744-.567l-.634-.011c-.22 0-.579.083-.882.413-.303.33-1.158 1.132-1.158 2.76s1.185 3.203 1.35 3.423c.165.22 2.33 3.56 5.649 4.993.79.34 1.406.543 1.886.695.793.252 1.515.216 2.085.131.636-.095 1.953-.799 2.228-1.57.275-.771.275-1.433.193-1.57-.083-.138-.303-.22-.634-.386z" />
        </svg>
      </a>
    </div>
  )
}
