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

- 手写promise
```js

class MyPromise {
  constructor(handler) {
    this.resolveCb = []
    this.rejectCb = []
    this.state = 'pending'
    this.value = null
    try {
      handler(this.resolve, this.reject)
    } 
    catch(err) {
      this.reject(err)
    }
  }

  resolve = (value) => {
    if(this.state === 'pending') {
       this.state = 'fulfill'
      this.value = value
      this.resolveCb.forEach(cb => {
        cb(this.value)
      })
    }
  }

  reject = (err) => {
    if(this.state === 'pending') {
        this.state = 'reject'
        this.value = err
        this.rejectCb.forEach(cb => {
          cb(this.value)
        })
    }
  }
  finally = (cb) => {
    // 调用then相当于将cb放入cb中或者在调用链的最后调用cb
    this.then(() => cb(), () => cb())
  }
  catch = (cb) => {
    return this.then(null, cb)
  }

  then = (resHandler, rejHandler) => {
      let result = new MyPromise((resolve, reject) => {
        let thenWrap = () => {
          try{
            let previousThen = resHandler(this.value)
            if(previousThen instanceof MyPromise) {
              previousThen.then(resolve, reject)
            } else {
              resolve(previousThen)
            }
          } catch (err) {
            reject(err)
          }
   
        }
        let errWrap = () => {
          let error = rejHandler(this.value)
          reject(error)
        }
        if(this.state === 'fulfill') {
          // 当前一个promise状态为fulfill的时候直接执行下一个promise的resolve
          thenWrap()
        } else if(this.state === 'reject') {
          errWrap()
        } else {
          // 当前一个promise状态为pending的时候将下一个promise的resolve存起来
          this.resolveCb.push(thenWrap)
          this.rejectCb.push(errWrap)
        }
      })
      return result
    }
    static race = (arr) => {
      return new MyPromise((resolve, reject) => {
          for(let i = 0 ; i < arr.length; i++) {
            arr[i].then(res => {
              resolve(res)
            })
          }
      })
    }

    static all = (arr) => {
      let stack = []
      return new MyPromise((resolve, reject) => {
        for(let i = 0 ; i < arr.length ; i ++) {
          arr[i].then(res => {
            stack.push(res)
            if(i === arr.length - 1) {
              resolve(stack)
            }
          })
        }  
      })
       
    }
  }

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('done1')
  }, 2000)
})

let promise1 =  new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('done2')
  }, 1000)
})

let promise2 =  new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('done3')
  }, 2000)
})
let newpromise = function(previous) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(previous + ' done!!')
    }, 2000)
  })
}

// 测试链式调用then
promise.then((resolve) => {
  console.log(resolve)
  return newpromise(resolve)
}, (reject) => {
  console.log(reject)
}).then(resolve => {
  console.log('-----------')
  console.log(resolve)
})

// 测试链式调用all
MyPromise.all([promise, promise1, promise2]).then(res => {
  console.log(res)
})

// 测试链式调用race
MyPromise.race([promise, promise1, promise2]).then(res => {
  console.log(res)
})

// 测试finally
let a = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('done')
  }, 2000)
})

a.then(res => console.log(res)).catch(err => console.log(err)).finally((res) => {console.log('done?' + res)})
```

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
class PromiseSelf {
    constructor(fn) {
        this._success_res;
        this._failed_res;
        this._watchList= [];
        this._status;
        fn((args) => {
            this._status = 'success';
            this._success_res = args
            this._watchList.forEach(element => {
                element.successFuc(args)
            });
        }, (args) => {
            this._status = 'failed';
            this._failed_res = args
            this._watchList.forEach(element => {
                element.failedFunc(args)
            });
        })
    }

    then(successFuc, failedFunc) {
        if(this._status === 'success') {
            successFuc(this._success_res)
        } else if (this._status === 'failed'){
            failedFunc(this._failed_res)
        } else {
            this._watchList.push({
                successFuc,
                failedFunc
            })
        }
    }
}

PromiseSelf.all = function (arr) {
    let result = [];
    return new PromiseSelf((resolve, reject) => {
        let i = 0;
        next()
        function next() {
            arr[i].then(function(res) {
                // 存放每个方法的返回值
                result.push(res);
                i++;
                // 若全部执行完
                if (i === arr.length) {
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

var temp = new PromiseSelf((resolve, reject) => {
    setTimeout(() => {
        resolve('done')
    }, 2000)
})

var temp2 = new PromiseSelf((resolve, reject) => {
    setTimeout(() => {
        // resolve('done2')
        // throw new Error('shit')
        reject('shit')
    }, 1000)
})

PromiseSelf.all([temp, temp2]).then(res => {
    console.log(res)
}, reason => {
    console.log('rejected because ' + reason)
})

```
