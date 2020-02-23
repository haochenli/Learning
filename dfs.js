function deepTraversal(node,nodeList) {  
  if (node) {    
          nodeList.push(node);    
          var children = node.children;    
          for (var i = 0; i < children.length; i++) 
    //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
              deepTraversal(children[i],nodeList);    
      }    
  return nodeList;  
}  

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

function inorderTraverse (root) {
  let result = []
  let inorder = (node) => {
    if(node) {
      inorder(node.left)
      // inorder push should be the second, preorder should be the first,post shold be the last
      result.push(node.val)
      inorder(node.right)
    }
  }
  inorder(root)
  return result
}