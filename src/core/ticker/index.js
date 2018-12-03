import Ticker from './Ticker';

/**
 * The shared ticker instance used by {@link SINT.extras.AnimatedSprite}.
 * and by {@link SINT.interaction.InteractionManager}.
 * The property {@link SINT.ticker.Ticker#autoStart} is set to `true`
 * for this instance. Please follow the examples for usage, including
 * how to opt-out of auto-starting the shared ticker.
 *
 * @example
 * let ticker = SINT.ticker.shared;
 * // Set this to prevent starting this ticker when listeners are added.
 * // By default this is true only for the SINT.ticker.shared instance.
 * ticker.autoStart = false;
 * // FYI, call this to ensure the ticker is stopped. It should be stopped
 * // if you have not attempted to render anything yet.
 * ticker.stop();
 * // Call this when you are ready for a running shared ticker.
 * ticker.start();
 *
 * @example
 * // You may use the shared ticker to render...
 * let renderer = SINT.autoDetectRenderer(800, 600);
 * let stage = new SINT.Container();
 * let interactionManager = SINT.interaction.InteractionManager(renderer);
 * document.body.appendChild(renderer.view);
 * ticker.add(function (time) {
 *     renderer.render(stage);
 * });
 *
 * @example
 * // Or you can just update it manually.
 * ticker.autoStart = false;
 * ticker.stop();
 * function animate(time) {
 *     ticker.update(time);
 *     renderer.render(stage);
 *     requestAnimationFrame(animate);
 * }
 * animate(performance.now());
 *
 * @type {SINT.ticker.Ticker}
 * @memberof SINT.ticker
 */
const shared = new Ticker();

shared.autoStart = true;
shared.destroy = () =>
{
	// protect destroying shared ticker
	// this is used by other internal systems
	// like AnimatedSprite and InteractionManager
};

/**
 * This namespace contains an API for interacting with SINT's internal global update loop.
 *
 * This ticker is used for rendering, {@link SINT.extras.AnimatedSprite AnimatedSprite},
 * {@link SINT.interaction.InteractionManager InteractionManager} and many other time-based SINT systems.
 * @example
 * const ticker = new SINT.ticker.Ticker();
 * ticker.stop();
 * ticker.add((deltaTime) => {
 *   // do something every frame
 * });
 * ticker.start();
 * @namespace SINT.ticker
 */
export { shared, Ticker };
