<h1 align="center">sint.js</h1>

<p align="center">
  <b>Tiny WebGL game framework. Ship your HTML5 game in minutes — runs on any mobile device.</b><br/>
  <sub>极简 WebGL 游戏框架 · 几分钟上线一款 HTML5 游戏 · 全面适配各类移动端设备</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sint.js"><img src="https://img.shields.io/npm/v/sint.js.svg?color=cb3837&label=npm" alt="npm"></a>
  <a href="https://www.npmjs.com/package/sint.js"><img src="https://img.shields.io/npm/dm/sint.js.svg?color=brightgreen" alt="downloads"></a>
  <a href="https://github.com/WaterTian/sint.js/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/sint.js.svg?color=blue" alt="MIT"></a>
  <a href="https://github.com/WaterTian/sint.js/stargazers"><img src="https://img.shields.io/github/stars/WaterTian/sint.js?style=social" alt="stars"></a>
</p>

<p align="center">
  <a href="https://watertian.github.io/sint.js/docs/"><b>Docs</b></a> ·
  <a href="https://github.com/WaterTian/sint-example"><b>Examples</b></a> ·
  <a href="https://watertian.github.io/sint.js/"><b>Live Demo</b></a>
</p>

---

### Why sint.js / 为什么选 sint.js

- ⚡ **Small & fast** — WebGL-powered scene graph, hardware accelerated
- 📱 **Mobile-first** — auto-fit canvas, retina ready, runs on iOS / Android / WeChat / mini-programs
- 🎮 **Batteries included** — sprites, audio, input, tween, asset loader
- 🪶 **Zero ceremony** — one `Game` class, ready in 10 lines
- 📦 **One file** — drop in via npm or `<script>`

⚡ 体积小、速度快 · 📱 移动端全适配（iOS / 安卓 / 微信 / 小程序）· 🎮 开箱即用 · 🪶 十行代码起飞 · 📦 一个文件搞定

---

### Install / 安装

```sh
npm install sint.js
```

```html
<script src="https://unpkg.com/sint.js/dist/sint.min.js"></script>
```

---

### Hello, sint! / 十行 Demo

```js
import * as SINT from 'sint.js';

const game = new SINT.Game({
  canvas: document.querySelector('#stage'),
  initWidth: 750,
  initHeight: 1334,
  backgroundColor: 0x2a3145,
});

game.preload({
  assets: { hero: './hero.png' },
  loaded: () => {
    const hero = new SINT.SpriteClip('hero');
    hero.anchor.set(0.5);
    game.add(hero);
  },
});
```

> 👉 More demos / 更多示例：[**sint-example**](https://github.com/WaterTian/sint-example)

---

### Show your support / 支持作者

If sint.js helps you build something cool, **drop a ⭐ on GitHub** — it really helps!<br/>
如果 sint.js 帮到你，欢迎点一个 ⭐ 支持一下。

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/WaterTian">WaterTian</a> · <a href="./LICENSE">MIT License</a>
</p>
