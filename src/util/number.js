export function formatPrice(price) {
   return new Intl.NumberFormat('ko-KR').format(price);
}
