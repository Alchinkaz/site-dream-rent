"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Gauge, Fuel, Calendar, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DatePickerDropdown } from "@/components/date-picker-dropdown"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { carsData } from "@/lib/cars-data"
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
        className="w-full h-12 text-white font-medium px-4 rounded-lg border border-gray-700 bg-[#1a1a1f] hover:bg-[#252529] transition-colors flex items-center justify-between"
      >
        <span className={selectedOption ? "text-white" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto bg-[#1a1a1f]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const carId = (params?.id as string) || ""

  const [selectedImage, setSelectedImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTariff, setSelectedTariff] = useState("")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!isGalleryOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsGalleryOpen(false)
      } else if (e.key === "ArrowLeft") {
        handlePrevImage()
      } else if (e.key === "ArrowRight") {
        handleNextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isGalleryOpen, galleryIndex])

  const car = carId ? carsData[carId as keyof typeof carsData] : null

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Автомобиль не найден</h1>
          <a href="/cars" className="text-[#fdd400] hover:text-[#f5c900]">
            Вернуться к каталогу
          </a>
        </div>
      </div>
    )
  }

  const tariffOptions = Object.entries(car.pricing).map(([key, tariff]) => ({
    value: key,
    label: `${tariff.time} - ${formatPrice(tariff.price)} ₸`,
  }))

  const timeOptions = Array.from({ length: 11 }, (_, i) => {
    const hour = (10 + i).toString().padStart(2, "0")
    return { value: `${hour}:00`, label: `${hour}:00` }
  })

  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setIsGalleryOpen(true)
  }

  const handlePrevImage = () => {
    setGalleryIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setGalleryIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

  const handleBooking = () => {
    if (startDate && selectedTime && selectedTariff) {
      const year = startDate.getFullYear()
      const month = String(startDate.getMonth() + 1).padStart(2, "0")
      const day = String(startDate.getDate()).padStart(2, "0")
      const localDateStr = `${year}-${month}-${day}`

      const bookingData = {
        carId: carId,
        date: localDateStr,
        time: selectedTime,
        tariff: selectedTariff,
      }
      localStorage.setItem("carBookingData", JSON.stringify(bookingData))

      router.push("/booking")
    } else {
      alert("Пожалуйста, выберите все необходимые данные для бронирования")
    }
  }

  const selectedTariffData = selectedTariff ? car.pricing[selectedTariff as keyof typeof car.pricing] : null
  const rentalPrice = selectedTariffData ? selectedTariffData.price : 0
  const insurancePrice = car.insurance || 0
  const totalPrice = rentalPrice + insurancePrice

  return (
    <div className="min-h-screen py-8 bg-[#0f0f12] pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div>
              <button
                onClick={() => openGallery(selectedImage)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 w-full cursor-pointer hover:opacity-95 transition-opacity"
              >
                <Image
                  src={car.images[selectedImage] || "/placeholder.svg"}
                  alt={`${car.name} ${car.year}`}
                  fill
                  className="object-cover"
                />
              </button>

              {car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-[#fdd400]" : "border-gray-700"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${car.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <p className="text-gray-400 leading-relaxed">{car.description}</p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#fdd400] text-black text-xs px-2 py-1 rounded">{car.category}</span>
                <span className="text-gray-500 text-sm">{car.year}</span>
              </div>
              <h1 className="font-rubik font-bold text-3xl text-white mb-3">{car.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Gauge className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-300">{car.power}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Fuel className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-300">{car.volume}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 border border-gray-800 bg-[#1a1a1f] shadow-sm">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-gray-400 text-sm mb-2">Дата получения</Label>
                    <div className="relative">
                      <Button
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className="w-full justify-start border border-gray-700 bg-[#1a1a1f] hover:bg-[#252529] h-12 text-white"
                      >
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
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
                    <Label className="block text-gray-400 text-sm mb-2">Время получения</Label>
                    <CustomSelect
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      placeholder="Время"
                      options={timeOptions}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-gray-400 text-sm mb-2">Выберите тариф</Label>
                  <CustomSelect
                    value={selectedTariff}
                    onValueChange={setSelectedTariff}
                    placeholder="Выберите тариф"
                    options={tariffOptions}
                  />
                </div>

                <div className="rounded-lg p-4 bg-[#0f0f12] border border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Страховка:</span>
                    <span className="text-white">{car.insurance ? formatPrice(car.insurance) + " ₸" : "включена"}</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Итого:</span>
                    <span className="text-white">{formatPrice(totalPrice)} ₸</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#fdd400] hover:bg-[#f5c900] text-black font-bold text-lg h-12"
                  onClick={handleBooking}
                >
                  Забронировать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsGalleryOpen(false)}
        >
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 z-[110] text-white hover:text-[#fdd400] transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {car.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
              className="absolute left-4 z-[110] text-white hover:text-[#fdd400] transition-colors p-2"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
              <Image
                src={car.images[galleryIndex] || "/placeholder.svg"}
                alt={`${car.name} ${galleryIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {car.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
              className="absolute right-4 z-[110] text-white hover:text-[#fdd400] transition-colors p-2"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[110] text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {galleryIndex + 1} / {car.images.length}
          </div>
        </div>
      )}

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
          0%,
          100% {
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
