// import VConsole from 'vconsole';
var vConsole = new VConsole();



const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 750,
	initHeight: 1334,
	showFPS: true,
	backgroundColor: 0x2a3145,
	// transparent: true,
};

const assets1 = {
	bg: './assets/bg.png',
	pic1: './assets/pic1.png',
	fish1: './assets/displacement_fish1.png',
	fish2: './assets/displacement_fish2.png',
	fish3: './assets/displacement_fish3.png',
	fish4: './assets/displacement_fish4.png',
	sound0: './assets/sound/bg.mp3',
	sound1: './assets/sound/s1.mp3',
	sound2: './assets/sound/s2.mp3',
}
const assets2 = {
	icon1: './assets/icon1.png',
	pic2: './assets/pic2.png',
	fighter: './assets/fighter.json',
}

// console.log(SINT);

var game = new SINT.Game(config);

var loadingTxt = new SINT.TextClip(game.initWidth / 2, 600, '0%', {
	fontFamily: 'Arial',
	fontSize: 42,
	fontWeight: 'bold',
	fill: ['#d2497d', '#5a7cd3']
})
loadingTxt.anchor.set(0.5)
game.add(loadingTxt)

game.preload({
	assets: assets1,
	loading: loading,
	loaded: create,
})

function loading(e) {
	console.log("loading1_" + e.progress)
	loadingTxt.text = e.progress + '%'
}


function create() {
	game.remove(loadingTxt)

	console.log(SINT.loader.resources);

	// audio
	var s0 = SINT.Audios.add('sound0');
	s0.loop = true;
	SINT.Audios.add('sound1');

	// setTimeout(function(){
	// 	s1.play();
	// },5000)

	// let s1 = new SINT.Sound(SINT.loader.resources.sound0);
	// s1.play();
	// console.log(s1);


	//bg image
	var bg = new SINT.SpriteClip(0, 0, 'bg');
	game.add(bg);

	//Container
	var fishsContainer = new SINT.Container();
	game.add(fishsContainer);
	// SINT.magic.doTwist(fishsContainer, [500, 500], 400, 2, false);



	var fishs = [];
	for (var i = 0; i < 2000; i++) {
		var id = 'fish' + ((i % 4) + 1);
		var fish = new SINT.SpriteClip(0, 0, id);
		fish.tint = Math.random() * 0xff3300;
		fish.alpha = 0.3 + Math.random() * 0.8;
		fish.anchor.set(0.5);
		fish.scale.set(0.2 + Math.random() * 0.2);
		// scatter them all
		fish.x = Math.random() * game.initWidth;
		fish.y = Math.random() * game.initHeight;

		fish.direction = Math.random() * Math.PI * 2;
		fish.turningSpeed = Math.random() - 0.8;
		fish.speed = (2 + Math.random() * 2) * 2;
		fish.offset = Math.random() * 100;
		fishs.push(fish);
		fishsContainer.addChild(fish);
	}

	//btn
	var btns = new SINT.Container();
	game.addChild(btns);
	var btnss = new SINT.Container();
	btns.addChild(btnss);
	var btn1 = new SINT.SpriteClip(288, 292, 'pic1');
	btnss.addChild(btn1);
	btn1.anchor.set(0.5);
	btn1.interactive = true;
	btn1.on('pointerdown', function() {
		SINT.Tween.to(btn1.scale, .6, {
			x: 1.2,
			y: 1.2,
			ease: Elastic.easeOut,
			onComplete: function() {
				SINT.Tween.to(btn1.scale, .4, {
					x: 1,
					y: 1,
				});
				///////////////////
				initPart2();

				SINT.magic.doTwist(game.stage, [400, 800], 600, 2, true);
				// SINT.magic.doGlitch(game.stage, 2, true);
			}
		});

		s0.play();
	})


	//Text
	var t = new SINT.TextClip(500, 200, 'Video', {
		fontFamily: 'Arial',
		fontSize: 50,
		fontStyle: 'italic',
		fontWeight: 'bold',
		fill: '#ffffff', 
	});
	game.add(t);
	t.interactive = true;
	t.on('pointerdown',initVideo);


	var fishBounds = new SINT.Rectangle(-100, -100,
		game.initWidth + 100 * 2, game.initHeight + 100 * 2);

	//update
	game.ticker.add(function() {
		//fish
		for (var i = 0; i < fishs.length; i++) {
			var fish = fishs[i];
			fish.direction += fish.turningSpeed * 0.01;
			fish.x += Math.sin(fish.direction) * (fish.speed * fish.scale.y);
			fish.y += Math.cos(fish.direction) * (fish.speed * fish.scale.y);
			fish.rotation = -fish.direction - Math.PI / 2;

			// wrap the maggots
			if (fish.x < fishBounds.x) {
				fish.x += fishBounds.width;
			} else if (fish.x > fishBounds.x + fishBounds.width) {
				fish.x -= fishBounds.width;
			}
			if (fish.y < fishBounds.y) {
				fish.y += fishBounds.height;
			} else if (fish.y > fishBounds.y + fishBounds.height) {
				fish.y -= fishBounds.height;
			}
		}
	});
}




