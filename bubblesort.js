function bubbleSort(array) {
  for(let i = 0 ; i < array.length - 1; i ++) {
    for(let j = i ; j < array.length; j ++) {
      if(array[i] >= array[j]) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }
  return array
}



let test = [1,3,4,5,2,7,6]

console.log(quickSort(test))