// 模拟一个call, bind, apply方法
Function.prototype.call = function(context, ...args) {
  context = context === undefined || context === null ? window : Object(context)
  const fn = Symbol('fn')
  context[fn] = this // 这里是改变this的指向， this是function本身，将function本身赋值给传进来的context
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.apply = function(context, args) {
  context = context === undefined || context === null ? window : Object(context)
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.bind1 = function(context, ...bindArgs) {
  context = context === undefined || context === null ? window : Object(context)
  return (...args) => this.apply(context, [...bindArgs, ...args])
}

Function.prototype.bind2 = function (context, ...bindArgs) {
  context = context === undefined || context === null ? window : Object(context)
  return (...args) => this.call(context, ...bindArgs, ...args)  
}


let obj = {
  name: "一个"
}

function allName(firstName, lastName) {
  console.log(`我的全名是“${firstName}${this.name}${lastName}”`)
}

// allName('我是', '前端') //我的全名是“我是前端”  this指向window
allName.apply(obj, ['我是', '前端']) //我的全名是“我是一个前端” this指向obj


// js的基本类型： number string undefined Symbol null boolean Biginit
// 判断类型 Object.prototype.toString.call('') 
// service-worker: run script in background in js