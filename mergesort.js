
function mergeSort(array) {
  if(array.length <= 1) return array
  let middleIdx = Math.floor(array.length / 2)
  let left = array.slice(0, middleIdx)
  let right = array.slice(middleIdx, array.length)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let leftIdx = 0;
  let rightIdx = 0;
  let result = []
  while(leftIdx < left.length && rightIdx < right.length) {
    if(left[leftIdx] < right[rightIdx]) {
      result.push(left[leftIdx])
      leftIdx++
    }else {
      result.push(right[rightIdx])
      rightIdx++
    }
  }
  return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx))
}