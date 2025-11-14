"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, RotateCcw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
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
        className="w-full h-14 text-white font-medium px-6 rounded-lg border transition-colors flex items-center justify-between"
        style={{
          backgroundColor: "#1a1a1b",
          borderColor: "#2a2a2b",
          ":hover": { backgroundColor: "#2a2a2b" },
        }}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          style={{
            backgroundColor: "#0f0f10",
            borderColor: "#1a1a1b",
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onValueChange(option)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              style={{ ":hover": { backgroundColor: "#1a1a1b" } }}
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
  const [category, setCategory] = useState<string>("")
  const [volume, setVolume] = useState<string>("")

  const brands = ["Все", "BMW", "Ducati", "Harley Davidson", "Honda", "Indian", "Kawasaki", "KTM", "Suzuki", "Yamaha"]

  const categories = ["Все", "Спортбайк", "Скутер", "Круизеры", "Классик", "Турист", "Стрит / Нейкед"]

  const volumes = ["Все", "1000+ см", "500-900 см", "50-400 см"]

  const resetFilters = () => {
    setDate(undefined)
    setBrand("")
    setCategory("")
    setVolume("")
    onFiltersChange({})
  }

  const handleSearch = () => {
    onFiltersChange({
      date,
      brand: brand === "Все" ? "" : brand,
      category: category === "Все" ? "" : category,
      volume: volume === "Все" ? "" : volume,
    })
  }

  return (
    <div className="relative">
      <div
        className="backdrop-blur-sm border rounded-2xl p-6 lg:p-8"
        style={{
          backgroundColor: "rgba(15, 15, 16, 0.5)",
          borderColor: "#1a1a1b",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="font-rubik font-bold text-2xl lg:text-3xl text-white leading-tight">
            Выбери мотоцикл на нужные даты
          </h2>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-white hover:text-red-600 flex items-center space-x-2 self-start sm:self-center flex-shrink-0"
          >
            <span className="text-sm sm:text-base">СБРОСИТЬ ФИЛЬТР</span>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="text-white font-medium border justify-start text-left h-14"
                style={{
                  backgroundColor: "#1a1a1b",
                  borderColor: "#2a2a2b",
                }}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-xs text-gray-400 uppercase">Дата получения</div>
                  <div className="text-sm">{date ? format(date, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border"
              style={{
                backgroundColor: "#0f0f10",
                borderColor: "#1a1a1b",
              }}
            >
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ru}
                weekStartsOn={1}
                className="text-white"
                style={{ backgroundColor: "#0f0f10" }}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-white",
                  caption_label: "text-sm font-medium text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-white hover:bg-gray-700 hover:text-white rounded-md",
                  day_selected:
                    "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white",
                  day_today: "bg-gray-700 text-white",
                  day_outside: "text-gray-500 opacity-50",
                  day_disabled: "text-gray-500 opacity-50",
                  day_range_middle: "aria-selected:bg-gray-700 aria-selected:text-white",
                  day_hidden: "invisible",
                }}
              />
            </PopoverContent>
          </Popover>

          <CustomSelect value={brand} onValueChange={setBrand} placeholder="Бренд" options={brands} />

          <CustomSelect value={category} onValueChange={setCategory} placeholder="Категория" options={categories} />

          <CustomSelect value={volume} onValueChange={setVolume} placeholder="Объем" options={volumes} />

          <Button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white h-14 font-rubik font-bold text-lg"
          >
            Подобрать
          </Button>
        </div>
      </div>
    </div>
  )
}
