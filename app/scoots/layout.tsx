'use client'

import { usePathname } from 'next/navigation'
import NavbarScoots from "@/components/navbar-scoots"

export default function ScootsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showNavbar = pathname !== '/scoots/booking'

  return (
    <>
      {showNavbar && <NavbarScoots />}
      {children}
    </>
  )
}
