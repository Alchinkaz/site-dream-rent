"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Calendar, ArrowRight, Gauge, Settings } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DatePickerDropdown } from "@/components/date-picker-dropdown"
import { motorcycleData } from "@/lib/motorcycles-data"
import { formatPrice } from "@/lib/price-utils"

const availableMopeds = [
  {
    id: "samurai",
    name: "SAMURAI",
    price: 6000,
    image: motorcycleData["samurai"].images[0],
    speed: motorcycleData["samurai"].speed,
    volume: motorcycleData["samurai"].volume,
  },
  {
    id: "m8",
    name: "M8",
    price: 5500,
    image: motorcycleData["m8"].images[0],
    speed: motorcycleData["m8"].speed,
    volume: motorcycleData["m8"].volume,
  },
  {
    id: "maxi",
    name: "MAXI",
    price: 6500,
    image: motorcycleData["maxi"].images[0],
    speed: motorcycleData["maxi"].speed,
    volume: motorcycleData["maxi"].volume,
  },
  {
    id: "maxi-sport",
    name: "MAXI SPORT",
    price: 7500,
    image: motorcycleData["maxi-sport"].images[0],
    speed: motorcycleData["maxi-sport"].speed,
    volume: motorcycleData["maxi-sport"].volume,
  },
  {
    id: "honda-dio",
    name: "Honda Dio",
    price: 5000,
    image: motorcycleData["honda-dio"].images[0],
    speed: motorcycleData["honda-dio"].speed,
    volume: motorcycleData["honda-dio"].volume,
  },
  {
    id: "peda-hornet",
    name: "Peda Hornet",
    price: 6500,
    image: motorcycleData["peda-hornet"].images[0],
    speed: motorcycleData["peda-hornet"].speed,
    volume: motorcycleData["peda-hornet"].volume,
  },
]

export default function SelectPage() {
  const router = useRouter()
  const [selectedMoped, setSelectedMoped] = useState<string | null>(null)
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isMopedOpen, setIsMopedOpen] = useState(false)
  const [isTariffOpen, setIsTariffOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const selectedMopedData = selectedMoped ? motorcycleData[selectedMoped as keyof typeof motorcycleData] : null
  const selectedMopedInfo = selectedMoped ? availableMopeds.find((m) => m.id === selectedMoped) : null

  const tariffs = selectedMopedData?.pricing
    ? Object.entries(selectedMopedData.pricing).map(([key, value]) => ({
        key,
        ...value,
      }))
    : []

  const selectedTariffData =
    selectedTariff && selectedMopedData
      ? selectedMopedData.pricing[selectedTariff as keyof typeof selectedMopedData.pricing]
      : null

  const handleMopedSelect = (mopedId: string) => {
    setSelectedMoped(mopedId)
    setSelectedTariff(null)
    setIsMopedOpen(false)
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
    if (!selectedMoped || !selectedTariff || !selectedDate) return

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`

    const searchParams = new URLSearchParams({
      motorcycleId: selectedMoped,
      tariff: selectedTariff,
      date: dateStr,
      time: "10:00",
    })

    router.push(`/scoots/booking?${searchParams.toString()}`)
  }

  const isFormComplete = selectedMoped && selectedTariff && selectedDate

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <Link href="/scoots" className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="hover:text-red-600 transition-colors">Kaz Dream </span>
            <span className="bg-red-600 text-white px-2 py-1 rounded">Scoots</span>
          </h1>
        </Link>

        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsMopedOpen(!isMopedOpen)}
              className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              {selectedMopedInfo ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedMopedInfo.image || "/placeholder.svg"}
                      alt={selectedMopedInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium block">{selectedMopedInfo.name}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        {selectedMopedInfo.speed}
                      </span>
                      <span className="flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        {selectedMopedInfo.volume}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Выберите мопед</span>
              )}
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isMopedOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMopedOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                {availableMopeds.map((moped) => (
                  <button
                    key={moped.id}
                    onClick={() => handleMopedSelect(moped.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                      selectedMoped === moped.id ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <Image src={moped.image || "/placeholder.svg"} alt={moped.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`font-medium block ${selectedMoped === moped.id ? "text-red-600" : "text-gray-900"}`}
                      >
                        {moped.name}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3" />
                          {moped.speed}
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings className="w-3 h-3" />
                          {moped.volume}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">от {formatPrice(moped.price)} ₸</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tariff Selection */}
          {selectedMoped && (
            <div className="relative">
              <button
                onClick={() => setIsTariffOpen(!isTariffOpen)}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
              >
                <span className={selectedTariff ? "text-gray-900 font-medium" : "text-gray-500"}>
                  {selectedTariffData
                    ? `${selectedTariffData.time} — ${formatPrice(selectedTariffData.price)} ₸`
                    : "Выберите тариф"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${isTariffOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isTariffOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {tariffs.map((tariff) => (
                    <button
                      key={tariff.key}
                      onClick={() => handleTariffSelect(tariff.key)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        selectedTariff === tariff.key ? "bg-red-50 text-red-600" : "text-gray-900"
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

          {selectedMoped && selectedTariff && (
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
              >
                <span className={selectedDate ? "text-gray-900 font-medium" : "text-gray-500"}>
                  {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату"}
                </span>
                <Calendar className="w-5 h-5 text-gray-400" />
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

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!isFormComplete}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
              isFormComplete ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Далее
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Back link */}
        <Link href="/scoots" className="mt-8 text-gray-500 hover:text-gray-700 transition-colors">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
