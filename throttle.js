function throttle(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall === undefined // function is being called for the first time
        || (this.lastCall - previousCall) > t) { // throttle time has elapsed
      f(args);
    }
  }
}

function throttle2(f, t=500) {
  let canRun = true
  return function(...args) {
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      f.apply(args)
      canRun = true
    }, t)
  }
}


function throttle(fn, time, immediate) {
  let throttleId
  return (...args) => {
    if(immediate) {
      if(throttleId) return
      fn.apply(this, args)
      throttleId = setTimeout(() => {
        throttleId = null
      },time)        
    } else {
      if(throttleId) return
      throttleId = setTimeout(() => {
        fn.apply(this, args)
        throttleId = null
      }, time)
    }
  }
}

let logger = (args) => console.log(`throttle`);
// throttle: call the logger at most once every two seconds
let throttledLogger = throttle2(logger, 2000); 
setInterval(() => {throttledLogger()}, 100)
