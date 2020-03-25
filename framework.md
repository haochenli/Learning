# react的生命周期：

### 初始化阶段
 - getDefaultProps:获取实例的默认属性
 - getInitialState:获取每个实例的初始化状态
 - componentWillMount：组件即将被装载、渲染到页面上
 - render:组件在这里生成虚拟的 DOM 节点
 - componentDidMount:组件真正在被装载之后

### 运行中状态：

 - componentWillReceiveProps:组件将要接收到属性的时候调用
 - shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
 - componentWillUpdate:组件即将更新不能修改属性和状态
 - render:组件重新描绘
 - componentDidUpdate:组件已经更新

### 销毁阶段：
 - componentWillUnmount:组件即将销毁


### react diff 原理（常考，大厂必考）

- 把树形结构按照层级分解，只比较同级元素。
- 给列表结构的每个单元添加唯一的 key 属性，方便比较。
- React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
- 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
- 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

### Vue从data的change到页面渲染

- 当new一个Vue实例的时候，会执行一个this._init的方法，初始化生命周期、初始化事件、初始化数据initState等。
- _initState中有一个_initData, _initData函数将当前传入的data赋值给vm._data。vm是当前vue实例。然后会执行代理函数proxy,当我们访问vm[key] 就会通过get方法去访问vm[sourceKey][key] 即vm._data[key]。
- 挂载$mount方法，通过自定义Render方法、template、el等生成Render函数。如果传入了模版(template)就将模版里面的内容编译成render函数，否则将传入的el对应的元素的内容编译成render函数。编译是调用compileToFunctions函数完成的。也可以自己手写render函数，可以减少编译这一环节。其中render渲染函数的优先级最高，template次之且需编译成渲染函数，而挂载点el属性对应的元素若存在，则在前两者均不存在时，其outerHTML才会用于编译与渲染。
- 生成render函数后，调用_createElement函数生成vnode。
- 将虚拟DOM映射为真实DOM页面上。

## Vue和React的相似之处
- Virtual Dom  
Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。  
而对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。
- MVVM

## 不同点
- react是JSX语法，强调利用js实现，但是vue是template来实现。
- 双向绑定(数据劫持) vs setState
