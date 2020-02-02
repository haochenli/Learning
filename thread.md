- js是单线程的
- 但是浏览器本身是多线程的，其中包括了：GUI渲染线程，JS引擎线程(单线程)，事件触发线程，定时触发器线程，异步http请求线程
- **浏览器设置GUI渲染线程与JS引擎为互斥的关系**，因为js可能会对Dom进行操作，如果不是互斥关系的话，可能会造成渲染进程得到的dom前后不一致。比方说在下面的例子中：
```html
  <style>
	.easy {
		width: 200px;
		height: 200px;
		background: yellow;
	}
	.hard {
		background: blue;
		transition: 2s all;
	}
</style>

<body></body>

<script>
	var body = document.querySelector('body');
	console.log(`1`);
	var cDiv = document.createElement('div');
	console.log(cDiv);
	console.log(`2`);
	body.appendChild(cDiv)
	console.log(body);
	cDiv.classList.add('easy')
	console.log(`3`);
 // ======================
    for(var i = 0;i<3000000000;i++);
	cDiv.classList.add('hard')
	console.log(cDiv)
 // ======================
</script>
```
- 最终的结果是先输出了1，2，3，之后的console。log(node)在for循环结束之后统一打印，看上去像是异步操纵，实际上是同步操作。只是由于js线程和渲染线程互斥，当js执行完毕之后，才会执行渲染进程。
- 在上例中，样式从无 -》 蓝色， **因为这是渲染引擎的优化措施，将两次样式进行了合并**