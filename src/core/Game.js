import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Stats from 'stats.js';



PIXI.utils.skipHello();
PIXI.settings.PRECISION_FRAGMENT = 'highp';

/**
 * @class
 * @extends PIXI.Application
 * 
 * @param {object} config The Game options
 * @param {domElement} [config.domElement] 
 * @param {number} [config.initWidth=750] - The Game width
 * @param {number} [config.initHeight=1334] - The Game height
 * @param {boolean} [config.showFPS=true]
 * @param {number} [config.backgroundColor=0x000000] - The backgroundColor
 *
 * @param {function} [loading]
 * @param {function} [create]
 */


export default class Game extends PIXI.Application {

	constructor(config, loading, create) {
		if (config === undefined) {
			config = {}
		};

		config = Object.assign({
			domElement: null,
			initWidth: 750,
			initHeight: 1334,
			showFPS: true, // 显示帧频
			backgroundColor: 0x000000, // 画布背景色
			assets: {},
		}, config);


		super({
			width: config.initWidth,
			height: config.initHeight,
			backgroundColor: config.backgroundColor,
		});


		this.domElement = config.domElement;
		this.initWidth = config.initWidth;
		this.initHeight = config.initHeight;

		this.domElement.appendChild(this.view);


		if (config.showFPS) {
			this.stats = new Stats();
			this.domElement.appendChild(this.stats.dom);
		}


		/// assets load
		SINT.TyLoader = new PIXI.loaders.Loader();
		for (let key in config.assets) {
			SINT.TyLoader.add(key, config.assets[key]);
		}
		SINT.TyLoader.onProgress.add((_e) => {
			// console.log("onProgress " + _e.progress);
			if (loading) loading(_e.progress);
		});

		let _this = this;
		SINT.TyLoader.load((loader, resources) => {
			console.log("loadComplete");
			if (create) create();
		});


		this.init();
	}


	init() {
		const {
			initWidth,
			initHeight
		} = this;

		// Handle window resize event
		window.addEventListener('resize', this.resize.bind(this));
		this.resize();

		// Handle fish animation
		this.ticker.add(this.animate, this);
	}

	resize() {

		let _c = this.domElement.offsetWidth / this.initWidth;
		console.log("resize " + _c);

		// for bottom render bug
		this.initHeight = this.domElement.offsetHeight / _c;

		this.view.style.transform = "matrix(" + _c + ", 0, 0, " + _c + ", 0, 0)";
		this.view.style.transformOrigin = "0% 0%";

		this.renderer.resize(this.initWidth, this.initHeight);
		this.render();
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
	 * Animate
	 * @param {number} delta - % difference in time from last frame render
	 */
	animate(delta) {

		if (this.stats) this.stats.update();


		// this.animateTimer += delta;
		// const { animateTimer} = this;
		// this.events.emit('animate', delta, animateTimer);
		// if (!this.animating) {
		//     return;
		// }
	}

	/**
	 * Must be loaded
	 * 
	 * PIXI.sound.pause(name);
	 * PIXI.sound.pauseAll();
	 * 
	 * PIXI.sound.remove(name);
	 * PIXI.sound.removeAll();
	 * 
	 * PIXI.sound.stop(name);
	 * PIXI.sound.stopAll();
	 *
	 * PIXI.sound.volume(name, volume);
	 * 
	 * @param {string} [name] - The sound name
	 * @param {boolean} [loop] - loop?
	 * 
	 */
	playSound(name, loop = false) {
		const _sound = SINT.TyLoader.resources[name].sound;
		_sound.loop = loop;
		_sound.play();
	}
	pauseSound(name) {
		PIXI.sound.pause(name);
	}
	stopAllSound() {
		PIXI.sound.stopAll();
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
			// console.log(domBtn);
			if (domBtn.title = 'HOOK DIV') {
				document.body.removeChild(domBtn);
			}
		}



		this.destroy(true);



		PIXI.sound.removeAll();

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