export default function Logo({
  className = "h-10 w-auto max-w-none",
}: {
  className?: string
}) {
  return (
    <img
      src="https://alchinkaz.github.io/db-dream-rent/cars/kaz-dream-cars.svg"
      alt="Kaz Dream Cars"
      className={className}
    />
  )
}
