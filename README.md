# Sint - HTML5 Game Framework


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
    initWidth: 750,
    initHeight: 1334,
    showFPS: true,
    backgroundColor: 0x2a3145,// 画布背景色
    
    assets: {
        bg: './assets/bg.jpg',
        spineboy: './assets/spineboy.json',
        sound1: './assets/sound/s1.mp3',
    }
};

const game = new SINT.Game(config,loading,create);

function loading(_pr) {
    console.log('loading ' + _pr);
}

function create() {
    console.log(SINT.ASSETS);

    //bg image
    var bg = new SINT.Sprite(SINT.ASSETS['bg'].texture);
    game.add(bg);

    //spine
    var spineBoy = new SINT.SpineClip(game.initWidth/2 , game.initHeight , 'spineboy');
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
    SINT.sound.pause('sound1');
    // 停止所有音乐
    SINT.sound.stopAll();
}





// 开始渲染
game.start();
// 暂停
game.pause();
// 继续
game.resume();



// 销毁并清除 view
game.removeThis();

```

