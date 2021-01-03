let Parent = function(name, age) {
  this.name = name;
  this.age = age;
}
console.log(Parent.constructor())
Parent.prototype.callName = function() {
  console.log(this.name);
}

// let parent = new Parent('Haochen', '28');
// console.log(parent)

let newMethod = function(ancster, ...args) {
  let result = Object.create({})
  result.__proto__ = ancster.prototype;
  ancster.call(result, ...args)
  return result;
}

let parent2 = newMethod(Parent, 'haha', '1');

parent2.callName()
console.log(parent2)