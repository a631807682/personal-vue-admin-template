import moment from 'moment'
import { Status } from 'src/lib/enum'

export const dateTimeFormat = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return ''
  }
  return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

export const dateFormat = (row, column, cellValue) => {
  if (cellValue === undefined) {
    return ''
  }
  return moment(cellValue).format('YYYY-MM-DD')
}

export const StatusFormat = (row, column, cellValue) => {
  let same = Status.items.find(e => e.value === cellValue)
  return same.name || ''
}
