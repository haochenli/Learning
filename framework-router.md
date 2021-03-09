## 实现方式：SPA router的实现方式如下
- 1. 利用url+‘#’的方法，这种方法不会触发页面跳转（向服务器发请求），但是会触发一个`window.addEventListener('hashchange',this.load.bind(this),false)`
  的事件，作为路由的构建方法
  
  

- 2. 利用history：
  对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：（改变history但是页面不改变的性质）

  1.点击浏览器的前进或后退按钮 （监听popState事件）。
  2.点击 a 标签（preventDefault a标签，并且pushState）   
  3.在 JS 代码中触发 history.pushState 函数  
  4.在 JS 代码中触发 history.replaceState 函数  


```js
  window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  };
  history.pushState({page: 1}, "title 1", "?page=1"); // 会改变url，但是不会触发事件
  history.pushState({page: 2}, "title 2", "?page=2"); // 会改变url，但是不会触发事件
  history.replaceState({page: 3}, "title 3", "?page=3");  // 会改变url，但是不会触发事件，replace history堆栈最上面的元素
  history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}" //后退到page1
  history.back(); // Logs "location: http://example.com/example.html, state: null" //后退最开始
  history.go(2);  // Logs "location: http://example.com/example.html?page=3, state: {"page":3}" // 回到page3
```
