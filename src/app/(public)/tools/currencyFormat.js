// const symbol='₹ '
export const currencyFormat = (value, withSymbol = false, symbol='') => {
  let val = value || 0
  if(typeof value == 'string') {
      val = parseFloat(value?.replace(/,|₹ /g, ''))
  }
  return `${symbol}` + Intl.NumberFormat('en-IN').format(Math.round(parseFloat(val)* 100)/100)
}

export const currencyAsInt = (value) => typeof value == 'string' ? parseInt(value?.replace(/,|₹/g, '')) : parseInt(value)
export const currencyAsFloat = (value) => typeof value == 'string' ? parseFloat(value?.replace(/,|₹/g, '')) : parseFloat(value)