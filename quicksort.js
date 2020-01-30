function quickSort(array, left=0, right=array.length - 1) {
  let length = array.length
  let index
  if(length > 1) {
    index = partition(array, left, right)
    if(left < index - 1) {
      quickSort(array, left, index - 1)
    } 
    if(index < right) {
      quickSort(array, index, right)
    }
  }
  return array
}


function partition(arr, left, right) {
  let middle = Math.floor((right + left) / 2),
      pivot = arr[middle],
      i = left,                 // Start pointer at the first item in the array
      j = right                 // Start pointer at the last item in the array

  while(i <= j) {

    while(arr[i] < pivot) {
      i++
    }

    while(arr[j] > pivot) {
      j--
    }

    if(i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]] 
      i++
      j--
    }
  }
  return i
}

let test = [1,3,4,5,2,7,6]

console.log(quickSort(test))