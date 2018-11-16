/**
 * @example
 * // Get url parameter
 * console.log(SINT.Unit.getUrlStr('id'));
 *
 * // Convert deg to Rad
 * console.log(SINT.Unit.degToRad(30));
 *
 * // Load json
 * SINT.Unit.loadJson('*.json').then(function(json) {
 *     console.log(json);
 * }, function(error) {
 *     console.error('loadJson Erro', error);
 * }
 *
 * // Post json
 * let sendData = {'idStr': '***'};
 * SINT.Unit.postJson('..*.php', sendData).then(function(data) {
 *     console.log(JSON.parse(data.jsonStr));
 * }, function(error) {
 *     console.error('postJson Erro', error);
 * }
 * 
 * @namespace SINT.Unit
 */


/**
 * @memberof SINT.Unit
 * @function getUrlStr
 * @param {string} [name]
 * @return {string} The string url parameter
 */
export function getUrlStr(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/**
 * @memberof SINT.Unit
 * @function degToRad
 * @param {number} [degrees]
 * @return {number} The number of Rad
 */
export function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

/**
 * @memberof SINT.Unit
 * @function getImageXYData
 * @param {HTMLImageElement} [img] - the source object of the texture.
 * @param {number} [w] - width
 * @param {number} [h] - height
 * @return {number[]} - An array representing the [R, G, B] of the color.
 */
export function getImageXYData(img, w, h) {

	let templateCanvas = document.createElement('canvas');
	document.body.appendChild(templateCanvas);
	templateCanvas.width = w;
	templateCanvas.height = h;

	let imgContext = templateCanvas.getContext("2d");
	imgContext.drawImage(img, 0, 0, w, h);

	let imgData = imgContext.getImageData(0, 0, w, h);
	document.body.removeChild(templateCanvas);


	let xyrgbData = [];
	let _hw = w * 0.5;
	let _hh = h * 0.5;
	for (let i = 0; i < h; i += 2) {
		for (let j = 0; j < w; j += 2) {
			let _num = i * w + j;
			let _rgb = [imgData.data[_num * 4], imgData.data[_num * 4 + 1], imgData.data[_num * 4 + 2], imgData.data[_num * 4 + 3]];
			if (imgData.data[_num * 4 + 3] > 0) xyrgbData.push([j - _hw, -i + _hh, _rgb]);
		}
	}
	return xyrgbData;
}

/**
 * @memberof SINT.Unit
 * @function getImageRGBAData
 * @param {HTMLImageElement} [img] - the source object of the texture.
 * @param {number} [w] - width
 * @param {number} [h] - height
 * @return {number[]} - An array representing the [R, G, B ,A] of the color.
 */
export function getImageRGBAData(img, w, h) {

	let templateCanvas = document.createElement('canvas');
	document.body.appendChild(templateCanvas);
	templateCanvas.width = w;
	templateCanvas.height = h;

	let imgContext = templateCanvas.getContext("2d");
	imgContext.drawImage(img, 0, 0, w, h);

	let imgData = imgContext.getImageData(0, 0, w, h);
	document.body.removeChild(templateCanvas);

	return imgData;
}

/**
 * @memberof SINT.Unit
 * @function getTxtImage
 * @param {string} [txt] - the string of text.
 * @param {number} [size] - the font size of text.
 * @return {HTMLImageElement} - img Element.
 */
export function getTxtImage(txt, size = 50) {
	let c = document.createElement('canvas');
	document.body.appendChild(c);
	c.width = 512;
	c.height = 128;

	let ctx = c.getContext("2d");

	ctx.font = size + "px Verdana";
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = "center";
	ctx.fillText(txt, 256, 64);

	let imgData = c.toDataURL("image/png");
	document.body.removeChild(c);

	let img = document.createElement('img');
	img.src = imgData;
	return img;
}

/**
 * @memberof SINT.Unit
 * @function canvasToImage
 * @param {HTMLCanvasElement} [canvas] - the source object of the texture.
 * @return {HTMLImageElement} - img Element.
 */
export function canvasToImage(canvas) {
	let gl = canvas.getContext("experimental-webgl", {
		preserveDrawingBuffer: true
	});

	let imgData = canvas.toDataURL("image/png");

	let img = document.createElement('img');
	img.src = imgData;
	return img;
}


export function readFile(file) {
	console.log(file.type);

	return new Promise(function(resolve, reject) {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function(e) {
			if (/image\/\w+/.test(file.type)) console.log('type: /image');
			else resolve(this.result);
		}

		reader.onerror = function() {
			reject(new Error('Could not load file' + file));
		};
	});
}



export function readJson(file) {
	console.log(file.type);

	return new Promise(function(resolve, reject) {
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function(e) {
			resolve(JSON.parse(this.result));
		}

		reader.onerror = function() {
			reject(new Error('Could not load file' + file));
		};
	});
}

/**
 * @memberof SINT.Unit
 * @function loadJson
 * @param {string} [url] - the json url.
 * @return {Promise} - Promise
 */
export function loadJson(url) {
	return new Promise(function(resolve, reject) {
		const request = new XMLHttpRequest();
		request.open("GET", url);
		request.send(null);
		request.onload = function(e) {
			if (request.status == 200) {
				resolve(JSON.parse(this.responseText));
			} else {
				reject(new Error('Could not loadJson'));
			}
		}
	});
}

/**
 * @memberof SINT.Unit
 * @function postJson
 * @param {string} [url] - the json url.
 * @param {object} [sendData] - the object of data.
 * @return {Promise} - Promise
 */

export function postJson(url, sendData) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
			url: url,
			data: sendData,
			success: function(data) {
				resolve(JSON.parse(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				reject(textStatus);
			}
		});
	});
}