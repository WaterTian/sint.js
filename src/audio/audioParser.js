import utils from './utils';
import AudioManager from './AudioManager';

export default function audioParser(){
  return function(resource, next){
    if(!utils.isAudioSupported || !resource.data)return next();

    let ext = _getExt(resource.url);
    if(utils.exts.indexOf(ext) === -1)return next();

    let name = resource.name || resource.url;
    if(utils.isWebAudioSupported){
      utils.globalWebAudioContext.decodeAudioData(resource.data, (buffer)=>{
        AudioManager.audios[name] = buffer;
        next();
      });
    }else{
      AudioManager.audios[name] = resource.data;
      return next();
    }
  }
}

function _getExt(url){
  return url.split('?').shift().split('.').pop().toLowerCase();
}