var part2 = false;

function initPart2() {
	if (part2) return;
	part2 = true;
	console.log("preload2")
	game.add(loadingTxt)
	game.preload({
		assets: assets2,
		loading: function(e) {
			console.log("loading2_" + e.progress)
		},
		loaded: createPart2,
	})
}

function createPart2() {
	console.log("createPart2")
	game.remove(loadingTxt)

	//btn
	var btn2 = new SINT.SpriteClip(28, 900, 'pic2');
	btn2.addChild(new SINT.TextClip(10, 56, '卸载卸载卸载卸载卸载卸载卸载卸载卸载'));
	game.add(btn2);
	btn2.interactive = true;
	btn2.on('pointerdown', function() {
		game.removeThis();

		game = new SINT.Game(config);
		game.preload({
			assets: assets1,
			loading: loading,
			loaded: create,
		})
	})

	//icon1
	var icon1 = new SINT.SpriteClip(28, 1100, 'icon1');
	game.add(icon1);
	var icon2 = new SINT.SpriteClip(228, 1100, 'icon1');
	game.add(icon2);
	SINT.magic.doDye(icon2, 0x7067c5);

	//Text
	var t1 = new SINT.TextClip(30, 600, 'Game1 * -> 课前游戏 -> 1234文本', {
		fontFamily: 'Arial',
		fontSize: 50,
		fontStyle: 'italic',
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'], // gradient
		stroke: '#4a1850',
		strokeThickness: 5,
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / 6,
		dropShadowDistance: 6,
		wordWrap: true,
		wordWrapWidth: 400
	});
	game.add(t1);



	//Animated
	var ac1 = new SINT.AnimatedClip(400, 600, 'fighter');
	game.add(ac1);
	ac1.anchor.set(0.5);
	ac1.animationSpeed = 40 / 60;
	ac1.interactive = true;
	ac1.on('pointerdown', function() {
		console.log("fly")
		ac1.play();
		SINT.Tween.to(ac1, 1, {
			y: -150,
			ease: Strong.easeOut,
			onComplete: function() {
				ac1.y = game.initHeight;
			}
		});
		SINT.Tween.to(ac1, 2, {
			y: 600,
			delay: 1,
			ease: Strong.easeInOut,
			onComplete: function() {
				ac1.stop();
			}
		});


		SINT.magic.doDye(ac1, 0x00ff00);

		SINT.Audios.get('sound1').play();
	})



	var ac2 = new SINT.AnimatedClip(600, 1000, ['fish1', 'fish2', 'fish3', 'fish4']);
	game.add(ac2);
	ac2.anchor.set(0.5);
	ac2.animationSpeed = 3 / 60;
	ac2.play();


	var textures = [];
	for (var i = 0; i < 4; i++) {
		textures.push(SINT.Texture.fromImage('./assets/mc/hao' + i + '.png'));
	}
	var as = new SINT.AnimatedSprite(textures);
	game.add(as);
	as.position.set(500, 800);
	as.animationSpeed = 0.1;
	as.anchor.set(0.5);
	as.scale.set(0.6);
	as.play();


}


var mouseFilter = new SINT.magic.BulgePinchFilter([0.5, 0.5], 200, 1.2);

game.stage.interactive = true
game.stage
	.on('pointerdown', onDragStart)
	.on('pointerup', onDragEnd)
	.on('pointerupoutside', onDragEnd)
	.on('pointermove', onDragMove)


function onDragStart(event) {
	this.dragging = true
	this.startPoint = event.data.global.clone();
	game.stage.filters = [mouseFilter];
	mouseFilter.center = [this.startPoint.x / 750, this.startPoint.y / 1334];

}

function onDragEnd(event) {
	this.dragging = false
	SINT.Tween.to(mouseFilter, .3, {
		radius: 0,
	});
}

function onDragMove(event) {
	if (this.dragging) {
		this.toPoint = event.data.global.clone();
		// let angle = SINT.Unit.getPointAngle(this.startPoint,this.toPoint);
		// console.log(angle);

		mouseFilter.center = [this.toPoint.x / 750, this.toPoint.y / 1334];
		mouseFilter.radius += (200 - mouseFilter.radius) * 0.8;
	}

}






function initVideo(){
	var videoContainer = document.querySelector('#videoContainer');
	var video1 = new SINT.VideoDom({
		parentElement: videoContainer,
		videoUrl: './assets/video/dino.mp4',
		posterImg: './assets/video/dino.jpg'
	});

	video1.toPlay();

	video1.videoElement.addEventListener('click', function() {
		video1.destroy();
	});

	video1.on('ended', function(e) {
		video1.destroy();
	})
}