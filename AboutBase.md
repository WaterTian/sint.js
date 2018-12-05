##关于高效渲染的底层

- pixi-gl-core  简化WebGL用法  [github](https://pixijs.io/pixi-gl-core/)
  
  See the components in action [here](http://dev.goodboydigital.com/client/goodboy/million/).
  
- remove-array-items  删除数组中的项 不会留下内存垃圾  [npm](https://www.npmjs.com/package/remove-array-items)
   
   core/utils/index - removeItems  
   core/display/Container - removeChild  removeChildAt   

	```js
	const removeItems = require('remove-array-items')
	const arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	removeItems(arr, 3, 4)  // after running, arr === [ 1, 2, 3, 8, 9 ]
	```

- Bit-Twiddling  直接操作数据的字节来实现对数据的修改功能 [npm](https://www.npmjs.com/package/bit-twiddle)
	
	core/textures/BaseTexture - isPowerOfTwo     .isPow2(v)  判断图像尺寸是否为2的幂次方

- earcut   多边形三角剖分 [npm] (https://www.npmjs.com/package/earcut)
  
  core/utils/index - earcut