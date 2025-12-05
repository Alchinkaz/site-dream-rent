"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Calendar, ArrowRight, Gauge, Fuel } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DatePickerDropdown } from "@/components/date-picker-dropdown"
import { carsData } from "@/lib/cars-data"
import { formatPrice } from "@/lib/price-utils"

const availableCars = Object.entries(carsData).map(([id, car]) => ({
  id,
  name: car.name,
  price: car.pricing.day.price,
  image: car.images[0] || "/placeholder.svg?height=100&width=100",
  speed: car.speed,
  volume: car.volume,
}))

export default function SelectPage() {
  const router = useRouter()
  const [selectedCar, setSelectedCar] = useState<string | null>(null)
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isCarOpen, setIsCarOpen] = useState(false)
  const [isTariffOpen, setIsTariffOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const selectedCarData = selectedCar ? carsData[selectedCar as keyof typeof carsData] : null
  const selectedCarInfo = selectedCar ? availableCars.find((c) => c.id === selectedCar) : null

  const tariffs = selectedCarData?.pricing
    ? Object.entries(selectedCarData.pricing).map(([key, value]) => ({
        key,
        ...value,
      }))
    : []

  const selectedTariffData =
    selectedTariff && selectedCarData
      ? selectedCarData.pricing[selectedTariff as keyof typeof selectedCarData.pricing]
      : null

  const handleCarSelect = (carId: string) => {
    setSelectedCar(carId)
    setSelectedTariff(null)
    setIsCarOpen(false)
  }

  const handleTariffSelect = (tariffKey: string) => {
    setSelectedTariff(tariffKey)
    setIsTariffOpen(false)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsDatePickerOpen(false)
  }

  const handleNext = () => {
    if (!selectedCar || !selectedTariff || !selectedDate) return

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`

    // Save booking data to localStorage and redirect to /booking
    const bookingData = {
      carId: selectedCar,
      date: dateStr,
      time: "10:00",
      tariff: selectedTariff,
    }
    localStorage.setItem("carBookingData", JSON.stringify(bookingData))

    router.push("/booking")
  }

  const isFormComplete = selectedCar && selectedTariff && selectedDate

  return (
    <div className="min-h-screen bg-[#0f0f12] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/cars" className="mb-12">
          <img
            src="https://alchinkaz.github.io/db-dream-rent/cars/kaz-dream-cars.svg"
            alt="Kaz Dream Cars"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsCarOpen(!isCarOpen)}
              className="w-full px-4 py-4 rounded-xl border border-gray-700 bg-[#1a1a1f] text-left flex items-center justify-between hover:border-gray-600 transition-colors"
            >
              {selectedCarInfo ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                    <Image
                      src={selectedCarInfo.image || "/placeholder.svg"}
                      alt={selectedCarInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-white font-medium block">{selectedCarInfo.name}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        {selectedCarInfo.speed}
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel className="w-3 h-3" />
                        {selectedCarInfo.volume}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Выберите автомобиль</span>
              )}
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${isCarOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCarOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1f] border border-gray-700 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                {availableCars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarSelect(car.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-3 ${
                      selectedCar === car.id ? "bg-[#fdd400]/20" : ""
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 bg-gray-800">
                      <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium block ${selectedCar === car.id ? "text-[#fdd400]" : "text-white"}`}>
                        {car.name}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3" />
                          {car.speed}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3 h-3" />
                          {car.volume}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">от {formatPrice(car.price)} ₸</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedCar && (
            <div className="relative">
              <button
                onClick={() => setIsTariffOpen(!isTariffOpen)}
                className="w-full px-4 py-4 rounded-xl border border-gray-700 bg-[#1a1a1f] text-left flex items-center justify-between hover:border-gray-600 transition-colors"
              >
                <span className={selectedTariff ? "text-white font-medium" : "text-gray-500"}>
                  {selectedTariffData
                    ? `${selectedTariffData.time} — ${formatPrice(selectedTariffData.price)} ₸`
                    : "Выберите тариф"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${isTariffOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isTariffOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1f] border border-gray-700 rounded-xl shadow-lg z-10">
                  {tariffs.map((tariff) => (
                    <button
                      key={tariff.key}
                      onClick={() => handleTariffSelect(tariff.key)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center justify-between ${
                        selectedTariff === tariff.key ? "bg-[#fdd400]/20 text-[#fdd400]" : "text-white"
                      }`}
                    >
                      <span className="font-medium">{tariff.time}</span>
                      <span className="text-sm">{formatPrice(tariff.price)} ₸</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedCar && selectedTariff && (
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="w-full px-4 py-4 rounded-xl border border-gray-700 bg-[#1a1a1f] text-left flex items-center justify-between hover:border-gray-600 transition-colors"
              >
                <span className={selectedDate ? "text-white font-medium" : "text-gray-500"}>
                  {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату"}
                </span>
                <Calendar className="w-5 h-5 text-gray-500" />
              </button>

              {isDatePickerOpen && (
                <DatePickerDropdown
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onSelect={handleDateSelect}
                  selected={selectedDate}
                />
              )}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={!isFormComplete}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
              isFormComplete
                ? "bg-[#fdd400] text-black hover:bg-[#f5c900]"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            Далее
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <Link href="/cars" className="mt-8 text-gray-500 hover:text-gray-300 transition-colors">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
