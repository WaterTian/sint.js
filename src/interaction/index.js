/**
 * This namespace contains a renderer plugin for handling mouse, pointer, and touch events.
 *
 * Do not instantiate this plugin directly. It is available from the `renderer.plugins` property.
 * See {@link SINT.CanvasRenderer#plugins} or {@link SINT.WebGLRenderer#plugins}.
 * @namespace SINT.interaction
 */
export { default as InteractionData } from './InteractionData';
export { default as InteractionManager } from './InteractionManager';
export { default as interactiveTarget } from './interactiveTarget';
export { default as InteractionTrackingData } from './InteractionTrackingData';
export { default as InteractionEvent } from './InteractionEvent';
