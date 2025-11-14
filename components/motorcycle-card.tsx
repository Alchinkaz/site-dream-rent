import Image from "next/image"
import Link from "next/link"
import { Gauge, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MotorcycleCardProps {
  id: string
  name: string
  year: number
  price: number
  image: string
  power: string
  volume: string
  available: boolean
}

export function MotorcycleCard({ id, name, year, price, image, power, volume, available }: MotorcycleCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden border hover:border-gray-600 transition-colors"
      style={{
        backgroundColor: "#0f0f10",
        borderColor: "#1a1a1b",
      }}
    >
      <Link href={`/scoots/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${name} ${year}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {!available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Недоступен</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/scoots/${id}`}>
          <h3 className="font-rubik font-bold text-lg text-white mb-3 hover:text-red-600 transition-colors">
            {name.toUpperCase()}, {year}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Gauge className="w-4 h-4 text-white" />
              <span className="text-sm text-gray-300">{power}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Settings className="w-4 h-4 text-white" />
              <span className="text-sm text-gray-300">{volume}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-white">от {price.toLocaleString()} ₸</span>
            <span className="text-sm text-gray-400 ml-1">/ 4 часа</span>
          </div>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold" disabled={!available}>
          ЗАБРОНИРОВАТЬ
        </Button>
      </div>
    </div>
  )
}
