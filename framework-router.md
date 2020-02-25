## 实现方式：SPA router的实现方式如下
- 1. 利用url+‘#’的方法，这种方法不会触发页面跳转（向服务器发请求），但是会触发一个`window.addEventListener('hashchange',this.load.bind(this),false)`
  的事件，作为路由的构建方法
  
  

- 2. 利用history：
  对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：（改变history但是页面不改变的性质）

  1.点击浏览器的前进或后退按钮 （监听popState事件）
  2.点击 a 标签（preventDefault a标签，并且pushState）
  3.在 JS 代码中触发 history.pushState 函数
  4.在 JS 代码中触发 history.replaceState 函数


摘自https://juejin.im/post/5d116a9df265da1bb47d717b
