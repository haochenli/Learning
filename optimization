### 从框架角度：Vue的
1. functional components： 函数试组件不会有状态，不会有响应数据，生命周期等
2. v-show代替v-if, v-show 类似于display：none。 v-if则需要移除并重新创建vnode节点
3. keep-alive来缓存组件，其实就是做了个缓存vnode，可以配置include和exclude
4. Local variables：尽量使用一个本地变量来保存this.props这样的属性，因为每次都使用this.的话会触发其getter等引起一系列的反应
