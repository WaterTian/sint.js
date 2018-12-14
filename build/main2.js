// import VConsole from 'vconsole';
var vConsole = new VConsole();



const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 750,
	initHeight: 1334,
	showFPS: true,
	backgroundColor: 0x2a3145,
};

const assets1 = {
	bg: './assets/bg.png',
	pic1: './assets/pic1.png',
	button: './assets/button.png',
	box: './assets/box.png',
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


var point = new SINT.Point(50, 10);
var pointTo = new SINT.Point(50, 10);
var pointPre = new SINT.Point(50, 10);
var speed = new SINT.Point(0, 10);

function create() {
	game.remove(loadingTxt)

	console.log(SINT.loader.resources);

	//bg image
	var bg = new SINT.SpriteClip(0, 0, 'bg');
	game.add(bg);


	var lines = new SINT.Container();
	game.addChild(lines);

	lines.addChild(new SINT.SpriteClip(50, 0, 'box'));
	lines.addChild(new SINT.SpriteClip(250, 400, 'box'));
	lines.addChild(new SINT.SpriteClip(500, 400, 'box'));

	lines.addChild(new SINT.SpriteClip(50, 400, 'button'));
	lines.addChild(new SINT.SpriteClip(300, 700, 'button'));


	game.stage.interactive = true
	game.stage
		.on('pointerdown', onDragStart)
		.on('pointerup', onDragEnd)
		.on('pointerupoutside', onDragEnd)
		.on('pointermove', onDragMove)

	var mouseFilter = new SINT.magic.BulgePinchFilter([0.5, 0.5], 60, 1.2);
	game.stage.filters = [mouseFilter];

	function onDragStart(event) {
		this.dragging = true
	}

	function onDragEnd(event) {
		this.dragging = false
	}

	function onDragMove(event) {
		if (this.dragging) {
			// var rect1 = new SINT.Rectangle(10, 10, 100, 100);
			// var rect1 = btn1.getBounds();
			var p = new SINT.Point(event.data.global.x, event.data.global.y);
			// console.log(hitTest(lines,p))

			pointTo.copy(p);
		}

	}

	function hitTest(c, p) {
		var _h = false;
		c.children.forEach(function(l, index) {
			if (SINT.Unit.isContainsRect(l.getBounds(), p)) _h = true
		});
		return _h
	}


	//update
	game.ticker.add(function() {
		// if(SINT.Unit.isContainsRect(bg.getBounds(), point))
		if (hitTest(lines, point)) {

			pointPre.copy(point)
			
			point.x += speed.x;
			point.y += speed.y;
			console.log("hit")

			
		}else {
			console.log(pointPre.y +"_"+point.y);

			speed.set(0, 0)

			point.copy(pointPre)

			// var _p = pointPre.clone()
			// _p.x += speed.x;
			// _p.y += speed.y;
			// if (hitTest(lines, _p))
			// {
			// 	point.copy(_p)
			// }
			
		}


		// point.x += (pointTo.x - point.x) * 0.5;
		// point.y += (pointTo.y - point.y) * 0.5;

		

		mouseFilter.center = [point.x / 750, point.y / 1334];
	});
	/// //deviceorientation
	if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', onOrientation)

}

function onOrientation(event) {
	// var alpha = event.alpha ? SINT.Unit.degToRad(event.alpha) : 0 // Z
	var beta = event.beta ? SINT.Unit.degToRad(event.beta) : 0 // X'
	var gamma = event.gamma ? SINT.Unit.degToRad(event.gamma) : 0 // Y''

	// console.log(" beta "+beta+" gamma "+gamma);
	// 
	var _rx = gamma * 10
	var _ry = beta * 10


	speed.set(_rx, _ry)

}



function initVideo() {
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