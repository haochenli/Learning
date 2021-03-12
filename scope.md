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

- 箭头函数的this就是指向定义位置的父级作用域
