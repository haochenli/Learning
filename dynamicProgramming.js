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


// 背包问题： w 是 weight， val是value， capacity是背包容量
function knapSack(w,val,capacity,n){
	var T = []

	for(let i = 0;i < n;i++){
		T[i] = [];
		for(let j=0;j <= capacity;j++){
			if(j === 0){ //容量为0
				T[i][j] = 0;
				continue;
			}	
			if(j < w[i]){ //容量小于物品重量，本行hold不住
				if(i === 0){
					T[i][j] = 0; // i = 0时，不存在i-1，所以T[i][j]取0

				}else{
					T[i][j] = T[i-1][j]; //容量小于物品重量，参照上一行

				}
				continue;
			}
			if(i === 0){
				T[i][j] = val[i]; //第0行，不存在 i-1, 最多只能放这一行的那一个物品
			}else{
				T[i][j] = Math.max(val[i] + T[i-1][j-w[i]],T[i-1][j]);

			}
		}

	}

	findValue(w,val,capacity,n,T);


	return T;
}

//找到需要的物品
function findValue(w,val,capacity,n,T){

	var i = n-1, j = capacity;
	while ( i > 0 && j > 0 ){

		if(T[i][j] != T[i-1][j]){
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + values[i]);
			j = j- w[i];
			i--;
		}else{
			i--;  //如果相等，那么就到 i-1 行
		}
	}
	if(i == 0 ){
		if(T[i][j] != 0){ //那么第一行的物品也可以取
			console.log('选择物品'+i+',重量：'+ w[i] +',价值：' + values[i]);

		}
	}
}

// w = [2,3,4].  val = [3,4,5] , n = 3 , capacity = 5
//function knapSack([2,3,4],[3,4,5],5,3);
// 
var values = [3,4,5],
	weights = [2,3,4],
	capacity = 5,
	n = values.length;

console.log(knapSack(weights,values,capacity,n));




var longestCommonSubsequence = function(text1, text2) {
  if(text1.length ==0 || text2.length==0) return 0;
  /*Start ---> Populate 2D-array
      This can be done in many ways */
  let dp = new Array(text1.length+1);
  for(let i=0 ; i< dp.length; i++){
      dp[i] = new Array(text2.length+1);
  }
  for(let i= 0; i<text1.length +1 ; i++)
  {
      for(let j=0 ; j< text2.length +1 ; j++)
      {
                      if(i==0 || j==0){
                      dp[i][j] = 0;
                      }
                      else {
                      dp[i][j] = -1;
                          }
      }
  }
  /* END- Populating 2D-Array*/
  

  //table filling method
  for(let i= 1; i<=text1.length ; i++)
  {
      for(let j=1 ; j<=text2.length; j++)
      {
          if(text1[i-1] !== text2[j-1]){
              dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
          }else{
              dp[i][j] = 1 + dp[i-1][j-1];
          }
          
      }
  }
  return dp[text1.length][text2.length];
  
};