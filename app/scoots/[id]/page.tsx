"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Gauge, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { MotorcycleCard } from "@/components/motorcycle-card"
import { BookingModal } from "@/components/booking-modal"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

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
        className="w-full h-12 text-white font-medium px-4 rounded-lg border transition-colors flex items-center justify-between"
        style={{
          backgroundColor: "#1a1a1b",
          borderColor: "#2a2a2b",
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
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
              key={option.value}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              style={{ ":hover": { backgroundColor: "#1a1a1b" } }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const motorcycleData = {
  "yamaha-r1-2015": {
    name: "YAMAHA R1",
    year: 2015,
    category: "Спортбайк",
    rating: 4.8,
    reviews: 157,
    power: "200 л.с.",
    speed: "300 км/ч",
    volume: "1000 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 8800, time: "4 часа" },
      "7h": { price: 15000, time: "7 часов" },
      "8h": { price: 17000, time: "8 часов" },
      day: { price: 25000, time: "1 день" },
    },
    deposit: 50000,
    helmet: "бесплатно",
  },
  "bmw-s1000rr-2021": {
    name: "BMW S 1000RR",
    year: 2021,
    category: "Спортбайк",
    rating: 4.9,
    reviews: 203,
    power: "207 л.с.",
    speed: "299 км/ч",
    volume: "1000 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 7900, time: "4 часа" },
      "7h": { price: 14000, time: "7 часов" },
      "8h": { price: 16000, time: "8 часов" },
      day: { price: 24000, time: "1 день" },
    },
    deposit: 50000,
    helmet: "бесплатно",
  },
  "kawasaki-ninja-650-2021": {
    name: "KAWASAKI NINJA 650",
    year: 2021,
    category: "Спортбайк",
    rating: 4.7,
    reviews: 89,
    power: "68 л.с.",
    speed: "200 км/ч",
    volume: "650 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 4200, time: "4 часа" },
      "7h": { price: 7500, time: "7 часов" },
      "8h": { price: 8500, time: "8 часов" },
      day: { price: 12000, time: "1 день" },
    },
    deposit: 30000,
    helmet: "бесплатно",
  },
  "suzuki-gsx-r750-2018": {
    name: "SUZUKI GSX-R750",
    year: 2018,
    category: "Спортбайк",
    rating: 4.6,
    reviews: 124,
    power: "148 л.с.",
    speed: "280 км/ч",
    volume: "750 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 4400, time: "4 часа" },
      "7h": { price: 8000, time: "7 часов" },
      "8h": { price: 9000, time: "8 часов" },
      day: { price: 13000, time: "1 день" },
    },
    deposit: 35000,
    helmet: "бесплатно",
  },
  "bmw-s1000rr-2013": {
    name: "BMW S1000RR",
    year: 2013,
    category: "Спортбайк",
    rating: 4.5,
    reviews: 178,
    power: "193 л.с.",
    speed: "299 км/ч",
    volume: "1000 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 6600, time: "4 часа" },
      "7h": { price: 12000, time: "7 часов" },
      "8h": { price: 13500, time: "8 часов" },
      day: { price: 20000, time: "1 день" },
    },
    deposit: 45000,
    helmet: "бесплатно",
  },
  "bmw-s1000rr-2020": {
    name: "BMW S1000RR",
    year: 2020,
    category: "Спортбайк",
    rating: 4.9,
    reviews: 156,
    power: "207 л.с.",
    speed: "299 км/ч",
    volume: "1000 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 10000, time: "4 часа" },
      "7h": { price: 18000, time: "7 часов" },
      "8h": { price: 20000, time: "8 часов" },
      day: { price: 30000, time: "1 день" },
    },
    deposit: 50000,
    helmet: "бесплатно",
  },
  "honda-cbr-600rr-2012": {
    name: "HONDA CBR 600RR",
    year: 2012,
    category: "Спортбайк",
    rating: 4.4,
    reviews: 92,
    power: "120 л.с.",
    speed: "260 км/ч",
    volume: "600 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 3650, time: "4 часа" },
      "7h": { price: 6500, time: "7 часов" },
      "8h": { price: 7500, time: "8 часов" },
      day: { price: 11000, time: "1 день" },
    },
    deposit: 25000,
    helmet: "бесплатно",
  },
  "yamaha-r1-2009": {
    name: "YAMAHA R1",
    year: 2009,
    category: "Спортбайк",
    rating: 4.3,
    reviews: 134,
    power: "182 л.с.",
    speed: "295 км/ч",
    volume: "1000 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 6800, time: "4 часа" },
      "7h": { price: 12000, time: "7 часов" },
      "8h": { price: 13500, time: "8 часов" },
      day: { price: 20000, time: "1 день" },
    },
    deposit: 40000,
    helmet: "бесплатно",
  },
  "kawasaki-ninja-650-2018": {
    name: "KAWASAKI NINJA 650",
    year: 2018,
    category: "Спортбайк",
    rating: 4.5,
    reviews: 76,
    power: "68 л.с.",
    speed: "200 км/ч",
    volume: "650 см",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    pricing: {
      "4h": { price: 3600, time: "4 часа" },
      "7h": { price: 6500, time: "7 часов" },
      "8h": { price: 7500, time: "8 часов" },
      day: { price: 11000, time: "1 день" },
    },
    deposit: 25000,
    helmet: "бесплатно",
  },
}

