import * as loaders from '../loaders';

import utils from './utils';
import audioParser from './audioParser';
import AudioManager from './AudioManager';



let Loader = loaders.Loader;
Loader.addPixiMiddleware(audioParser);

// Configure PIXI Loader to handle audio files correctly
const Resource = loaders.Resource;

if (utils.isAudioSupported) {
  // Make sure we support webaudio
  if (utils.isWebAudioSupported) {

    utils.createGainNode = function createGainNode(ctx) {
      return ctx.createGain ? ctx.createGain() : ctx.createGainNode();
    }
    // Load all audio files as ArrayBuffers
    utils.exts.forEach((ext) => {
      Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.BUFFER);
      Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.XHR);
    });
  } else {
    // Fall back to loading as <audio> elements
    utils.exts.forEach((ext) => {
      Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.DEFAULT);
      Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.AUDIO);
    });
  }
}






export { AudioManager }
