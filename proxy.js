let host = {
  name: 'haha',
  age: "12",
  shit: {
    name: 'shit'
  }
}

let proxyHost = new Proxy(host, {
  get: function(target, propert) {
    console.log('with proxy get '+ target[propert])
    return target[propert]
  },
  set: function (target, propert, value) {
    console.log('---------------')
    console.log(propert)
    console.log(value)
    console.log('---------------')
    
    target[propert] = value
    console.log('with proxy set')
  }
})

proxyHost.name = 'haha2'
// console.log(proxyHost.name)

host.shit.name = 'shit2'
console.log(host)

console.log('endendendendendendendend')
proxyHost.extral = 'www'