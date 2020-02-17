var _ = {};
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      var position = 0, len = args.length;
      console.log(args)
      for(var i = 0; i < len; i++) {
        if(args[i] === _) {
          args[i] = arguments[position++]
        } else {
          args[i] = args[i]
        }
      }
      while(position < arguments.length){
        args.push(arguments[position++])
      }
      return fn.apply(this, args);
  };
};

function partialEz(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      var newArgs = args.concat([].slice.call(arguments));
      console.log(newArgs)
      return fn.apply(this, newArgs);
  };
}
var subtract = function(a, b ) { return b - a};
subFrom20 = partial(subtract, _, 20)
console.log(subFrom20(5))

let sunFrom20_2 = partialEz(subtract, 20)
console.log(sunFrom20_2(4))