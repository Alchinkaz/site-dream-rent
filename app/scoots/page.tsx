"use client"

import { useState } from "react"
import { MotorcycleFilters } from "@/components/motorcycle-filters"
import { MotorcycleCard } from "@/components/motorcycle-card"

const motorcycles = [
  {
    id: "yamaha-r1-2015",
    name: "YAMAHA R1",
    year: 2015,
    price: 8800,
    image: "/placeholder.svg?height=300&width=400",
    power: "300 км/ч",
    volume: "1000 см",
    available: true,
    brand: "Yamaha",
    category: "Спортбайк",
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
    brand: "BMW",
    category: "Спортбайк",
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
    brand: "Kawasaki",
    category: "Спортбайк",
  },
  {
    id: "suzuki-gsx-r750-2018",
    name: "SUZUKI GSX-R750",
    year: 2018,
    price: 4400,
    image: "/placeholder.svg?height=300&width=400",
    power: "280 км/ч",
    volume: "750 см",
    available: true,
    brand: "Suzuki",
    category: "Спортбайк",
  },
  {
    id: "bmw-s1000rr-2013",
    name: "BMW S1000RR",
    year: 2013,
    price: 6600,
    image: "/placeholder.svg?height=300&width=400",
    power: "299 км/ч",
    volume: "1000 см",
    available: true,
    brand: "BMW",
    category: "Спортбайк",
  },
  {
    id: "bmw-s1000rr-2020",
    name: "BMW S1000RR",
    year: 2020,
    price: 10000,
    image: "/placeholder.svg?height=300&width=400",
    power: "299 км/ч",
    volume: "1000 см",
    available: true,
    brand: "BMW",
    category: "Спортбайк",
  },
  {
    id: "honda-cbr-600rr-2012",
    name: "HONDA CBR 600RR",
    year: 2012,
    price: 3650,
    image: "/placeholder.svg?height=300&width=400",
    power: "260 км/ч",
    volume: "600 см",
    available: true,
    brand: "Honda",
    category: "Спортбайк",
  },
  {
    id: "yamaha-r1-2009",
    name: "YAMAHA R1",
    year: 2009,
    price: 6800,
    image: "/placeholder.svg?height=300&width=400",
    power: "295 км/ч",
    volume: "1000 см",
    available: true,
    brand: "Yamaha",
    category: "Спортбайк",
  },
  {
    id: "kawasaki-ninja-650-2018",
    name: "KAWASAKI NINJA 650",
    year: 2018,
    price: 3600,
    image: "/placeholder.svg?height=300&width=400",
    power: "200 км/ч",
    volume: "650 см",
    available: true,
    brand: "Kawasaki",
    category: "Спортбайк",
  },
]

export default function ScootsPage() {
  const [filteredMotorcycles, setFilteredMotorcycles] = useState(motorcycles)

  const handleFiltersChange = (filters: any) => {
    let filtered = motorcycles

    if (filters.brand) {
      filtered = filtered.filter((m) => m.brand === filters.brand)
    }
    if (filters.category) {
      filtered = filtered.filter((m) => m.category === filters.category)
    }
    if (filters.volume) {
      filtered = filtered.filter((m) => m.volume.includes(filters.volume.split(" ")[0]))
    }

    setFilteredMotorcycles(filtered)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f10 50%, #0a0a0a 100%)",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="font-rubik font-bold text-4xl lg:text-6xl text-white text-center mb-8">
            Прокат мотоциклов <span className="text-red-600">в Алмате</span>
          </h1>
          <MotorcycleFilters onFiltersChange={handleFiltersChange} />
        </div>
      </section>

      {/* Motorcycles Grid */}
      <section className="py-16" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMotorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} {...motorcycle} />
            ))}
          </div>

          {filteredMotorcycles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">По вашим критериям мотоциклы не найдены</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

