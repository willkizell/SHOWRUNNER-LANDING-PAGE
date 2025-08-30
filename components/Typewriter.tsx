'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speedMs?: number
  pauseMs?: number
  loop?: boolean
  start?: boolean
  className?: string
}

export default function Typewriter({ 
  text, 
  speedMs = 50, 
  pauseMs = 1000, 
  loop = false, 
  start = true,
  className = '' 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showCaret, setShowCaret] = useState(true)

  useEffect(() => {
    if (!start) return

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeNextCharacter, speedMs)
      } else {
        setIsComplete(true)
        if (loop) {
          timeoutId = setTimeout(() => {
            setDisplayText('')
            setIsComplete(false)
            currentIndex = 0
            typeNextCharacter()
          }, pauseMs)
        } else {
          setShowCaret(false)
        }
      }
    }

    typeNextCharacter()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, speedMs, pauseMs, loop, start])

  return (
    <span className={className}>
      {displayText}
      {showCaret && (
        <span className="caret" />
      )}
    </span>
  )
}
