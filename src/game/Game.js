import * as core from '../core';
// import Stats from 'stats.js';

import * as loaders from '../loaders';


core.utils.skipHello();
core.settings.PRECISION_FRAGMENT = 'highp';

/**
 * @class
 * @extends SINT.Application
 * @memberof SINT
 * 
 * @param {object} [config] The Game options
 * @param {HTMLElement} [config.domElement] - HTML Element
 * @param {number} [config.initWidth=750] - The Game width
 * @param {number} [config.initHeight=1334] - The Game height
 * @param {boolean} [config.showFPS=true]
 * @param {number} [config.backgroundColor=0x000000] - The backgroundColor
 */


export default class Game extends core.Application {

    constructor(config) {
        if (config === undefined) config = {}
        config = Object.assign({
            domElement: null,
            initWidth: 750,
            initHeight: 1334,
            showFPS: true, // 显示帧频
            backgroundColor: 0x000000, // 画布背景色
        }, config);


        super({
            width: config.initWidth,
            height: config.initHeight,
            backgroundColor: config.backgroundColor,
        });


        this.domElement = config.domElement;

        /**
         * The initWidth.
         *
         * @member {number}
         */
        this.initWidth = config.initWidth;
        /**
         * The initHeight.
         *
         * @member {number}
         */
        this.initHeight = config.initHeight;

        this.domElement.appendChild(this.view);


        // if (config.showFPS) {
        //     this.stats = new Stats();
        //     this.domElement.appendChild(this.stats.dom);
        // }

        /// one game one loader
        SINT.TyLoader = new loaders.Loader();




        // Configure PIXI Loader to handle audio files correctly
        const Resource = loaders.Resource;
        const exts = [
            "mp3",
            "ogg",
            "oga",
            "opus",
            "mpeg",
            "wav",
            "m4a",
            "mp4",
            "aiff",
            "wma",
            "mid"
        ];
        let webAudioContext = window.AudioContext || window.webkitAudioContext,
            isWebAudioSupported = !!webAudioContext
        // Make sure we support webaudio
        if (isWebAudioSupported) {
            // Load all audio files as ArrayBuffers
            exts.forEach((ext) => {
                Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.BUFFER);
                Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.XHR);
            });
        } else {
            // Fall back to loading as <audio> elements
            exts.forEach((ext) => {
                Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.DEFAULT);
                Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.AUDIO);
            });
        }


        this._init();
    }

    _init() {
        const {
            initWidth,
            initHeight
        } = this;

        // Handle window resize event
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();

        // Handle fish animation
        this.ticker.add(this._animate, this);
    }
    _resize() {

        let _c = this.domElement.offsetWidth / this.initWidth;
        console.log("resize " + _c);

        // for bottom render bug
        this.initHeight = this.domElement.offsetHeight / _c;
        this.view.style.width = '100%';
        // this.view.style.transform = "matrix(" + _c + ", 0, 0, " + _c + ", 0, 0)";
        // this.view.style.transformOrigin = "0% 0%";

        this.renderer.resize(this.initWidth, this.initHeight);
        this.render();
    }
    _animate(delta) {
        if (this.stats) this.stats.update();
        // this.animateTimer += delta;
        // const { animateTimer} = this;
        // this.events.emit('animate', delta, animateTimer);
        // if (!this.animating) {
        //     return;
        // }
    }


    /**
     * Init assets loader
     * 
     * @param {object} config - The assets loader options
     * @param {object} [config.assets={}] - The assets
     * @param {function} [config.loading=null] - loading function
     * @param {function} [config.loaded=null] - loaded callback function
     */
    preload(config) {
        if (config === undefined) config = {}
        config = Object.assign({
            assets: {},
            loading: null,
            loaded: null,
        }, config);


        for (let key in config.assets) {
            SINT.TyLoader.add(key, config.assets[key]);
        }
        SINT.TyLoader.onProgress.add((_e) => {
            // console.warn("onProgress " + _e.progress);
            if (config.loading) config.loading(_e.progress);
        });

        SINT.TyLoader.load((loader, resources) => {
            // console.log("loadComplete");
            if (config.loaded) config.loaded();
        });
    }



    /**
     * Adds one or more children to the stage.
     *
     * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
     * @return {PIXI.DisplayObject} The first child that was added.
     */
    add(child) {
        this.stage.addChild(child);
        return child;
    }

    /**
     * Remove child from stage.
     *
     * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
     */
    remove(child) {
        this.stage.removeChild(child);
    }



    /**
     * Destroy and don't use after this.
     */
    removeThis() {
        if (this.stats) this.domElement.removeChild(this.stats.dom);

        console.log('removeThis');


        ////Hook 
        let domBtns = document.getElementsByTagName("button");
        for (let i = 0; i < domBtns.length; i++) {
            let domBtn = domBtns[i];
            if (domBtn.title == 'HOOK DIV') {
                // console.log(domBtn);
                // console.log(domBtn.parent);
                document.body.removeChild(domBtn);
            }
        }

        this.destroy(true);



        // PIXI.sound.removeAll();

        // console.log(SINT.TyLoader.resources);

        for (let key in SINT.TyLoader.resources) {
            let resource = SINT.TyLoader.resources[key];
            // console.log(resource);
            let tex = resource.texture;
            if (tex) tex.destroy(true);
            let texs = resource.textures;
            if (texs) {
                for (let key in texs) {
                    texs[key].destroy(true);
                }
            }
        }

        SINT.TyLoader.destroy();
        // SINT.TyLoader.removeAllListeners();
        // SINT.TyLoader.reset();
        // console.log(SINT.TyLoader.resources);
    }



}