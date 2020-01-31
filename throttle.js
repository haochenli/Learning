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
      f.apply(this.args)
      canRun = true
    }, t)
  }
}


let logger = (args) => console.log(`throttle`);
// throttle: call the logger at most once every two seconds
let throttledLogger = throttle2(logger, 100); 
setInterval(() => {throttledLogger()}, 1000)