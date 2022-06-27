/** @format */

import Phaser from 'phaser';
// import images from './assets/*.png';
// import sounds from './sounds/*.mp3';
import fall from './sounds/sounds_fall.mp3';
import land from './sounds/land.mp3';
import bump from './sounds/bump.mp3';
import jump from './sounds/jump.mp3';
import level1 from './assets/level1.png';
import level2 from './assets/level2.png';
import level3 from './assets/level3.png';
import level4 from './assets/level4.png';
import level5 from './assets/level5.png';
import level6 from './assets/level6.png';
import level7 from './assets/level7.png';
import level8 from './assets/level8.png';
import level9 from './assets/level9.png';
import level10 from './assets/level10.png';
import platform from './assets/platform.png';
import dude from './assets/dude.png';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    var bg = this.add.rectangle(600, 450, 400, 30, 0x666666);
    var bar = this.add
      .rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff)
      .setScale(0, 1);
    // console.log('SOUNDS =======', sounds);
    // console.table(fall);
    this.load.audio('backgroundMusic', sounds.music);
    this.load.audio('bump', bump);
    this.load.audio('fall', fall);
    this.load.audio('jump', jump);
    this.load.audio('land', land);
    this.load.image('level1', level1);
    this.load.image('level2', level2);
    this.load.image('level3', level3);
    this.load.image('level4', level4);
    this.load.image('level5', level5);
    this.load.image('level6', level6);
    this.load.image('level7', level7);
    this.load.image('level8', level8);
    this.load.image('level9', level9);
    this.load.image('level10', level10);
    this.load.image('platform', platform);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update() {
    this.scene.start('menu');
  }
}
