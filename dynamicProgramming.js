function getFibonacci(n) {
  if(n < 2) {
    return 1
  }
  let result = 0
  let first = 1
  let second = 1
  for(let i = 2 ; i <= n; i++) {
    result = first + second
    first = second
    second = result
  }
  return result
}

console.log(getFibonacci(4))