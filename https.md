## 对称加密
服务器端和客户端同时保存一个公钥，同一份信息通过客户端和服务端的公钥进行加密和解密

## 非对称加密
服务器端保存私钥，客户端保存公钥。私钥加密的内容可以用公钥解密。公钥加密的内容可以用私钥解密。

## 应该如何
服务器先将非对称的公钥发送给客户端，客户端生成对称加密密钥并用发过来的非对称公钥加密之后，发送给服务器。综上所述就是用非对称公钥加密对称加密的密钥，发送的信息最终用对称密钥进行加密。

## 问题所在
但是隔壁老王可以伪装成服务器，与客户端进行交流。

## 接下来的证书
数字证书出现了，例如CA（花钱）颁发的数字证书，用来证明你才是真正的服务器，同时证书中还会储存相应的非对称公钥用来加密对称密钥。

## 证书防伪
数字签名用来做证书防伪，当服务器向CA申请证书的时候会对其摘做hash转换成一个用来防伪的“公戳”，就是数字签名。浏览器用其内置的公钥对证书进行解密与发过来的证书中被CA私钥（第三方拿不到CA私钥）加密的信息进行比较


## http2.0 vs http1.1
- http2.0支持多路复用Multiplexing 一个Tcp中多个http请求是并行的，且可以区分优先级。http1.0中默认有一个pipline（1.1中是connection：open为默认）开启后可以让tcp长连接，但是http请求是串行的，可能会导致队头阻塞。
- HPACK算法加密并且压缩header，服务端和客户端同时缓存一些重复使用的header资源，最终实现拼接。
- 数据压缩 二进制编码传输
- 服务器推送 (比方说客户端请求依赖A，同时依赖A需要依赖B，server会在请求依赖B之前将资源发给客户端)
- 2.0支持长链接，1.0不支持，除非开启Connection: keep-alive，
- network panel中有一个waterfall的TTFB，意思是Time to first byte： 从请求到接受第一个字节所用的时间

## http vs https
- https = http + ssl/tls （安全套接层）

### TCP协议三次握手
- A发送给B（服务器）请求连接，SYN = 1，seq = x（A的序列号）
- B发送给A确定连接，SYN = 1， ACK = 1， seq = y（B的序列号）， ack = x + 1
- A再次发送给B，ACK = 1，seq= x+1（A的序列号），ack = y + 1（B的确认号）

### TCP协议四次挥手
- A发送给B FIN 和seq = x
- B发送给A ACK， seq = u， ack = x + 1
- B在发送给A FIN， ACK， ack = x + 1，seq = y
- A在发送给B ACK， ack = y + 1，seq = x + 1
- 发送FIN只是意味着

### 对于是否合并请求
如果是大资源，不建议合并请求，因为如果有资源过期的话，会需要全部重新下载，可以充分利用浏览器的缓存
如果是小资源，可以合并请求

### 通用首部
Cache-Control: 控制缓存的行为
Connection：逐跳首部，连接的管理
Date：创建报文的日期时间
Pragma：报文指令
Trailer：报文末端的首部一览
Transfer-Encoding：指定报文主体的传输编码方式
Upgrade：升级为其他协议

### 请求首部

Accept: 用户代理可处理的媒体类型
Accept-Charset: 优先的字符集
Accept-Encoding: 优先的内容编码
Accept-Language: 优先的语言
Authorization: web 认证信息
From: 用户的电子邮箱地址
Host: 请求资源所在服务器
if-Match: 比较实体标记
if-Modified-Since: 比较资源的更新时间
if-None-Match: 比较实体标记（与if-Match相反）
if-Range: 资源为更新时发送实体Byte的范围请求
if-Unmodified-Since: 比较资源的更新时间
Referer: 对请求中的 Url 的原始获取方法
User-Agent: HTTP 客户端程序的信息

### 响应首部

Accept-Ranges: 是否接受字节范围请求
Age: 推算资源创建经过时间
ETag: 资源的匹配信息
Location: 令客户端重定向至指定的URL
Proxy-Authenticate: 代理服务器对客户端的认证信息
Rety-After: 对再次发起请求的时机要求
Server: HTTP服务器的安装信息
Vary: 代理服务器缓存的管理信息
WWW-Authenticate: 服务器对客户端的认证信息
