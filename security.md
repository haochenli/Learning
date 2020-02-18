- XSS
cross site script: 用户在信任的网站中被执行了一段恶意js

- 防御方法
过滤输入输出

- CSRF
Cross-site request forgery： CSRF 顾名思义，是伪造请求，冒充用户在站内的正常操作

- 防御方法
1。 referrer字段，检查referrer看来源是不是信任的。 好处是简单，缺点是低版本浏览器有可能被篡改这个字段。

2. 请求的时候增加自定义头，放入token来验证请求用户的身份