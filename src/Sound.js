import * as core from './core';

import {Howl} from 'howler';

export default class Sound extends Howl {
	constructor(options) {

		super({
			// data: options.data,
			src: options.url,
		})

	}
}