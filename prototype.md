``` js
const o = { name: 'zhangsan', age: 24 };
const oFun = function(){
    this.name = "lisi";
    this.age = 23;
}
```
上述的object中打印出只有__proto__
而方法中存在 __proto__ 和 prototype


1.所有对象都有__proto__属性。

2.只有函数对象才有prototype属性。

3.protoype对象默认有两个属性：constructor 和 proto。

4.实例对象的__proto__指向的是函数的protoype

5.函数对象的prototype属性是外部共享的，而__proto__是隐式的。

6.函数和Object的__proto__的顶端是null


``` js
   function Foo() {}
   let f1 = new Foo;
```
<img alt="__proto__和prototype的区别" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2019/3/5/1694cb5d23b31105?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="680" data-height="546" src="https://user-gold-cdn.xitu.io/2019/3/5/1694cb5d23b31105?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">







<img src="https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png" alt="原型链示意图" style="max-width:100%;">

当new一个实例时发生的事情
``` js
  var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    Constructor.apply(obj, arguments);

    return obj;
```
1. 新建一个对象
2. 新建对象的原型指向构造函数的原型
3. 将构造函数的this指向新的obj，并执行该构造函数
4。返回构造函数

- 构造函数本身没有返回值，但是如果返回值是一个对象，则最终生成的实例为这个对象， 如果返回值是一个基本类型，则实例该是什么样子就还是什么样子
