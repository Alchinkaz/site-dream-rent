"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Calendar, Gauge, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DatePickerDropdown } from "@/components/date-picker-dropdown"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { motorcycleData } from "@/lib/motorcycles-data"
import { formatPrice } from "@/lib/price-utils"

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
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

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 text-gray-900 font-medium px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto bg-white">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const similarMotorcycles = [
  {
    id: "yamaha-r1-2015",
    name: "YAMAHA R1",
    year: 2015,
    price: 25000,
    image: "/placeholder.svg?height=300&width=400",
    power: "300 км/ч",
    volume: "1000 см",
    available: true,
  },
  {
    id: "bmw-s1000rr-2021",
    name: "BMW S 1000RR",
    year: 2021,
    price: 24000,
    image: "/placeholder.svg?height=300&width=400",
    power: "299 км/ч",
    volume: "1000 см",
    available: true,
  },
  {
    id: "kawasaki-ninja-650-2021",
    name: "KAWASAKI NINJA 650",
    year: 2021,
    price: 12000,
    image: "/placeholder.svg?height=300&width=400",
    power: "200 км/ч",
    volume: "650 см",
    available: true,
  },
  {
    id: "samurai",
    name: "SAMURAI",
    year: 2024,
    price: 6500,
    image: "/placeholder.svg?height=300&width=400",
    power: "90 км/ч",
    volume: "150 см³",
    available: true,
  },
  {
    id: "m8",
    name: "M8",
    year: 2024,
    price: 5500,
    image: "/placeholder.svg?height=300&width=400",
    power: "95 км/ч",
    volume: "150 см³",
    available: true,
  },
  {
    id: "maxi",
    name: "MAXI",
    year: 2024,
    price: 6000,
    image: "/placeholder.svg?height=300&width=400",
    power: "85 км/ч",
    volume: "150 см³",
    available: true,
  },
]

export default function ScootPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTariff, setSelectedTariff] = useState("")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const motorcycle = motorcycleData[params.id as keyof typeof motorcycleData]

  if (!motorcycle) {
    return <div>Мотоцикл не найден</div>
  }

  const tariffOptions = Object.entries(motorcycle.pricing).map(([key, tariff]) => ({
    value: key,
    label: `${tariff.time} - ${formatPrice(tariff.price)} ₸`,
  }))

  const timeOptions = Array.from({ length: 11 }, (_, i) => {
    const hour = (10 + i).toString().padStart(2, "0")
    return { value: `${hour}:00`, label: `${hour}:00` }
  })

  const handleBooking = () => {
    if (startDate && selectedTime && selectedTariff) {
      // Format date as YYYY-MM-DD using local timezone to preserve the exact date user selected
      const year = startDate.getFullYear()
      const month = String(startDate.getMonth() + 1).padStart(2, "0")
      const day = String(startDate.getDate()).padStart(2, "0")
      const localDateStr = `${year}-${month}-${day}`

      const queryParams = new URLSearchParams({
        motorcycleId: params.id,
        date: localDateStr,
        time: selectedTime,
        tariff: selectedTariff,
      })
      window.location.href = `/scoots/booking?${queryParams.toString()}`
    } else {
      alert("Пожалуйста, выберите все необходимые данные для бронирования")
    }
  }

  const handleDateSelect = (selectedDate: Date) => {
    setStartDate(selectedDate)
  }

  return (
    <div className="min-h-screen py-8 bg-white pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {/* Removed back button from detail page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - scrollable */}
          <div>
            {/* Images */}
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image
                  src={motorcycle.images[selectedImage] || "/placeholder.svg"}
                  alt={`${motorcycle.name} ${motorcycle.year}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {motorcycle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${motorcycle.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-700 leading-relaxed">{motorcycle.description}</p>
              </div>
            </div>
          </div>

          {/* Right column - sticky */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="mb-6">
              <h1 className="font-rubik font-bold text-3xl text-gray-900 mb-3">{motorcycle.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Gauge className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{motorcycle.speed}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{motorcycle.volume}</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-gray-700 text-sm mb-2">Дата получения</Label>
                    <div className="relative">
                      <Button
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className="w-full justify-start border border-gray-300 bg-white hover:bg-gray-50 h-12 text-gray-900"
                      >
                        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                        {startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : "Дата"}
                      </Button>

                      {isDatePickerOpen && (
                        <DatePickerDropdown
                          isOpen={isDatePickerOpen}
                          onClose={() => setIsDatePickerOpen(false)}
                          onSelect={(selectedDate) => {
                            setStartDate(selectedDate)
                            setIsDatePickerOpen(false)
                          }}
                          selected={startDate}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="block text-gray-700 text-sm mb-2">Время получения</Label>
                    <CustomSelect
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      placeholder="Время"
                      options={timeOptions}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-gray-700 text-sm mb-2">Выберите тариф</Label>
                  <CustomSelect
                    value={selectedTariff}
                    onValueChange={setSelectedTariff}
                    placeholder="Выберите тариф"
                    options={tariffOptions}
                  />
                </div>

                <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Страховка:</span>
                    <span className="text-gray-900">
                      {motorcycle.insurance ? formatPrice(motorcycle.insurance) + " ₸" : "включена"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Шлем:</span>
                    <span className="text-gray-900">{motorcycle.helmet}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Итого:</span>
                    <span className="text-gray-900">
                      {selectedTariff
                        ? formatPrice(
                            motorcycle.pricing[selectedTariff as keyof typeof motorcycle.pricing].price +
                              (motorcycle.insurance || 0),
                          )
                        : formatPrice(motorcycle.insurance || 0)}{" "}
                      ₸
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg h-12"
                  onClick={handleBooking}
                >
                  Забронировать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/77079549722"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{
            animation: "gentle-glow 3s ease-in-out infinite",
          }}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </a>
      </div>

      <style jsx>{`
        @keyframes gentle-glow {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 8px rgba(34, 197, 94, 0.1);
          }
        }
      `}</style>
    </div>
  )
}
