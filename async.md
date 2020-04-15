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
