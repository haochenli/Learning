## XSS
cross site script: 用户在信任的网站中被执行了一段恶意js  
可以分成两大类
- 1.持久层： 代码被写进数据库
- 2.非持久层 ： 一般是通过修改URL的参数方式加入攻击代码，比方说是一个搜索页面，搜索的内容会直接append到url中作为请求参数，然后再将请求参数加到dom上。

分类有三种：
1. 反射型： 构造恶意URL让用户主动点击，用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
2. 存储型：在论坛中用户的输入是恶意脚本植入，存储在了服务器中，其他用户再访问该页面的时候就会执行恶意脚本。
3. DOMXSS：攻击者构造出特殊的 URL，其中包含恶意代码。用户打开带有恶意代码的 URL。用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。  

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。


``` html
    <!-- http://www.domain.com?name=<script>alert(1)</script> -->
    <div>{{name}}</div>
```
- 防御方法：
1.过滤输入输出：转义字符： <，>等转义  
2.CSP：通过设置HTTP Header中的 Content-Security-Policy: default-src 'self'
3.HtppOnly ： 实际上HttpOnly并非是为了防御XSS攻击，而是XSS攻击之后的Cookie劫持。




## CSRF
Cross-site request forgery： CSRF 顾名思义，是伪造请求，冒充用户在站内的正常操作
简单理解：用户在网站A授权之后本地浏览器获得到cookie，然后用户在诱导下打开了网站B，此时网站B内通过iframe/img/src等标签发送跨域请求到网站A（并携带上cookie,域名是A，所以发送的是A的cookie）进行不好的操作。

- 防御方法
1. 来源检测：referrer/origin 字段，检查referrer看来源是不是信任的。 好处是简单，缺点是低版本浏览器有可能被篡改这个字段。  
网站A此时知道用户“不好的操作”并非来自用户，而是来自网站B的跨域请求。

2. 双重cookie：服务器生成两个token，合法的请求会获取到所有cookie中的具体值（合法的请求可以`获得`cookie，不合法的请求只能`使用`cookie），然后客户端可以将多的一个cookie2内容放取出并放到url中用来做额外的验证，服务器再验证这个值。（此时url中cookie2的一个值作为验证内容，cookie1会跟随请求自动发过去）

3. JWT：用户正常在A网站授权的同时，服务器生成一个jwt将其发送给用户 在客户端请求的时候除了cookie也要带上这个jwt(比方说放入url中)作为验证

4. Samesite Cookie：HTTP响应头中有Set-Cookie属性，属性有两个值，Strict 和lax，当设置为Strict的时候，伪造的请求是不会带上本地的cookie进行请求，所以这时候CSRF攻击不会生效。

5. CSRF token作为验证：服务器端生成token发送给浏览器，浏览器将其或存在表单组件和a标签上（DOM上） 或者将其作为请求url中的参数。


## 点击劫持
点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。


- 防御方法：
X-FRAME-OPTIONS
JS防御
①X-FRAME-OPTIONS：X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。该响应头有三个属性可选：
DENY，表示页面不允许通过 iframe 的方式展示
SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示


## 中间人劫持
1. 你被DNS劫持了，既在通过网站名寻找ip的这个过程中被攻击了，访问的是别人的服务器
2. 中间人返回自己的证书，里面带上非对称加密的公钥给你
3. 你以为你和正确的服务器在交流，实际上和你交流的是中间人
4. 正确的服务器则把中间人当作了你

- 防止方法：
1. 证书需要CA正规机构颁发（验证证书的合理性）