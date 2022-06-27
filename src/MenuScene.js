/** @format */

import Phaser from 'phaser';
let music;
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    let m = this.sound.add('backgroundMusic');
    m.loop = true;
    m.play();

    this.add
      .text(
        600,
        300,
        'Definitely not Jump King!\n Made with Phaser \n< play >',
        {
          align: 'center',
          fill: 'white',
          fontFamily: 'sans-serif',
          fontSize: 48,
        }
      )
      .setOrigin(0.5, 0);

    this.input.on(
      'pointerdown',
      function () {
        this.scene.switch('level1');
      },
      this
    );
  }
}
