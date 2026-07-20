import { useState, useEffect, useCallback } from 'react'

export default function Typewriter({ texts, speed = 80, pause = 3000 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const fullText = texts[currentTextIndex]

    if (!isDeleting) {
      setCurrentText(fullText.substring(0, currentText.length + 1))

      if (currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pause)
        return
      }
    } else {
      setCurrentText(fullText.substring(0, currentText.length - 1))

      if (currentText === '') {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        return
      }
    }
  }, [currentText, currentTextIndex, isDeleting, texts, pause])

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, speed])

  return (
    <span className="text-gradient">
      {currentText}
      <span className="animate-pulse text-iam-blue">|</span>
    </span>
  )
}
