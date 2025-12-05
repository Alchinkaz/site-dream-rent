'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (date: Date) => void
  selected?: Date
}

function getTodayInAlmaty(): Date {
  const now = new Date()
  // Get current time in GMT+5
  const almatyOffset = 5 * 60 // GMT+5 in minutes
  const localOffset = now.getTimezoneOffset() // Local offset in minutes (negative for east of GMT)
  const offsetDiff = almatyOffset + localOffset
  
  const almatyTime = new Date(now.getTime() + offsetDiff * 60 * 1000)
  // Set to start of day
  almatyTime.setHours(0, 0, 0, 0)
  return almatyTime
}

export function DatePickerDropdown({ isOpen, onClose, onSelect, selected }: DatePickerDropdownProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  const firstDay = new Date(year, month, 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const todayInAlmaty = getTodayInAlmaty()

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

  const isDateDisabled = (day: number): boolean => {
    const dateToCheck = new Date(year, month, day)
    dateToCheck.setHours(0, 0, 0, 0)
    return dateToCheck < todayInAlmaty
  }

  const renderCalendarDays = () => {
    const days = []

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className='h-8 flex items-center justify-center text-gray-300 text-sm'>
          {daysInPrevMonth - i}
        </div>
      )
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selected && 
        selected.getDate() === day && 
        selected.getMonth() === month && 
        selected.getFullYear() === year
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === month && 
        new Date().getFullYear() === year
      
      const disabled = isDateDisabled(day)

      days.push(
        <button
          key={day}
          onClick={() => !disabled && handleSelectDate(day)}
          disabled={disabled}
          className={`h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
            disabled
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
              ? 'bg-red-600 text-white hover:bg-red-700'
              : isToday
              ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              : 'text-gray-900 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      )
    }

    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div key={`next-${day}`} className='h-8 flex items-center justify-center text-gray-300 text-sm'>
          {day}
        </div>
      )
    }

    return days
  }

  return (
    <div
      ref={dropdownRef}
      className='absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-80'
      onClick={(e) => e.stopPropagation()}
    >
      {/* Navigation with centered month/year */}
      <div className='flex items-center justify-between gap-3 mb-4'>
        <button
          onClick={handlePrevMonth}
          className='p-1.5 hover:bg-gray-100 rounded transition-colors'
        >
          <ChevronLeft className='w-4 h-4 text-gray-600' />
        </button>
        <h3 className='font-rubik font-bold text-base text-gray-900 min-w-max'>
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={handleNextMonth}
          className='p-1.5 hover:bg-gray-100 rounded transition-colors'
        >
          <ChevronRight className='w-4 h-4 text-gray-600' />
        </button>
      </div>

      {/* Day names */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {dayNames.map((day) => (
          <div key={day} className='h-7 flex items-center justify-center text-xs font-semibold text-gray-500'>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className='grid grid-cols-7 gap-1'>
        {renderCalendarDays()}
      </div>
    </div>
  )
}
