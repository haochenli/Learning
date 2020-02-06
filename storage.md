## cookie
主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”
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

## http请求：
cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信