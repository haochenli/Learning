function deepTraversal(node) {  
  var nodeList = [];  
  if (node) {  
      var stack = [];  
      stack.push(node);  
      while (stack.length != 0) {  
          var childrenItem = stack.pop();  
          nodeList.push(childrenItem);  
          var childrenList = childrenItem.children;  
          for (var i = childrenList.length - 1; i >= 0; i--)  
              stack.push(childrenList[i]);  
      }  
  }    
  return nodeList;  
}


const traverse = (ndRoot) => {
  const queue = [ndRoot];
  while (queue.length) {        
      const node = queue.shift();
      printInfo(node);

      if (!node.children.length) {
          continue;
      }

      Array.from(node.children).forEach(x => queue.push(x));    
    }
}


