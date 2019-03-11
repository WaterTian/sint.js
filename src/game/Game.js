import * as core from '../core';
import Stats from 'stats.js';

import * as loaders from '../loaders';

import { AudioManager } from '../audio';


core.utils.skipHello();
core.settings.PRECISION_FRAGMENT = 'highp';
// core.settings.PRECISION_FRAGMENT = 'mediump';

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
            transparent: false,
            autoResize:true,
        }, config);


        super({
            width: config.initWidth,
            height: config.initHeight,
            backgroundColor: config.backgroundColor,
            transparent: config.transparent,
        });


        this.domElement = config.domElement;
        this.autoResize = config.autoResize;

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


        if (config.showFPS) {
            this.stats = new Stats();
            this.domElement.appendChild(this.stats.dom);
        }

        /**
         * The game audios.
         * @member {SINT.AudioManager}
         */
        SINT.Audios = new AudioManager();
        
        this._init();
    }

    _init() {
        const {
            initWidth,
            initHeight
        } = this;

        if(this.autoResize)
        {
            this.resizeW = this._resize.bind(this);
            // Handle window resize event
            window.addEventListener('resize', this.resizeW);
            this.resizeW();
        }



        // Handle fish animation
        this.ticker.add(this._animate, this);
    }
    _resize() {
        try {
            let _c = this.domElement.offsetWidth / this.initWidth;
            // console.warn("resize " + _c);

            // for bottom render bug
            this.initHeight = this.domElement.offsetHeight / _c;
            this.view.style.width = '100%';
            // this.view.style.transform = "matrix(" + _c + ", 0, 0, " + _c + ", 0, 0)";
            // this.view.style.transformOrigin = "0% 0%";

            this.renderer.resize(this.initWidth, this.initHeight);
            this.render();
        } catch (e) {
            console.log(e.message)
            console.log("销毁场景时请执行 removeThis")
        }
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
     * @param {function} [config.loading=()=>{}] - loading function
     * @param {function} [config.loaded=()=>{}] - loaded callback function
     */
    preload(config) {
        if (config === undefined) config = {}
        config = Object.assign({
            assets: {},
            loading: ()=>{},
            loaded: ()=>{},
        }, config);

        
        for (let key in config.assets) {
            SINT.loader.add(key, config.assets[key]);
        }

        let bindingProgress = SINT.loader.onProgress.add(config.loading);

        SINT.loader.load((loader, resources) => {
            // console.log("loadComplete");
            bindingProgress.detach();
            config.loaded();
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
    addChild(child) {
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
    removeChild(child) {
        this.stage.removeChild(child);
    }


    /**
     * Destroy and don't use after this.
     */
    removeThis() {
        if (this.stats) this.domElement.removeChild(this.stats.dom);

        console.warn('removeThis');

        if(this.autoResize) window.removeEventListener('resize', this.resizeW);


        ////Hook 
        let domBtns = document.body.getElementsByTagName("button");
        for (let i = 0; i < domBtns.length; i++) {
            let domBtn = domBtns[i];
            if (domBtn.title == 'HOOK DIV') {
                // console.log(domBtn);
                // console.log(domBtn.parent);
                document.body.removeChild(domBtn);
            }
        }

        this.destroy(true);

        SINT.Audios.destroy();



        // console.log(SINT.loader.resources);

        for (let key in SINT.loader.resources) {
            let resource = SINT.loader.resources[key];
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

        SINT.loader.destroy();
        // SINT.loader.removeAllListeners();
        // SINT.loader.reset();
        // console.log(SINT.loader.resources);
    }



}