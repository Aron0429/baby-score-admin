/*
 * @Description:
 * @Author: HuGang
 * @Date: 2025-11-29 01:48:02
 * @LastEditTime: 2025-11-29 22:30:41
 */
const utils = {
  dateToWeek: function (num = 7, after = false) {
    const today = new Date()
    const dates = []
    for (let i = 0; i < num; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), after ? today.getDate() + i : today.getDate() - i)
      const name = this.getDayName(date.getDay())
      dates.push({ name, date: utils.transforDate(date), day: date.getDate() })
    }
    return dates.reverse()
  },
  getDayName: day => {
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return dayNames[day]
  },
  transforDate: (data, needhms = false) => {
    const date = new Date(data)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需加1
    const day = String(date.getDate()).padStart(2, '0')

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    const result = needhms ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` : `${year}-${month}-${day}`
    return result
  },
}

export default utils
