import EventEmitter from 'eventemitter3';





/**
 * 
 * @class
 * @extends EventEmitter
 * @memberof SINT
 * 
 * @param {object} [config] The video options
 * @param {HTMLElement} [config.parentElement=document.body] - HTML Element
 * @param {string} [config.videoUrl] - The videoUrl
 * @param {string} [config.posterImg] - The posterImg
 *
 *
 *
 * @example
 * 
 * // <div id="videoContainer" style="position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 100;"></div>
 * 
 * var videoContainer = document.querySelector('#videoContainer');
 * var video1 = new SINT.VideoDom({ parentElement: videoContainer,videoUrl: './assets/video/dino.mp4', posterImg: './assets/video/dino.jpg'});
 * 
 * video1.videoElement.addEventListener('click', function() {
 *     video1.toPlay();
 * });               				 
 *
 * video1.on('ended',function(e){
 *     video1.destroy();
 * })
 *
 * 
 */


export default class VideoDom extends EventEmitter {
    constructor(config) {
        super();

        const videoDivStyle = "position: absolute; z-index: 1000; width: 100%; height: 100%; margin: 0;padding: 0; border: 0;font: inherit; vertical-align: baseline;"
        const videoTemplate = '<video id="video"  webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" playsinline width="100%"  preload="auto"  poster="" src="" ></video>';



        if (config === undefined) config = {}
        config = Object.assign({
            parentElement: document.body,
            // videoUrl: 'http://alcdn.hls.xiaoka.tv/2016121/4c8/834/JQzoRZZaz2zJ5GbS/index.m3u8',
            videoUrl: './assets/video/v1.mp4',
            posterImg: './assets/video/v1.jpg',
        }, config);

        /**
         * The parentElement.
         *
         * @member {HTMLElement}
         */
        this.parentElement = config.parentElement;
        this.parentElement.style.display = 'block'

        /**
         * The videoElement.
         *
         * @member {HTMLElement}
         */
        this.videoElement = document.createElement('div');
        this.videoElement.className = 'video-player';
        // this.videoElement.style = videoDivStyle; // ios9 bug
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.margin = 0;
        this.videoElement.style.padding = 0;
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.videoElement.style.zIndex = 1000;


        this.videoElement.innerHTML = videoTemplate;
        this.parentElement.appendChild(this.videoElement);

        /**
         * The video
         *
         * @member {HTMLVideoElement}
         */
        this._video = this.videoElement.querySelectorAll("video")[0];
        this._video.src = config.videoUrl;
        this._video.poster = config.posterImg;

        this._init();
    }

    _init() {
        let _this = this;

        /**
         * Fired when this video ended.
         *
         * @event SINT.VideoDom#ended
         * @param {HTMLVideoElement} video - The video
         */
        this._video.addEventListener("ended", function() {
            console.log('video_ended');
            _this.emit('ended', _this._video);
        }, false);
        /**
         * Fired when this video playing.
         *
         * @event SINT.VideoDom#playing
         * @param {HTMLVideoElement} video - The video
         */
        this._video.addEventListener("playing", function() {
            console.log("video_playing")
            _this.emit('playing', _this._video);
            if (_this.debugDiv) {
                _this.parentElement.removeChild(_this.debugDiv);
                _this.debugDiv = null;
            }
        }, false);
        /**
         * Fired when this video canplay.
         *
         * @event SINT.VideoDom#canplay
         * @param {HTMLVideoElement} video - The video
         */
        this._video.addEventListener("canplay", function() {
            console.log("video_canplay")
            _this.emit('canplay', _this._video);
        }, false);
        /**
         * Fired when this video waiting.
         *
         * @event SINT.VideoDom#waiting
         * @param {HTMLVideoElement} video - The video
         */
        this._video.addEventListener("waiting", function() {
            console.log("video_waiting")
            _this.emit('waiting', _this._video);
        }, false);

    }

    /**
     * Seek video
     *
     * @param {number} [n] - The video time
     */
    seek(n) {
        this._video.currentTime = n;
    }
    /**
     * Play video
     */
    toPlay() {
        this._video.play();

        // debug for  canvas 上层播放视频 视频不渲染
        this.debugDiv = document.createElement('div');
        this.parentElement.appendChild(this.debugDiv);

    }
    /**
     * Pause video
     */
    toPause() {
        this._video.pause();
    }
    /**
     * destroy
     */
    destroy() {
        this.removeAllListeners();
        this._video.remove();
        if (this.videoElement) {
            this.parentElement.removeChild(this.videoElement);
            this.videoElement = null;
        }
        this.parentElement.style.display = 'none'
    }

}