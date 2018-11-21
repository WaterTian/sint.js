/**
 * @class
 *
 * @param {object} [config] The video options
 * 
 */


const videoDivHtml = '<div class="h5_player" style="width: 100%; height: 100%; margin: 0;padding: 0; border: 0;font: inherit; vertical-align: baseline;"></div>';
const videoTemplate = '<video id="video"  webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" playsinline width="100%"  preload="auto" autoplay:"autoplay", poster="" src="" ></video>';


export default class VideoDom {
	constructor(config) {
		if (config === undefined) config = {}
		config = Object.assign({
			parentElement: document.body,
			// videoUrl: 'http://alcdn.hls.xiaoka.tv/2016121/4c8/834/JQzoRZZaz2zJ5GbS/index.m3u8',
			videoUrl: './assets/video/v1.mp4',
			posterImg: './assets/video/v1.jpg',
		}, config);


		this.parentElement = config.parentElement;

		let videoElement = document.createElement('div');
		videoElement.className = 'video-player';
		videoElement.innerHTML = videoTemplate;
		this.parentElement.appendChild(videoElement);

		this._video = videoElement.querySelectorAll("video")[0];
		this._video.src = config.videoUrl;
		this._video.poster = config.posterImg;

		this._init();
	}

	_init() {
		let _this = this;
		this._video.addEventListener("ended", function() {
			console.log('video ended');
			_this.destroy();
		}, false);
	}
	seek(e) {
		this._video.currentTime = e;
	}
	toPlay() {
		this._video.play();
	}
	toPause() {
		this._video.pause();
	}

	destroy() {
		this._video.remove();

		var _num = this.parentElement.childNodes.length;
		for (var i = 0; i < _num; ++i) {
			this.parentElement.removeChild(this.parentElement.childNodes[0]);
		}
	}

}