# Sint - HTML5 Game Framework

[![npm version](https://badge.fury.io/js/alfrid.svg)](https://badge.fury.io/js/alfrid)
======


Sint is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. 
You can use JavaScript or TypeScript for development.




### Installation 
```
npm install;
```

### Development 
```
npm run dev;
```

### Build 
```
npm run build;
``



### Create Your First Sint Example

```javascript

const config = {
    canvas: document.querySelector('#webglStage'), // 容器画布
    showFPS: true, // 显示帧频
    dpi: 1.5, // 分辨率
    autoStart: false, // 自动开始渲染
    backgroundColor: 0x2a3145 // 画布背景色
};

const game = new Sint.Game(config);

// 开始渲染
game.start();

// 暂停
game.pause();
// 继续
game.resume();


// 销毁但不清除 view（即：<canvas>）
game.destroy();
// 销毁并清除 view
game.destroy(true);

```

