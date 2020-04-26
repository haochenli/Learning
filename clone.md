- 我们把复制“引用”的拷贝方法称之为浅拷贝，
- 与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。
- 什么array.concat 、 array.slice, 对于正常的数组来说能够达到深拷贝：
``` js
  let array = [1,2,3]
  let newArray = array.slice()
  let newArray2 = array.concat()
```
但是如果对于如下的情况来说，就**不会**达到, 因为数组中的每一项是引用类型，即指针。
``` js
  let array = [{a: 1},{b: 2},{c: 3}]
  let newArray = array.slice()
  let newArray2 = array.concat()
  let newArray3 = array.map(item => item)
  
  let obj = {a:1 ,b:2}
  let newObj = {...obj} // 可以到达深拷贝
  //但是：
  let obj2 = {a: {b:1}, c: {d: 2}}
   let newObj2 = {...obj2} //里面深层的{b: 1}和{d:2}还是达不到深拷贝
  
```


- 以上都是浅拷贝的方法
- object/Array的无脑深拷贝就是JSON.parse(JSON.stringify(obj))
