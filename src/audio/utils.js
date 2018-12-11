
const exts = [
  "mp3",
  "ogg",
  "oga",
  "opus",
  "mpeg",
  "wav",
  "m4a",
  "mp4",
];

let isHTMLAudioSupported = !!window.Audio,
  webAudioContext = window.AudioContext || window.webkitAudioContext,
  isWebAudioSupported = !!webAudioContext,
  isAudioSupported = isWebAudioSupported || isHTMLAudioSupported,
  globalWebAudioContext = isWebAudioSupported ? new webAudioContext() : null;



export default {
  isHTMLAudioSupported: isHTMLAudioSupported,
  webAudioContext: webAudioContext,
  isWebAudioSupported: isWebAudioSupported,
  isAudioSupported: isAudioSupported,
  globalWebAudioContext: globalWebAudioContext,
  createGainNode: null,
  exts:exts,
};