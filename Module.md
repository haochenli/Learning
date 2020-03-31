* CommnJS 模块：
  在 Commonjs中可以导出module.exports = {}，其中也有一个叫做exports的object，两者关系是module.exports = exports他俩指向同一片内存, 
exports这个object只是辛苦帮忙操作module.exports中的内容，但是最终被导出的都是module.exports。 exports只是作为男二在背后默默劳作。

* EsModule模块： exmodule.js:
 ``` js
  'use strict'
  //导出变量
  export const a = '100';  

   //导出方法
  export const dogSay = function(){ 
      console.log('wang wang');
  }

   //导出方法第二种
  function catSay(){
     console.log('miao miao'); 
  }
  export { catSay };

  //export default导出
  const m = 100;
  export default m; 
  //export defult const m = 100;// 这里不能写这种格式。
 ```
 
 导入文件如下：
 ``` js 
 //index.js
'use strict'

import { dogSay, catSay } from './testEs6Export'; //导出了 export 方法 
import m from './testEs6Export';  //导出了 export default 

import * as testModule from './testEs6Export';//as 集合成对象导出

    dogSay();
    catSay();
    console.log(m);
    testModule.dogSay();
    console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
    console.log(testModule.default); // 100
 ```
