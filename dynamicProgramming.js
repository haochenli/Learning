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

// 求最小子数组和的问题  例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
function FindGreatestSumOfSubArray(array){
  let pre = array[0]
  let max = array[0]
  for(let i = 1 ; i < array.length ; i++) {
    pre = pre > 0 ? pre : 0
    max = Math.max(max, pre + array[i])
    pre = pre + array[i]
  }
  return max
}
