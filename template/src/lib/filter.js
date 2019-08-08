import dayjs from 'dayjs'
import bytes from 'bytes'
import {
  Status,
  VehicleType,
  DetectorType,
  VehicleStatus,
  DeviceType,
  TelecomOperatorType,
  FeedbackStatus
} from 'src/lib/enum'

const enumFilter = (value, enumModel) => {
  let same = enumModel.items.find(s => value === s.value)
  return same ? same.name : value
}

export const dateFutureFilter = (time) => {
  let lastDate = dayjs().add(-1, 'day')
  return time.getTime() < lastDate
}

export const statusFilter = (status) => {
  let same = Status.items.find(s => status === s.value)
  return same ? same.name : status
}

export const dateFilter = (time) => {
  if (time === undefined) {
    return ''
  }
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export const diffTime = ([start, end], type) => {
  // console.log('start', start, 'end', end)
  if (start && end) {
    return dayjs(end).diff(dayjs(start), type)
  }
  return 0
}

export const vehicleTypeFilter = (value) => enumFilter(value, VehicleType)

export const detectorTypeFilter = (value) => enumFilter(value, DetectorType)

export const vehicleStatusFilter = (value) => enumFilter(value, VehicleStatus)

/**
 * 探伤记录拦截器
 * @param  {[type]} records [description]
 * @param  {[type]} type    [timespan/distance]
 * @return {[type]}         [description]
 */
export const recordsFilter = (records, type) => {
  if (records.length > 0) {
    if (type === 'timespan') {
      let spans = records.map(r => diffTime([r.startTime, r.endTime], 'hours'))
      return spans.reduce((res, acc) => res + acc)
    } else if (type === 'distance') {
      let distances = records.map(r => r.end - r.start)
      return distances.reduce((res, acc) => res + acc)
    }
  }
  return 0
}

// 智能眼镜
export const deviceTypeFilter = (value) => enumFilter(value, DeviceType)
export const telecomOperatorTypeFilter = (value) => enumFilter(value, TelecomOperatorType)

export const bytesFilter = (value) => {
  if (value === undefined) return ''

  return bytes(value)
}

export const feedbackStatusFilter = (value) => enumFilter(value, FeedbackStatus)
