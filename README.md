sint.js - HTML5 Game Framework
=============

[![npm version](https://badge.fury.io/js/sint.js.svg)](https://badge.fury.io/js/sint.js)

Sint based on [PixiJs](http://www.pixijs.com), is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. 
You can use JavaScript for development.

## Learn

- Docs: SintJS API [docs](https://watertian.github.io/sint.js/docs/).

## Usage

#### Install

```html
<script src="dist/sint.min.js"></script>
```
##### Or use npm
[![anix](https://nodei.co/npm/sint.js.png)](https://npmjs.org/package/sint.js)

```sh
npm install sint.js
npm install sint.js --registry http://npm.vipkid.com.cn
```
```js
import * as SINT from 'sint.js'
```


### Create Your First Sint Example


```js
const config = {
    canvas: document.querySelector('#webglStage'), // HTMLElement
    initWidth: 750,
    initHeight: 1334,
    showFPS: true,
    backgroundColor: 0x2a3145,
};
const assets = {
    bg: './assets/bg.jpg',
    fighter: './assets/fighter.json',
    sound1: './assets/sound/s1.mp3',
}
const game = new SINT.Game(config);

game.preload({
    assets: assets,
    loading: loading,
    loaded: create,
})

function loading(_pr) {
    console.log('loading ' + _pr);
}

function create() {
    // bg image
    var bg = new SINT.SpriteClip(0, 0, 'bg');
    game.add(bg);
    
    // events
    bg
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    // Animated
    var ac1 = new SINT.AnimatedClip(400, 600, 'fighter');
    game.add(ac1);
    ac1.anchor.set(0.5);
    ac1.play();


    // sound
    game.playSound('sound1');
    game.pauseSound('sound1');
    game.stopAllSound();
}

// 销毁并清除 view
game.removeThis();

```


### Public Sound Example

```js
// Use PIXI.loader system
SINT.loader.add('s1', './assets/sound/s1.mp3');
SINT.loader.load(function(loader, resources) {
    var sound1 = loader.resources['s1'].sound;
    sound1.loop = true;
    sound1.play();
});

// Instance from source
SINT.Sound.from({
    url: 'assets/sound/s2.mp3',
    autoPlay: true,
    // loop:true,
    loaded : function() {
        console.log('Sound loaded');
    },
    complete: function() {
        console.log('Sound finished');
    }
});

```


## License

[MIT](https://opensource.org/licenses/mit-license)



