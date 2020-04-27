// Decorator可以用来装饰类

function decorator (name) {
  return function (target) {
    target.prototype.extraThing = name
  }
}
@decorator('haochen')
class Parent {
  age = 12
}

let parent = new Parent()
console.log(parent.extraThing) // haochen

//Decorator可以用来装饰类中的属性

function attributeDecorator (target, name, descriptor) {
    descriptor.writable = false
}
class Parent {
  age = 12
  @attributeDecorator
  sing() {return `${this.age}: ${this.extraThing}`}
}

let parent = new Parent()
parent.sing = () => {console.log('function changed')} // will throw an error if decorator ' @attributeDecorator' works
