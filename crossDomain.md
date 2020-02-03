# 通过jsonp跨域
``` html
  <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
 </script>
```
   服务器返回如下
``` js
  handleCallback({"status": true, "user": "admin"})
```
只能实现get一种请求
# document.domain + iframe跨域
https://segmentfault.com/a/1190000011145364
# location.hash + iframe
# window.name + iframe跨域
# postMessage跨域
在a.html中：
``` html
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>
```
在b.html中：
``` html
  <script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```
# 跨域资源共享（CORS）
后台配置：
 'Access-Control-Allow-Credentials': 'true',     
 'Access-Control-Allow-Origin': 'http://www.domain1.com',
# nginx代理跨域
# nodejs中间件代理跨域
中间用nodejs建立一个proxy实现数据的转发
# WebSocket协议跨域
前端代码如下：
``` html
    <div>user input：<input type="text"></div>
    <script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
    <script>
    var socket = io('http://www.domain2.com:8080');

    // 连接成功处理
    socket.on('connect', function() {
        // 监听服务端消息
        socket.on('message', function(msg) {
            console.log('data from server: ---> ' + msg); 
        });

        // 监听服务端关闭
        socket.on('disconnect', function() { 
            console.log('Server socket has closed.'); 
        });
    });

    document.getElementsByTagName('input')[0].onblur = function() {
        socket.send(this.value);
    };
</script>
```

后台代码：
``` js
    var socket = require('socket.io');

    // 启http服务
    var server = http.createServer(function(req, res) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end();
    });

    server.listen('8080');
    console.log('Server is running at port 8080...');

    // 监听socket连接
    socket.listen(server).on('connection', function(client) {
        // 接收信息
        client.on('message', function(msg) {
            client.send('hello：' + msg);
            console.log('data from client: ---> ' + msg);
        });

        // 断开处理
        client.on('disconnect', function() {
            console.log('Client socket has closed.'); 
        });
    });
```