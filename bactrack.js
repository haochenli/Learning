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



var combinationSum2 = function(candidates, target) {
  let tempPath = []
  let result = []
  candidates = candidates.sort((a, b) => a-b)
  let backTrack = (tempPath, start, target) => {
      if(target === 0) {
          result.push(tempPath)
          return
      }
      if(target < 0) {
          return
      }
      for(let i = start ; i < candidates.length ; i++) {
          if(i > start && candidates[i - 1] === candidates[i]) continue
          tempPath.push(candidates[i])
          backTrack(tempPath.slice(), i + 1, target - candidates[i])
          tempPath.pop()
      }
  }
  backTrack(tempPath, 0, target)
  return result
};

console.log(combinationSum2([10,1,2,7,6,1,5], 8))