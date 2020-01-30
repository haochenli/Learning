function debounce(fn, time) {
  let debounceId
  return function(...arg) {
    clearTimeout(debounceId)
    debounceId = setTimeout(() => {
      fn.apply(this, arg)
    }, time)
  }
}

let logger = () => {console.log('debounce')}
let logger2 = () => {console.log('debounce2')}
let debounceLogger = debounce(logger, 2000)
setInterval(() => {debounceLogger()}, 3000)

let debounceLogger2 = debounce(logger2, 2000)
setInterval(() => {debounceLogger2()}, 1000)
