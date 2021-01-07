export function debounce(func,delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout (timer)
    //setTimeout里面的内容即使没有设置时间也会等到空闲时间再去执行，即在下一次事件循环去执行
    timer = setTimeout(() => {
      //apply执行传入的函数
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date,fmt) {
  if (/(y+)/.test(fmt)) {
    //RegExp.$1就是匹配到的yyyy，date.getFullYear()+''是将获取的年份转为字符串格式
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),   
    'h+': date.getHours(),   
    'm+': date.getMinutes(),   
    's+': date.getSeconds(),   
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str: padLeftZero(str));
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}