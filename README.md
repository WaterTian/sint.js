sint.js - HTML5 Game Framework
=============

[![npm version](https://badge.fury.io/js/sint.js.svg)](https://badge.fury.io/js/sint.js)

Sint based on [PixiJs](http://www.pixijs.com), is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. 

## Learn

- SintJS API [docs](https://watertian.github.io/sint.js/docs/).
- [example](https://github.com/WaterTian/sint-example).

## Usage

#### Include

```html
<script src="dist/sint.min.js"></script>
```
##### Or
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
    pic1: './assets/pic1.png',
    sound0: './assets/sound/bg.mp3',
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
    
    // btn
    var btn = new SINT.SpriteClip(288, 292, 'pic1');
    btn.anchor.set(0.5);
    game.add(btn);

    // audio
    var s0 = SINT.Audios.add('sound0');
    s0.loop=true;
    SINT.Audios.add('sound1');

    // events
    btn.interactive = true;
    btn
        .on('pointerdown', onPointStart)
        .on('pointerup', onPointUp)
        .on('pointerupoutside', onPointUp)
        .on('pointermove', onPointMove);

    function onPointStart(event) {
        // the first audio must be use by interactive Event
        s0.play();
    }
    function onPointMove(event) {
        //console.log(event.data.global)
    }
    function onPointUp(event) {
        SINT.Audios.get('sound1').play();
    }
}



// destroy and remove view
game.removeThis();

```



## License

[MIT](https://opensource.org/licenses/mit-license)



