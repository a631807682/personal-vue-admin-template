import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import { ADStatus } from 'src/lib/enum';
import * as sysEnums from 'src/lib/enum';

export const dateTimeFormat = (row, column, cellValue) => {
  if (cellValue == undefined) {
    return "";
  }
  return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
}

export const dateFormat = (row, column, cellValue) => {
  if (cellValue == undefined) {
    return "";
  }
  return moment(cellValue).format("YYYY-MM-DD");
}

export const sizeFormat = (row, column, cellValue) => {
  return prettyBytes(cellValue)
}


export const ADStatusFormat = (row, column, cellValue) => {
  let same = ADStatus.items.find(e => e.value == cellValue);
  return same.name || '';
}


// const format = {
// 	dateFormat: (row, column, cellValue) => {
// 		if (cellValue == undefined) {
// 			return "";
// 		}
// 		return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
// 	},
// 	sizeFormat: (row, column, cellValue) => {
// 		return prettyBytes(cellValue)
// 	}
// }

// //系统枚举格式化
// for (let k of Object.keys(sysEnums)) {
// 	format[`${k}format`] = (row, column, cellValue) => {
// 		let same = sysEnums[key].items.find(e => e.value == cellValue);
// 		return same.name || '';
// 	}
// }

// export default JSON.parse(JSON.stringify(format));
