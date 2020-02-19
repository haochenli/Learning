- DOM0,DOM2,DOM3是三个版本

DOM0级主要定义的是HTML和XML文档的底层结构。DOM2和DOM3级别则在这个结构的基础上引入了更多的交互能力，也支持了更高级的XML特性。为此DOM2和DOM3级分为许多模块（模块之间具有某种关联），分别描述了DOM的某个非常具体的子集。

- DOM0级事件处理方式：
```js
  var btn = document.getElementById("btn");
  btn.onclick = function(){
      alert(this.id);//this指定当前元素btn

  }
```


- DOM2级事件处理方式
``` js
  addEventListener(eventName,func,isPuhuo);
    removeEventListener(eventName,func,isPuhuo);
```
因为2级DOM的事件传播分三个阶段进行。
1.capturing阶段，事件从Document对象沿着文档树向下传播给节点。如果目标的任何一个祖先专门注册了事件监听函数，那么在事件传播的过程中就会运行这些函数。
2.下一个阶段发生在目标节点自身，直接注册在目标上的适合的事件监听函数将运行。
3.是bubbling阶段，这个阶段事件将从目标元素向上传播回Document对象（与capturing相反的阶段）。虽然所有事件都受capturing阶段的支配，但并不是所有类型的事件都bubbling。（0级DOM事件模型处理没有capturing阶段）



事件对象常用属性
type 被触发的事件的类型
target 事件的目标
currentTarget 注册这个事件监听的对象
事件对象常用方法
preventDefault() 取消事件的默认行为
stopPropagation() 阻止事件继续传播（冒泡和捕获），不包括在当前节点上其他的事件监听函数。
stopImmediatePropagation() **比方说在此节点上的所有的click事件，因为多个addEventListener是按照顺序加入的dom上，有了这个属性之后的事件不全不触发**