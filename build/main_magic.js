// import VConsole from 'vconsole';
// var vConsole = new VConsole();


const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 750,
	initHeight: 1334,
	showFPS: true,
	backgroundColor: 0x2a3145,
};

const assets1 = {
	bg: './assets/bg.png',
}

var game = new SINT.Game(config);


game.preload({
	assets: assets1,
	loading: loading,
	loaded: create,
})

function loading(e) {
	console.log("loading1_" + e.progress)
}


function create() {

	//bg image
	var bg = new SINT.SpriteClip(0, 0, 'bg');
	game.add(bg);
}



game.stage.interactive = true
game.stage
	.on('pointerdown', onDragStart)
	.on('pointerup', onDragEnd)
	.on('pointerupoutside', onDragEnd)
	.on('pointermove', onDragMove)

var mouseFilter = new SINT.magic.HolesFilter();
game.stage.filters = [mouseFilter];

function onDragStart(event) {
	this.dragging = true
	this.startPoint = event.data.global.clone();
}

function onDragEnd(event) {
	this.dragging = false
}

function onDragMove(event) {
	if (this.dragging) {
		this.toPoint = event.data.global.clone();

		// mouseFilter.center = [this.toPoint.x / 750, this.toPoint.y / 1334];
	}

}