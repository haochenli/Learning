
class myPromise {
  constructor(handler) {
    this.status = 'pending'
    this.value
    this.fulfillCb = []
    this.rejectCb = []
    try {
      handler(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  resolve = (value) => {
    if(this.status === 'pending' ){
      this.status = 'fulfill'
      this.value = value
      this.fulfillCb.forEach(cb => cb(this.value))
    }
  }

  finally = (cb) => {
   this.then(() => cb, () => cb)
  }

  catch = (reject) => {
    this.then(null, reject)
  }

  reject = (err) => {
    if(this.status ==='pending') {
      this.status = 'reject'
      this.value = err
      this.rejectCb.forEach(cb => cb(this.value))
    }
  }

  then = (resolveHandler, rejectHandler) => {
    return new myPromise((resolve, reject) => {
      let thenableWrap = () => {
        try{
          let result = resolveHandler(this.value)
          if(resolve instanceof myPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        }
        catch(err){
          reject(err)
        }
      }
      if(this.status === 'fulfill') {
        thenableWrap()
      } else if(this.status === 'reject'){
        rejectHandler()
      } else {
        this.fulfillCb.push(thenableWrap)
        this.rejectCb.push(rejectHandler)
      }
    })
  }

  static all = (arr) => {
    let result = []
    return new myPromise((resolveHandler, rejectHandler) => {
      for(let i = 0 ; i < arr.length; i++) {
        arr[i].then((res) => {
          result.push(res)
          if(result.length === arr.length) {
            resolveHandler(result)
          }
        })
      }
    })
  }

  static race = (arr) => {
    return new myPromise((resolve, reject) => {
      for(let i = 0 ; i < arr.length ; i++) {
        arr[i].then(res => {
          resolve(res)
        })
      }
    })
  }
}


let promise1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hahah')
  }, 1000)
})
let promise2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hahah')
  }, 2000)
})
let promise3 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hahah')
  }, 3000)
})

// promise1.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
myPromise.race([promise1, promise2, promise3]).then(res => {
  console.log(res)
  console.log('wocao?')
})