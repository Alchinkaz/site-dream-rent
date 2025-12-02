"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, RotateCcw, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DatePickerDropdown } from "@/components/date-picker-dropdown"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface FiltersProps {
  onFiltersChange: (filters: any) => void
}

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: string[]
}

function CustomSelect({ value, onValueChange, placeholder, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-14 text-gray-900 font-medium px-6 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto bg-white">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onValueChange(option)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function MotorcycleFilters({ onFiltersChange }: FiltersProps) {
  const [date, setDate] = useState<Date>()
  const [brand, setBrand] = useState<string>("")
  const [volume, setVolume] = useState<string>("")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const brands = ["Все", "SAMURAI", "M8", "MAXI", "MAXI SPORT", "Honda Dio", "Hornet"]

  const volumes = ["Все", "50-400 см³"]

  const resetFilters = () => {
    setDate(undefined)
    setBrand("")
    setVolume("")
    onFiltersChange({})
  }

  const handleSearch = () => {
    onFiltersChange({
      date,
      brand: brand === "Все" ? "" : brand,
      volume: volume === "Все" ? "" : volume,
    })
  }

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate)
  }

  return (
    <div className="relative">
      <div className="backdrop-blur-sm border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white/95 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="font-rubik font-bold text-2xl lg:text-3xl text-gray-900 leading-tight text-center sm:text-left w-full sm:w-auto">
            Выбери мопед на нужные даты
          </h2>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-gray-700 hover:text-red-600 flex items-center space-x-2 self-center sm:self-center flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
          >
            <span className="text-sm sm:text-base">СБРОСИТЬ ФИЛЬТР</span>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-cols-fr">
          <div className="relative">
            <Button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="text-gray-900 font-medium border border-gray-300 bg-white hover:bg-gray-50 justify-start text-left h-14 w-full"
            >
              <Calendar className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <div className="text-xs text-gray-500 uppercase">Дата получения</div>
                <div className="text-sm">{date ? format(date, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}</div>
              </div>
            </Button>

            <DatePickerDropdown
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onSelect={(selectedDate) => {
                setDate(selectedDate)
                setIsDatePickerOpen(false)
              }}
              selected={date}
            />
          </div>

          <CustomSelect value={brand} onValueChange={setBrand} placeholder="Модель" options={brands} />

          <CustomSelect value={volume} onValueChange={setVolume} placeholder="Объем" options={volumes} />

          <Button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white h-14 font-rubik font-bold text-lg w-full"
          >
            Подобрать
          </Button>
        </div>
      </div>
    </div>
  )
}
