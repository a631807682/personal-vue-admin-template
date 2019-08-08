import dayjs from 'dayjs'
import bytes from 'bytes'
import { Status } from 'src/lib/enum'

export const dateTimeFormat = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return ''
  }
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

export const dateFormat = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return ''
  }
  return dayjs(cellValue).format('YYYY-MM-DD')
}

export const StatusFormat = (row, column, cellValue) => {
  let same = Status.items.find(e => e.value === cellValue)
  return same.name || ''
}

export const kmFormatter = (row, column, cellValue, index) => {
  if (!cellValue) return 'K0+000'

  let len = 3
  let km = parseInt(cellValue / 1000)
  let m = cellValue % 1000 + ''
  m = Array(len - m.length).fill(0).join('') + m
  return `K${km}+${m}`
}

export const bytesFormat = (row, column, cellValue) => {
  if (cellValue === undefined) return ''

  return bytes(cellValue)
}

export const durationFormat = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return ''
  }

  let secNum = parseInt(cellValue, 10)
  let hours = Math.floor(secNum / 3600)
  let minutes = Math.floor((secNum - (hours * 3600)) / 60)
  let seconds = secNum - (hours * 3600) - (minutes * 60)

  if (hours < 10) { hours = '0' + hours }
  if (minutes < 10) { minutes = '0' + minutes }
  if (seconds < 10) { seconds = '0' + seconds }
  return hours + ':' + minutes + ':' + seconds
}
