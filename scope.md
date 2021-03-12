- JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。相反的有动态作用域，即函数的作用域基于函数调用的位置
- 函数的作用域基于函数创建的位置。
- 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

``` js
  var scope = "global scope";
  function checkscope(){
      var scope = "local scope";
      function f(){
          return scope;
      }
      return f();
  }
  checkscope();
```

``` js
  var scope = "global scope";
  function checkscope(){
      var scope = "local scope";
      function f(){
          return scope;
      }
      return f;
  }
  checkscope()();
```

两段代码输出的结果都是 **local scope**

```js
function fun1() {
  console.log(a) // a is not defined,因为在定义a在函数定义的时候就决定了
}

function fun2() {
  var a = 3
  console.log(a) //3

  fun1()
}
fun2()
```


```js
this.n = 1

function fun2() {
  console.log(this.n) // 1, 因为在函数定义的时候就决定了this指向的是window
}
var a = {
  n: 2,
  fun1() {
    fun2()
  },
  fun2
}

a.fun1()
```

- ** 正常情况下 this 指向调用他的上下文 ** // 谁 .xxx，. 之前的上下文就是他的 this。
- 箭头函数的 this 指向他的父作用域的 this（静态作用域、静态作用域、静态作用域）
- new 会创建一个新的对象，this 指向这个对象，详情可以自行了解 new
- call、bind、apply 会改变 this 的指向

