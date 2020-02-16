import dateFns from 'date-fns'

export function getFirstDateOfMonth () {
  const year = dateFns.getYear(new Date())
  const month = dateFns.getMonth(new Date())

  return dateFns.format(new Date(year, month, 1), 'YYYY-MM-DD')
}

export function getFormatToday (format) {
  return dateFns.format(new Date(), format || 'YYYY-MM-DD')
}

export function getFormatDate (val, format) {
  return dateFns.format(val, format || 'YYYY-MM-DD')
}
