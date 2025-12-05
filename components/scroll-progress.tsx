"use client"

import { useEffect, useState, useCallback } from "react"

// Создаем событие для сброса прогресс-бара
const resetScrollProgressEvent = new Event("resetScrollProgress")

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Функция обновления прогресс-бара
  const updateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = document.documentElement.scrollTop
    const progress = (scrollTop / scrollHeight) * 100
    setScrollProgress(progress)
  }, [])

  // Функция сброса прогресс-бара
  const resetProgress = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setScrollProgress(0)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress)
    window.addEventListener("resetScrollProgress", resetProgress)

    updateScrollProgress() // Инициализация при загрузке

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resetScrollProgress", resetProgress)
    }
  }, [updateScrollProgress, resetProgress])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60]">
      <div className="h-full" style={{ width: `${scrollProgress}%`, backgroundColor: "#DC2626" }}></div>
    </div>
  )
}

// Экспортируем функцию для сброса прогресс-бара, чтобы её можно было вызвать из других компонентов
export function resetScrollProgress() {
  window.dispatchEvent(resetScrollProgressEvent)
}
