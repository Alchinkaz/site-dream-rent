/**
 * Formats a price number with spaces as thousand separators
 * Example: 9990 -> "9 990", 150000 -> "150 000"
 */
export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
