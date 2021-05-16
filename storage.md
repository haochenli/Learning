## cookie
- 主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”    

- cookie是可以跨域的，但是要前端设置（withCredentials:true）
后端也要设置（"Access-Control-Allow-Credentials“：“true” 
"Access-Control-Allow-Origin"：”yourdomain“不能是*）才能够实现cookie的跨域，这里跨域
这里的跨域比方说你在域名为aaa.com的网站上，会有一个向bbb.com的请求，那么你向aaa.com的请求中cookie浏览器会自动处理，但是向bbb.com的跨域请求不会自动携带bbb.com的cookie，需要进行上述配置才行


## localStorage
除非主动删除，否则永久保存

## sessionStorage
它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，sessionStorage 中的数据就会被清空。


## 生命周期：
cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

localStorage：除非被手动清除，否则将会永久保存。

sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

## 存放数据大小：
cookie：4KB左右

localStorage和sessionStorage：可以保存5MB的信息。

## http请求
cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

## cookie:
浏览器发送请求之后，服务器返回set-Cookie，告诉浏览器把这个cookie给设置上，之后浏览器的请求都会带上这个cookie。

## session
服务器返回的cookie中会带着sessionID，而该sessionId绑定的相关信息会保存在服务器上，用户每次发请求带着cookie和其内的sessionId，服务器根据sessionId返回用户的状态。

## token
服务器生成一个token，并且存放在session之中，浏览器端获取到token之后，存放在本地（attaker比较困难获取到），每次发送请求的时候都带上
