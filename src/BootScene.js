/** @format */

import Phaser from 'phaser';
import images from './assets/*.png';
import sounds from './sounds/*.mp3';
import fall from './sounds/sounds_fall.mp3';
import land from './sounds/land.mp3';
import bump from './sounds/bump.mp3';
import jump from './sounds/jump.mp3';

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
    this.load.image('space', images.space);
    this.load.image('logo', images.logo);
    this.load.image('red', images.red);
    this.load.image('level1', images.level1);
    this.load.image('level2', images.level2);
    this.load.image('level3', images.level3);
    this.load.image('level4', images.level4);
    this.load.image('level5', images.level5);
    this.load.image('level6', images.level6);
    this.load.image('level7', images.level7);
    this.load.image('level8', images.level8);
    this.load.image('level9', images.level9);
    this.load.image('level10', images.level10);
    this.load.image('platform', images.platform);
    this.load.spritesheet('dude', images.dude, {
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
