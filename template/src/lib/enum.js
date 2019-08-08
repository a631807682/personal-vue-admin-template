/*
  启用状态
 */
export const Status = {
  items: [{
    value: 'OFFLINE',
    name: '下线'
  }, {
    value: 'ONLINE',
    name: '上线'
  }],
  default: 'OFFLINE'
}

// 车辆类型
export const VehicleType = {
  items: [{
    value: 'ONE',
    name: '一类'
  }, {
    value: 'TWO',
    name: '二类'
  }, {
    value: 'THIRD',
    name: '三类'
  }],
  default: 'ONE'
}

// 探头类型
export const DetectorType = {
  items: [{
    value: 'A',
    name: 'A'
  }, {
    value: 'B',
    name: 'B'
  }, {
    value: 'C',
    name: 'C'
  }, {
    value: 'D',
    name: 'D'
  }, {
    value: 'E',
    name: 'E'
  }],
  default: 'A'
}

// 车辆状态
export const VehicleStatus = {
  items: [{
    value: 'WORK',
    name: '正常'
  }, {
    value: 'TROUBLE',
    name: '维修中'
  }, {
    value: 'SCRAP',
    name: '报废'
  }],
  default: 'WORK'
}

// 维修类型
export const MaintainType = {
  items: [{
    value: 'NORMAL',
    name: '保养'
  }, {
    value: 'MINI',
    name: '小修'
  }, {
    value: 'HEAVY',
    name: '大修'
  }],
  default: 'NORMAL'
}

// 检测记录-单复线
export const RecordIsSingle = {
  items: [{
    value: true,
    name: '单线'
  }, {
    value: false,
    name: '复线'
  }],
  default: true
}

// 检测记录-轨型
export const RecordRailType = {
  items: [{
    value: 0,
    name: '75'
  }, {
    value: 1,
    name: '60'
  }, {
    value: 2,
    name: '50'
  }, {
    value: 3,
    name: '43'
  }, {
    value: 4,
    name: '60D'
  }, {
    value: 5,
    name: '60N'
  }],
  default: 0
}

// 检测记录-有无缝
export const RecordIsCrack = {
  items: [{
    value: true,
    name: '有'
  }, {
    value: false,
    name: '无'
  }],
  default: true
}

// 设备类型
export const DeviceType = {
  items: [{
    value: 'APP',
    name: '眼镜'
  }, {
    value: 'PAD',
    name: '中控'
  }],
  default: 'APP'
}

// 电信运营商
export const TelecomOperatorType = {
  items: [{
    value: 'UNKNOW',
    name: '未知'
  }, {
    value: 'CMCC',
    name: '移动'
  }, {
    value: 'CUCC',
    name: '联通'
  }, {
    value: 'CTC',
    name: '电信'
  }],
  default: 'UNKNOW'
}

/*
  应用类型
 */
export const APPUpgradeType = {
  items: [{
    value: 'OPTIONAL',
    name: '可选更新'
  }, {
    value: 'FORCE',
    name: '强制更新'
  }],
  default: 'OPTIONAL'
}

/*
  字节单位
 */
export const BytesUnits = {
  items: [{
    value: 1073741824,
    name: 'GB'
  }, {
    value: 1048576,
    name: 'MB'
  }],
  default: 1048576
}

/*
  意见反馈状态
 */
export const FeedbackStatus = {
  items: [{
    value: 'CREATED',
    name: '未处理'
  }, {
    value: 'FINISH',
    name: '已处理'
  }],
  default: 'CREATED'
}

/*
  意见反馈状态
 */
export const KeepDaySetting = {
  items: [{
    value: 15,
    name: '15'
  }, {
    value: 30,
    name: '30'
  }, {
    value: 60,
    name: '60'
  }],
  default: 30
}
