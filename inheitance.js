function Animal(name) {
  this.name = name || 'animal'
}

Animal.prototype.bark = function(sound){console.log(sound || 'bark')}

function Dog() {
  this.type = 'dog'
}

// 一。原型链继承, 父类的实例作为子类的原型
Dog.prototype = new Animal('dog')
// 1、创建一个新对象，如：var person = {};
// 2、新对象的_proto_属性指向构造函数的原型对象。
// 3、将构造函数的作用域赋值给新对象。（也所以this对象指向新对象）
// 4、执行构造函数内部的代码，将属性添加给person中的this对象。
// 5、返回新对象person。
let dog = new Dog('dog')
console.log(dog.name)


// 二。构造继承 继承 ，使用父类的构造函数增强子类
function Cat(name) {
  Animal.apply(this, [name])
}

let cat = new Cat('cat')
console.log(cat.name)

// 三.实例继承 为父类实例添加新特性，作为子类实例返回
function Elephant(name) {
  const instance = new Animal()
  instance.name = name
  return instance
}
let elephant = new Elephant('elephant')
console.log(elephant.name)

// 四.组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
function Bear(name) {
  Animal.apply(this, [name])
}
//需要将子类的原型指向父类的实例, 这样才能继承加在animal上的方法
Bear.prototype = new Animal()
let bear = new Bear('bear')
// Bear.prototype.constructor = Animal.prototype.constructor
console.log(bear.name)
bear.bark('ra')

// 五.寄生组合继承 : 通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

function Human(name) {
  Animal.call(this, name)
}

// Human.prototype = Animal.prototype 这种方式实现之后， 改变human的原型会影响animal的原型链
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Human.prototype = new Super();
})();


let human = new Human('human')
console.log(human.name)
human.bark('haha')