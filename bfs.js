function deepTraversal(node) {  
  var nodeList = [];  
  if (node) {  
      var stack = [];  
      stack.push(node);  
      while (stack.length != 0) {  
          var childrenItem = stack.pop();  
          nodeList.push(childrenItem);  
          var childrenList = childrenItem.children;  
          for (var i = childrenList.length - 1; i >= 0; i--)  
              stack.push(childrenList[i]);  
      }  
  }    
  return nodeList;  
}


const traverse = (ndRoot) => {
  const queue = [ndRoot];
  while (queue.length) {        
      const node = queue.shift();
      printInfo(node);

      if (!node.children.length) {
          continue;
      }

      Array.from(node.children).forEach(x => queue.push(x));    
    }
}

var combinationSum = function(candidates, target) {
    let n = candidates.length;
    let res = [];
    let tmpPath = [];
    let backtrack = (tmpPath,target,start) => {
        if(target < 0){
            return;
        }
        if(target == 0){
            res.push(tmpPath);
            return;
        }
        for(let i = start;i < n;i++){
            tmpPath.push(candidates[i]);
            backtrack(tmpPath.slice(),target - candidates[i],i);
            tmpPath.pop();
        }
    }
    backtrack(tmpPath,target,0);
    return res;
};

console.log(combinationSum([2,3,6,7], 7))

function findSum(arr, N) {
    let time = 1 << arr.length
    for(let i = 0 ; i < time ; i ++) {
        let bit = i.toString(2)
        let binary = bit
        if(bit.length < arr.length) {
            for(let time = 0 ; time < arr.length - bit.length ; time++) {
                binary = '0' + binary
            }
        }
        let sum = 0
        let result = []
        for(let j = 0 ; j < binary.length ; j ++) {
            sum+=Number(binary[j]) * arr[j]
            if(binary[j] === '1') {
                result.push(arr[j])
            }
        }
        if(sum === N) {
            console.log(result)
        }
    }
}
findSum([1,3,5,7, 8], 8)