const similarMotorcycles = [
  {
    id: "yamaha-r1-2015",
    name: "YAMAHA R1",
    year: 2015,
    price: 8000,
    image: "/placeholder.svg?height=300&width=400",
    power: "300 км/ч",
    volume: "1000 см",
    available: true,
  },
  {
    id: "bmw-s1000rr-2021",
    name: "BMW S 1000RR",
    year: 2021,
    price: 7900,
    image: "/placeholder.svg?height=300&width=400",
    power: "299 км/ч",
    volume: "1000 см",
    available: true,
  },
  {
    id: "kawasaki-ninja-650-2021",
    name: "KAWASAKI NINJA 650",
    year: 2021,
    price: 4200,
    image: "/placeholder.svg?height=300&width=400",
    power: "200 км/ч",
    volume: "650 см",
    available: true,
  },
]

export default function ScootPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTariff, setSelectedTariff] = useState("")
  const [showBookingModal, setShowBookingModal] = useState(false)

  const motorcycle = motorcycleData[params.id as keyof typeof motorcycleData]

  if (!motorcycle) {
    return <div>Мотоцикл не найден</div>
  }

  const timeOptions = [
    { value: "10:00", label: "10:00" },
    { value: "12:00", label: "12:00" },
    { value: "14:00", label: "14:00" },
    { value: "16:00", label: "16:00" },
    { value: "18:00", label: "18:00" },
  ]

  const tariffOptions = Object.entries(motorcycle.pricing).map(([key, tariff]) => ({
    value: key,
    label: `${tariff.time} - ${tariff.price} ₸`,
  }))

  const handleBooking = () => {
    if (startDate && selectedTime && selectedTariff) {
      setShowBookingModal(true)
    } else {
      alert("Пожалуйста, выберите все необходимые данные для бронирования")
    }
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/scoots"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    selectedImage === index ? "border-red-600" : "border-gray-700"
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
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <span className="text-gray-400 text-sm">{motorcycle.category}</span>
              <h1 className="font-rubik font-bold text-3xl text-white mb-2">
                {motorcycle.name}, {motorcycle.year}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Gauge className="w-5 h-5 text-white" />
                  <span className="text-gray-300">{motorcycle.speed}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-5 h-5 text-white" />
                  <span className="text-gray-300">{motorcycle.volume}</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: "#0f0f10",
                borderColor: "#1a1a1b",
              }}
            >
              <h3 className="font-rubik font-bold text-xl text-white mb-4">Забронируйте мотоцикл</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-gray-300 text-sm mb-2">Дата получения</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="w-full justify-start border h-12"
                          style={{
                            backgroundColor: "#1a1a1b",
                            borderColor: "#2a2a2b",
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
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
                          selected={startDate}
                          onSelect={setStartDate}
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
                  </div>

                  <div>
                    <Label className="block text-gray-300 text-sm mb-2">Время</Label>
                    <CustomSelect
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      placeholder="14:00"
                      options={timeOptions}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-gray-300 text-sm mb-2">Выберите тариф</Label>
                  <CustomSelect
                    value={selectedTariff}
                    onValueChange={setSelectedTariff}
                    placeholder="Выберите тариф"
                    options={tariffOptions}
                  />
                </div>

                <div className="rounded-lg p-4" style={{ backgroundColor: "#1a1a1b" }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Шлем:</span>
                    <span className="text-white">{motorcycle.helmet}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Депозит:</span>
                    <span className="text-white">{motorcycle.deposit.toLocaleString()} ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Стоимость аренды:</span>
                    <span className="text-white">
                      {selectedTariff ? motorcycle.pricing[selectedTariff as keyof typeof motorcycle.pricing].price : 0}{" "}
                      ₸
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4" style={{ borderColor: "#2a2a2b" }}>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Итого:</span>
                    <span className="text-white">
                      {selectedTariff ? motorcycle.pricing[selectedTariff as keyof typeof motorcycle.pricing].price : 0}{" "}
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

        {/* Similar Motorcycles */}
        <section className="mt-16">
          <h2 className="font-rubik font-bold text-3xl text-white mb-8">ПОХОЖИЕ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarMotorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} {...motorcycle} />
            ))}
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        motorcycle={motorcycle}
        bookingData={{
          date: startDate,
          time: selectedTime,
          tariff: selectedTariff,
        }}
      />
    </div>
  )
}

