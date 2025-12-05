import Image from "next/image"
import Link from "next/link"
import { Gauge, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/price-utils"

interface CarCardProps {
  id: string
  name: string
  year: number
  price: number
  image: string
  power: string
  volume: string
  available: boolean
  shortDescription?: string
}

export function CarCard({ id, name, year, price, image, power, volume, available, shortDescription }: CarCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-[#fdd400]/10 transition-all bg-[#1a1a1f]">
      <Link href={`/cars/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/cars/${id}`}>
          <h3 className="font-rubik font-bold text-lg text-white mb-2 hover:text-[#fdd400] transition-colors">
            {name.toUpperCase()}
          </h3>
        </Link>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Gauge className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">{power}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">{volume}</span>
          </div>
        </div>

        {shortDescription && <p className="text-sm text-gray-400 mb-3">{shortDescription}</p>}

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-white">от {formatPrice(price)} ₸</span>
            <span className="text-sm text-gray-500 ml-1">/ сутки</span>
          </div>
        </div>

        <Link href={`/cars/${id}`}>
          <Button className="w-full bg-[#fdd400] hover:bg-[#f5c900] text-black font-semibold">ЗАБРОНИРОВАТЬ</Button>
        </Link>
      </div>
    </div>
  )
}
