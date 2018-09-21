import moment from 'moment'
import { Status } from 'src/lib/enum'

export const dateFutureFilter = (time) => {
  let lastDate = moment().subtract(1, "days")
  return time.getTime() < lastDate;
}

export const statusFilter = (status) => {
  let same = Status.items.find(s => status === s.value);
  return same.name || status;
}
