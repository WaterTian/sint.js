import utils from './utils';
import Audio from './Audio';

import * as loaders from '../loaders';

export default class AudioManager {

  constructor() {
    let _this = this;
    this.audios = {};
    this.enabled = utils.isAudioSupported;
    this.sounds = [];

    if (utils.isWebAudioSupported) {
      this.context = utils.globalWebAudioContext;
      this.gainNode = utils.createGainNode(this.context);
      this.gainNode.connect(this.context.destination);
    }


    // Configure PIXI Loader to handle audio files correctly
    const Resource = loaders.Resource;
    const exts = utils.extensions;

    // Make sure we support webaudio
    if (utils.isWebAudioSupported) {
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

    // console.log(Resource);


  }

  getAudio(data) {
    let audio = new Audio(data, this);
    // let audio = new Audio(this.audios[name], this);
    this.sounds.push(audio);
    return audio;
  }

  removeAudio(audio) {
    let index = this.sounds.indexOf(audio);
    if (index !== -1) {
      this.sounds.splice(index, 1);
    }
  }

  // filterAudios(id, value){
  //   let audios = [];
  //   let len = this.sounds.length;
  //   let emptyValue = typeof value === "undefined";

  //   for(let i = 0; i < len; i++){
  //     if((emptyValue && !!this.sounds[i][id])||(!emptyValue && this.sounds[i][id] === value)){
  //       audios.push(this.sounds[i]);
  //     }
  //   }

  //   return audios;
  // }

  mute(value) {
    value = (value !== false);
    let len = this.sounds.length;
    for (let i = 0; i < len; i++) this.sounds[i].muted = value;
  }

  unmute() {
    return this.mute(false);
  }

  pause(value) {
    value = (value !== false);
    let len = this.sounds.length;
    for (let i = 0; i < len; i++) this.sounds[i].paused = value;
  }

  resume() {
    return this.pause(false);
  }

}