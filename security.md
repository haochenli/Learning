- XSS
cross site script: 用户在信任的网站中被执行了一段恶意js

分类有三种：
1. 反射型： 构造恶意URL让用户主动点击
2. 存储型：在论坛中用户的输入是恶意脚本植入，存储在了服务器中，其他用户再访问该页面的时候就会执行恶意脚本。
3. DOMXSS：
- 防御方法
过滤输入输出

- CSRF
Cross-site request forgery： CSRF 顾名思义，是伪造请求，冒充用户在站内的正常操作
简单理解：用户在网站A授权之后本地浏览器获得到cookie，然后用户在诱导下打开了网站B，此时网站B内通过iframe/img/src等标签发送跨域请求到网站A（并携带上cookie）进行不好的操作。

- 防御方法
1. 来源检测：referrer字段，检查referrer看来源是不是信任的。 好处是简单，缺点是低版本浏览器有可能被篡改这个字段。  
网站A此时知道用户“不好的操作”并非来自用户，而是来自网站B的跨域请求。

2. 双重cookie：服务器生成两个token，合法的请求会获取到所有cookie中的具体值（合法的请求可以`获得`cookie，不合法的请求只能`使用`cookie），然后客户端可以将多的一个cookie内容放取出并放到url中用来做额外的验证，服务器再验证这个值。（此时url中cookie2的一个值作为验证内容，cookie1也是一个验证内容）

3. JWT：用户正常在A网站授权的同时，服务器生成一个jwt将其发送给用户 在客户端请求的时候除了cookie也要带上这个jwt(比方说放入url中)作为验证


https://mp.weixin.qq.com/s/qWVdMQkvP8l79ltxr4XdKQ
