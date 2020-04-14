** web workers:
-  在主进程之外单独创建一个线程，用来执行expensive script
-  它没有dom权限
-  与主线程通讯需要调用postMessage，监听的话用onmessage
-  web worker 只针对每个tab

** service workers:
 - 理解成为主线程和network之间的一个代理，它可以拦截请求，将cache中的东西返回
 - 其生命周期为 安装（缓存静态资源）=》激活 =》 处理fetch
 - service worker针对所有tab
   
