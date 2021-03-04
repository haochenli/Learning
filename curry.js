// arrow function

let currified = (a) => (b) => a + b

let add2 = currified(2)

console.log(add2(3))

// without arrow function

function currified2 (a) {
  return function (b) {
    return a + b
  }
}

let add3 = currified2(3)
console.log(add3(2))

// 尾递归 -> 某个函数的最后一步是调用另一个函数。
// ES6的尾调用优化只在严格模式下开启，正常模式是无效的，这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
// arguments：返回调用时函数的参数。
// func.caller：返回调用当前函数的那个函数。
//尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

// normal：
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120

// optimized： 
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
