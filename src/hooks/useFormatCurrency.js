export function useFormatCurrency(value) {
  return new Intl.NumberFormat('es-AR', { 
    style: 'currency',
    currency: 'ARS'
  }).format(value);
}