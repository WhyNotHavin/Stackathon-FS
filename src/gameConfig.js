/** @format */

import Phaser from 'phaser';
import BootScene from './BootScene';

import MenuScene from './MenuScene';
import EndScene from './EndScene';
import LevelOne from './LevelOne';
import levelTwo from './LevelTwo';
import levelThree from './LevelThree';
import levelFour from './LevelFour';
import levelFive from './LevelFive';
import levelSix from './LevelSix';
import LevelSeven from './LevelSeven';
import levelEight from './LevelEight';
import levelNine from './LevelNine';

export default {
  type: Phaser.AUTO,
  width: 1200,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1600 },
      debug: false,
    },
  },

  scene: [
    BootScene,
    MenuScene,
    LevelOne,
    levelTwo,
    levelThree,
    levelFour,
    levelFive,
    levelSix,
    LevelSeven,
    levelEight,
    levelNine,
    EndScene,
  ],
};
