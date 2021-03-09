### webpack的动态加载：
参考： https://juejin.cn/post/6937086236926410783#heading-8
如下列代码：
```js
  import sayHello from './sayHello';

  console.log(sayHello, sayHello('Gopal'));

  // 单纯为了演示，就是有条件的时候才去动态加载
  if (true) {
    import('./Another.js').then(res => console.log(res))
  }
```
其原理是：import被编译成jsonP形式，
1. 在`requireEnsure`方法中创建一个script标签，src属性为被import的bundle.js文件。并设置一个timeout函数：`onScriptComplete`。
2. `onScriptComplete`函数对各个模块的加载结果进行检查，其加载结果由`webpackJsonpCallback`中设置的`installedChunks[chunkId]`代表，1表示加载成功，0表示没成功，promise表示还在加载
3. 在被import的bundle.js文件中向window["webpackJsonp"]中push模块
4. 在主bundle中将`3`中的push重写成为`webpackJsonpCallback`方法，并对各个模块加载结果进行赋值。
5. 之后会执执行script的onError和onLoad等。
6. 完成
