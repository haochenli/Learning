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