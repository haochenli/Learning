- JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
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
