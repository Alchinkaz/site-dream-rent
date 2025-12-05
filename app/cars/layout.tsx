"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import NavbarCars from "@/components/navbar-cars"

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showNavbar = pathname !== "/cars/booking"

  return (
    <>
      {showNavbar && <NavbarCars />}
      {children}
    </>
  )
}
