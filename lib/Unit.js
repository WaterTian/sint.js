"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUrlStr = getUrlStr;
exports.degToRad = degToRad;
exports.getImageXYData = getImageXYData;
exports.getImageRGBAData = getImageRGBAData;
exports.getTxtImage = getTxtImage;
exports.canvasToImage = canvasToImage;
exports.readFile = readFile;
exports.readJson = readJson;
exports.loadJson = loadJson;
exports.postJson = postJson;
function getUrlStr(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function getImageXYData(img, w, h) {

	var templateCanvas = document.createElement('canvas');
	document.body.appendChild(templateCanvas);
	templateCanvas.width = w;
	templateCanvas.height = h;

	var imgContext = templateCanvas.getContext("2d");
	imgContext.drawImage(img, 0, 0, w, h);

	var imgData = imgContext.getImageData(0, 0, w, h);
	document.body.removeChild(templateCanvas);

	var xyrgbData = [];
	var _hw = w * 0.5;
	var _hh = h * 0.5;
	for (var i = 0; i < h; i += 2) {
		for (var j = 0; j < w; j += 2) {
			var _num = i * w + j;
			var _rgb = [imgData.data[_num * 4], imgData.data[_num * 4 + 1], imgData.data[_num * 4 + 2], imgData.data[_num * 4 + 3]];
			if (imgData.data[_num * 4 + 3] > 0) xyrgbData.push([j - _hw, -i + _hh, _rgb]);
		}
	}
	return xyrgbData;
}

function getImageRGBAData(img, w, h) {

	var templateCanvas = document.createElement('canvas');
	document.body.appendChild(templateCanvas);
	templateCanvas.width = w;
	templateCanvas.height = h;

	var imgContext = templateCanvas.getContext("2d");
	imgContext.drawImage(img, 0, 0, w, h);

	var imgData = imgContext.getImageData(0, 0, w, h);
	document.body.removeChild(templateCanvas);

	return imgData;
}

function getTxtImage(txt) {
	var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

	var c = document.createElement('canvas');
	document.body.appendChild(c);
	c.width = 512;
	c.height = 128;

	var ctx = c.getContext("2d");

	ctx.font = size + "px Verdana";
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = "center";
	ctx.fillText(txt, 256, 64);

	var imgData = c.toDataURL("image/png");
	document.body.removeChild(c);

	var img = document.createElement('img');
	img.src = imgData;
	return img;
}

function canvasToImage(canvas) {
	var gl = canvas.getContext("experimental-webgl", {
		preserveDrawingBuffer: true
	});

	var imgData = canvas.toDataURL("image/png");

	var img = document.createElement('img');
	img.src = imgData;
	return img;
}

function readFile(file) {
	console.log(file.type);

	return new Promise(function (resolve, reject) {
		var reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function (e) {
			if (/image\/\w+/.test(file.type)) console.log('type: /image');else resolve(this.result);
		};

		reader.onerror = function () {
			reject(new Error('Could not load file' + file));
		};
	});
}

function readJson(file) {
	console.log(file.type);

	return new Promise(function (resolve, reject) {
		var reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function (e) {
			resolve(JSON.parse(this.result));
		};

		reader.onerror = function () {
			reject(new Error('Could not load file' + file));
		};
	});
}

function loadJson(url) {
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open("GET", url);
		request.send(null);
		request.onload = function (e) {
			if (request.status == 200) {
				resolve(JSON.parse(this.responseText));
			} else {
				reject(new Error('Could not loadJson'));
			}
		};
	});
}

function postJson(url, sendData) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: url,
			data: sendData,
			success: function success(data) {
				resolve(JSON.parse(data));
			},
			error: function error(jqXHR, textStatus, errorThrown) {
				reject(textStatus);
			}
		});
	});
}
//# sourceMappingURL=Unit.js.map