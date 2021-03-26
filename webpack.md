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

### webpack常用的loader：
- babel-loader： es6转换es5
- sass-loader： 将sass转换成css
- vue-loader： 加载vue.js单文件
- esLint-loader: eslint检查js代码
- ts-loader：将ts转换成js

### webpack常用的plugins：
- webpack-bundle-analyzer： 可视化webpack文件输出体积
- terser-webpack-plugin： 支持压缩es6
- bannerPlugins： 加banner的

### webpack的构建流程：
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### Loader和plugins的区别：
- loader，它是一个转换器，比方说css-loader的作用就是将css转换成js的形式，比如将less转换成css文件，单纯的文件转换过程
- plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务（emit after-compile  watch-run）
