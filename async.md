- callback function
``` js
  ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
```

- listen to event
``` js 
function f1() {
  setTimeout(function () {
    // ...f1 code
    f1.trigger('done');
  }, 1000);
}

f1.on('done', f2)
```
当f1执行完毕之后发送’done‘并切执行f2

- promise
``` js
  Promise.resolve(1)
  .then(res => {
    console.log(res)
    return 2 //包装成 Promise.resolve(2)
  })
  .catch(err => 3)
  .then(res => console.log(res))
```
- 每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
- 如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
- 如果then中出现异常,会走下一个then的失败回调
- 在 then中使用了return，那么 return 的值会被Promise.resolve() 包装
- then中可以不传递参数，如果不传递会透到下一个then中
- catch 会捕获到没有捕获的异常


- await async
- 一个函数如果加上 async ，那么该函数就会返回一个 Promise
``` js
  async function async1() {
    return "1"
  }
  console.log(async1()) // -> Promise {<resolved>: "1"}
```

- 实现一个promise
``` js
class Promise1 {
  constructor(fn) {
      // 执行队列
      this.__watchList = [];
      // 成功结果
      this.__success_res = null;
      // 失败结果
      this.__error_res = null;
      // 状态
      this.__status = "";
      // 下面传入的第一个参数是resolve， 第二个参数是reject
      fn((...args) => {
          // 保存成功数据
          this.__success_res = args;
          // 状态改为成功
          this.__status = "success";
          // 若为异步则回头执行then成功方法
          this.__watchList.forEach(element => {
              element.fn1(...args);
          });
      }, (...args) => {
          // 保存失败数据
          this.__error_res = args;
          // 状态改为失败
          this.__status = "error";
          // 若为异步则回头执行then失败方法
          this.__watchList.forEach(element => {
              element.fn2(...args);
          });
      });
  }

  // then 函数
  then(fn1, fn2) {
      if (this.__status === "success") {
          fn1(...this.__success_res);
      } else if (this.__status === "error") {
          fn2(...this.__error_res);
      } else {
          this.__watchList.push({
              fn1,
              fn2
          })
      }
  }
}

Promise1.all = function(arr) {
    // 存放结果集
    let result = [];
    return Promise1(function(resolve, reject) {
        let i = 0;
        // 进行迭代执行
        function next() {
            arr[i].then(function(res) {
                // 存放每个方法的返回值
                result.push(res);
                i++;
                // 若全部执行完
                if (i === result.length) {
                    // 执行then回调
                    resolve(result);
                } else {
                    // 继续迭代
                    next();
                }
            }, reject)
        }
    })
}

```
