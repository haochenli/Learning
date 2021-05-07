- requestAnimationFrame 来做动画 setTimeout...
- webpack treeshacking减少js体积
- GPU加速，will-change:transform，transfrom替代left，right这样。

- 减少http通讯：图片下载用雪碧图，只下载一个图片。多用https缓存。
- 采用CDN来加速资源加载
- 对于JS DOM的优化 

1. 减少请求次数：
- 打包资源，避免请求资源数量过多。
- 使用强缓存/协商缓存。
- 减少请求资源体积（压缩文件）
- 减少渲染过程中对DOM的操作
- 减少回流重绘
