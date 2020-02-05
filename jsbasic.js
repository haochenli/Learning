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

Function.prototype.bind = function(context, ...bindArgs) {
  context = context === undefined || context === null ? window : Object(context)
  return (...args) => this.apply(context, [...bindArgs, ...args])
}

