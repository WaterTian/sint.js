import utils from './utils';
import Audio from './Audio';


export default class AudioManager{
  constructor() {
    this.enabled = utils.isAudioSupported;
    this.sounds = [];

    if (utils.isWebAudioSupported) {
      this.context = utils.globalWebAudioContext;
      this.gainNode = utils.createGainNode(this.context);
      this.gainNode.connect(this.context.destination);
    }
  }


  add(_name) {
    let audio = new Audio(AudioManager.audios[_name], this);
    audio.name = _name;
    this.sounds.push(audio);
    return audio;
  }

  remove(audio) {
    let index = this.sounds.indexOf(audio);
    if (index !== -1) {
      this.sounds.splice(index, 1);
    }
  }

  removeAll() {
    this.sounds.forEach((s)=> {
      s.stop();
    });
  }

  get(_name){
    let _s;
    this.sounds.forEach((s)=> {
      if(s.name == _name) _s=s
    });
    return _s;
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

AudioManager.audios = {};