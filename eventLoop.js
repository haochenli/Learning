// 在node11之后和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。
// 例子如下
function test () {
   console.log('start')
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)
    setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
    }, 0)
    Promise.resolve().then(() => {console.log('children1')})
    console.log('end') 
}

test()

// 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
// start
// end
// children1
// children2
// 此时将微任务 Promise.resolve().then(() => {console.log('children2-1')}) 放入任务队列

// children3
// 此时将微任务 Promise.resolve().then(() => {console.log('children3-1')}) 放入任务队列
// children2-1
// children3-1

// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
// start
// end
// children1
// ----- 一个宏任务下的微任务
// children2
// children2-1
// ------ 另一个宏任务下的微任务
// children3
// children3-1

async function a1 () {
  console.log('a1 start')
  await a2()
  console.log('a1 end')
}

// async function a1() {
//   console.log('a1 start')
//   a2().then(() => {
//     console.log('a1 end')
//   })
// }
async function a2 () {
  console.log('a2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)


Promise.resolve().then(() => {
  console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
      console.log('promise3')
  })
})
console.log('script end')

//执行顺序如下： script start -> a1 start -> a2 ->  promise2 -> script end -> 开始异步 -> promise1 -> promise2.then -> promise3 -> a1 end -> setTimeout



// 题目 二
async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2(){
  console.log('async2')
}
console.log('script start')
setTimeout(function(){
  console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
  console.log('promise1')
  resolve();
}).then(function(){
  console.log('promise2')
}).then(function() {
  console.log('promise3')
}).then(function() {
  console.log('promise4')
}).then(function() {
  console.log('promise5')
}).then(function() {
  console.log('promise6')
}).then(function() {
  console.log('promise7')
}).then(function() {
  console.log('promise8')
})
console.log('script end')



// 对于如下的方法：
async function async1(){
  await async2()
  console.log('async1 end')
}
async function async2(){} 
// ------

// 可以转换成为
async function async1() {
  return new Promise(resolve => {
    resolve(async2) // 因为async2也返回一个thenable的对象，所以resolve(thenable) !== Promise.resolve(thenable), 当thenable不是thenable的时候成立。
  }).then(() => {console.log('async1 end')})
}

//接着转换成为
async function async1() {
  return new Promise(resolve => {
    Promise.resolve().then(() => {
      async2().then(resolve)
    })
  }).then(() => {console.log('async1 end')})
}

// 但是在最新的chrome中会被转换成为：
async function async1() {
    async2().then(() => {console.log('async1 end')})
}

// 也就是下面这个：
async function async1() {
  Promise.resolve(async2()).then(() => {
    console.log('async1 end')
  })
}

// 所以最终转换成为

async function async1 () {
  console.log('async1 start')
  async2().then(() => {
    console.log('async1 end')
  })
}
async function async2 () {
  console.log('async2')
}
console.log('script start')
setTimeout(function(){
  console.log('setTimeout') 
},0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
})
  .then(function () {
    console.log('promise2')
  })
  .then(function () {
    console.log('promise3')
  })
  .then(function () {
    console.log('promise4')
  }).then(function() {
    console.log('promise5')
  }).then(function() {
    console.log('promise6')
  }).then(function() {
    console.log('promise7')
  }).then(function() {
    console.log('promise8')
  })
  console.log('script end')
  
