sint.js - HTML5 Game Framework
=============


Sint based on [PixiJs](http://www.pixijs.com), is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. 
You can use JavaScript for development.

### Learn ###
- Docs: SintJS API [docs](https://watertian.github.io/SINT/docs/).

### Setup ###

#### NPM Install

```sh
npm install sint.js
npm install sint.js --registry http://npm.vipkid.com.cn
```

```js
import * as SINT from 'sint.js'
```



### Create Your First Sint Example ###

```js

const config = {
    canvas: document.querySelector('#webglStage'), // 容器画布
    initWidth: 750,
    initHeight: 1334,
    showFPS: true,
    backgroundColor: 0x2a3145,// 画布背景色
    
    assets: {
        bg: './assets/bg.jpg',
        spineboy: './assets/spineboy.json',
        fighter: './assets/fighter.json',
        sound1: './assets/sound/s1.mp3',
    }
};

const game = new SINT.Game(config,loading,create);

function loading(_pr) {
    console.log('loading ' + _pr);
}

function create() {

    // bg image
    let bg = new SINT.SpriteClip(0, 0, 'bg');
    game.add(bg);
    
    // events
    bg
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);


    // Animated
    let ac1 = new SINT.AnimatedClip(400, 600, 'fighter');
    game.add(ac1);
    ac1.anchor.set(0.5);
    ac1.play();

    // spine
    let spineBoy = new SINT.SpineClip(game.initWidth/2 , game.initHeight , 'spineboy');
    game.add(spineBoy);
    spineBoy.play('walk');
    spineBoy.interactive = true;
    spineBoy.on('pointerdown', function() {
        spineBoy.play('jump', false);
        // spineBoy.state.addAnimation(0, 'walk', true);
    });


    // 播放音乐
    game.playSound('sound1');
    
    // 暂停
    game.pauseSound('sound1');
    // 停止所有音乐
    game.stopAllSound();
}



// 销毁并清除 view
game.removeThis();

```


### How to build ###

```sh
npm install
```

```sh
npm run dev
```

```sh
npm run dist
```
