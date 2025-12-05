"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (date: Date) => void
  selected?: Date
}

export function DatePickerModal({ isOpen, onClose, onSelect, selected }: DatePickerModalProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  if (!isOpen) return null

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ]

  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(year, month, day)
    onSelect(selectedDate)
    onClose()
  }

  const renderCalendarDays = () => {
    const days = []

    // Previous month days
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="h-10 flex items-center justify-center text-gray-400">
          {daysInPrevMonth - i}
        </div>
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected = selected && 
        selected.getDate() === day && 
        selected.getMonth() === month && 
        selected.getFullYear() === year
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === month && 
        new Date().getFullYear() === year

      days.push(
        <button
          key={day}
          onClick={() => handleSelectDate(day)}
          className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? "bg-red-600 text-white hover:bg-red-700"
              : isToday
              ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
              : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      )
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div key={`next-${day}`} className="h-10 flex items-center justify-center text-gray-400">
          {day}
        </div>
      )
    }

    return days
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Navigation with centered month/year */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-rubik font-bold text-xl text-gray-900 min-w-max">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  )
}
