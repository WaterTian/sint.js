const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 500,
	initHeight: 500,
	showFPS: true,
	backgroundColor: 0x2a3145,
};

var game = new SINT.Game(config);


var bg = new SINT.Container();
bg.filterArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
game.add(bg);


var filter = new SINT.magic.HolesFilter();
bg.filters = [filter];


bg.interactive = true;
bg.hitArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
bg.on('pointermove', function(event) {
	var p = event.data.global.clone();

	filter.offset[0] += (p.x / game.initWidth - filter.offset[0]) * 0.1;
	filter.offset[1] += (p.y / game.initHeight - filter.offset[1]) * 0.1;
})


// if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', onOrientation)

// function onOrientation(event) {
// 	// var alpha = event.alpha ? SINT.Unit.degToRad(event.alpha) : 0 // Z
// 	var beta = event.beta ? SINT.Unit.degToRad(event.beta) : 0 // X'
// 	var gamma = event.gamma ? SINT.Unit.degToRad(event.gamma) : 0 // Y''

// 	var _rx = beta;
// 	var _ry = gamma;

// 	filter.offset[0]+=(_rx-filter.offset[0])*0.1;
// 	filter.offset[1]+=(_ry-filter.offset[1])*0.1;
// }