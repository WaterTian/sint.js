class Unit {

	getUrlStr(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}


	getImageXYData(img, w, h) {

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

	getImageRGBAData(img, w, h) {

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

	getTxtImage(txt, size = 50) {
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


	canvasToImage(canvas) {
		let gl = canvas.getContext("experimental-webgl", {
			preserveDrawingBuffer: true
		});

		let imgData = canvas.toDataURL("image/png");

		let img = document.createElement('img');
		img.src = imgData;
		return img;
	}


	readFile(file) {
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

	readJson(file) {
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


	loadJson(url) {
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

	postJson(url, sendData) {
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

	// postJson(url, sendData) {
	// 	return new Promise(function(resolve, reject) {
	// 		const request = new XMLHttpRequest();
	// 		request.open("POST", url);
	// 		request.setRequestHeader('content-type', 'application/json');

	// 		request.send(JSON.stringify(sendData));
	// 		request.onreadystatechange = function() {
	// 			if (request.readyState == 4) {
	// 				resolve(this.responseText);
	// 			} else {
	// 				reject(new Error('Could not postJson'));
	// 			}
	// 		}
	// 	});
	// }

}


export default Unit;