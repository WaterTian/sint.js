const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 500,
	initHeight: 500,
	showFPS: 1,
	backgroundColor: 0x2a3145,
};

var game = new SINT.Game(config);


var bg = new SINT.Container();
bg.filterArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
game.add(bg);


var filter = new SINT.magic.HolesFilter(0xf0f0f0, 0xf0f0f0,0.2,0.0);
bg.filters = [filter];

SINT.Tween.to(filter, 5, {
	zoom: 0.7,
});

var filterColor1 = {
	r: 250,
	g: 250,
	b: 250,
}
var filterColor2 = {
	r: 250,
	g: 250,
	b: 250,
}

SINT.Tween.to(filterColor1, 5, {
	r: 74,
	g: 119,
	b: 138,
	onUpdate: () => {
		filter.color1 = [filterColor1.r, filterColor1.g, filterColor1.b];
	}
});
SINT.Tween.to(filterColor2, 5, {
	r: 243,
	g: 249,
	b: 241,
	onUpdate: () => {
		filter.color2 = [filterColor2.r, filterColor2.g, filterColor2.b];
	}
});


bg.interactive = true;
bg.hitArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
bg.on('pointermove', function(event) {
	var p = event.data.global.clone();

	filter.offset[0] += (p.x / game.initWidth - filter.offset[0]) * 0.1;
	filter.offset[1] += (p.y / game.initHeight - filter.offset[1]) * 0.1;
})





if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', onOrientation)

function onOrientation(event) {
	// var alpha = event.alpha ? SINT.Unit.degToRad(event.alpha) : 0 // Z
	var beta = event.beta ? SINT.Unit.degToRad(event.beta) : 0 // X'
	var gamma = event.gamma ? SINT.Unit.degToRad(event.gamma) : 0 // Y''

	var _rx = beta;
	var _ry = gamma;

	filter.offset[0]+=(_rx-filter.offset[0])*0.1;
	filter.offset[1]+=(_ry-filter.offset[1])*0.1;
}