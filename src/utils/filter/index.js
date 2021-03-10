/**
 * parseTime(1514060000000,'{y}--{m}--{d} 周{a}')  ==> 2017--12--24 周日
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s} {a}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  // 当超过1天前的 可以自定义显示格式，默认格式是x年x月x日xx时xx分
  // formatTime(1514060000000,'{y}--{m}--{d} 周{a}')  ==> 2017--12--24 周日
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 手机号
 * @param {string} phone
 * @returns {string}
 */
export function filtePhone(phone) {
  let mobile = phone && phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
  return mobile
}

/**
 * 倒计时
 * @param {number} time
 * @param {string} val
 * @returns {string}
 */
export function backTimeFilter(time, val = 'D天 h小时 min分 s秒') {
  let backTime = parseInt(time / 1000)
  let day = Math.floor(backTime / (60 * 60 * 24))
  let hour = Math.floor((backTime - day * 24 * 60 * 60) / 3600)
  let minutes = Math.floor((backTime - day * 24 * 60 * 60 - hour * 3600) / 60)
  let seconds = Math.floor(backTime - day * 24 * 60 * 60 - hour * 3600 - minutes * 60)

  if (day < 10) day = '0' + day
  if (hour < 10) hour = '0' + hour
  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds

  let value = val.replace(/D/g, day).replace(/h/g, hour).replace(/min/g, minutes).replace(/s/g, seconds)

  return value
}

