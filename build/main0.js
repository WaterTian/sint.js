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


}

