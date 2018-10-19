import * as PIXI from 'pixi.js';
import Stats from 'stats.js';

PIXI.utils.skipHello();

/**
 * @class
 * @extends PIXI.Application
 * 
 * @param {object} config The Game options
 * @param {domElement} [config.domElement] 
 * @param {string} [config.initWidth] The Game width
 * @param {string} [config.initHeight] The Game height
 * @param {boolean} [config.showFPS]
 */

export default class Game extends PIXI.Application {

	constructor(config, create) {
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

		// PIXI.settings.PRECISION_FRAGMENT = 'highp';


		this.domElement = config.domElement;
		this.initWidth = config.initWidth;
		this.initHeight = config.initHeight;
		this.create = create;

		this.domElement.appendChild(this.view);


		if (config.showFPS) {
			this.stats = new Stats();
			this.domElement.appendChild(this.stats.dom);
		}


		/// assets load
		/// 
		for (var key in config.assets) {
			PIXI.loader.add(key, config.assets[key]);
		}
		PIXI.loader.onProgress.add((_e) => {
			console.log("onProgress " + _e.progress)
		});

		let _this = this;
		PIXI.loader.load((loader, resources) => {
			console.log("loadComplete");
			_this.create();
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

        let _c =  this.domElement.offsetWidth / this.initWidth;
        console.log("resize "+_c);

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
	 * Animate the fish, overlay and filters (if applicable)
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

}