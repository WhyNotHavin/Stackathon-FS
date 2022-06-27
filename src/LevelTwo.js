/** @format */
let platforms;
let player;
let cursors;
var timer = 0;
var loadingJump = false;
let lowest = 1000;
let data = null || 500;
let jump;
let fall;
let land;
let bump;
export default class levelTwo extends Phaser.Scene {
  constructor() {
    super({ key: 'level2' });
  }

  init(d) {
    data = d;
  }

  create() {
    platforms = this.physics.add.staticGroup();
    jump = this.sound.add('jump');
    fall = this.sound.add('fall');
    land = this.sound.add('land');
    bump = this.sound.add('bump');
    // left edge v
    platforms.create(-120, 350, 'platform').setScale(2).refreshBody();
    platforms.create(-120, 100, 'platform').setScale(2).refreshBody();
    platforms.create(-120, -100, 'platform').setScale(2).refreshBody();
    platforms.create(-120, 550, 'platform').setScale(2).refreshBody();
    platforms.create(-120, 790, 'platform').setScale(2).refreshBody();
    // right edge v
    platforms.create(1320, 350, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 100, 'platform').setScale(2).refreshBody();
    platforms.create(1320, -100, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 550, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 790, 'platform').setScale(2).refreshBody();
    // platforms v
    platforms.create(100, 300, 'platform').setScale(1.5).refreshBody();
    platforms.create(390, 340, 'platform').setScale(1.25).refreshBody();
    platforms.create(690, 545, 'platform').setScale(0.7).refreshBody();
    platforms.create(770, 545, 'platform').setScale(0.7).refreshBody();
    platforms.create(1070, 545, 'platform').setScale(0.7).refreshBody();
    platforms.create(1160, 545, 'platform').setScale(0.7).refreshBody();

    platforms.create(840, 790, 'platform').setScale(0.7).refreshBody();
    platforms.create(930, 790, 'platform').setScale(0.7).refreshBody();
    platforms.create(790, 790, 'platform').setScale(0.7).refreshBody();
    this.add.image(600, 450, 'level2');
    if (data.positionX) {
      player = this.physics.add
        .sprite(data.positionX, data.positionY, 'dude')
        .setScale(2);
      player.setVelocityX(data.velocity.x);
      player.setVelocityY(data.velocity.y);
    }
    player.setBounce(0.1);
    player.setCollideWorldBounds(false);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'dude', frame: 9 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms, function (player, platforms) {
      if (player.body.velocity.y > 15 || player.body.velocity.y < -15) {
        bump.play();
      } else if (player.body.velocity.y > 10 || player.body.velocity.y < -10) {
        land.play();
      }
    });
  }

  update() {
    if (player.body.velocity.y > 200) {
      player.setBounce(0);
    } else {
      player.setBounce(0.5);
    }

    if (player.y < -5) {
      let currPos = 885 - player.y;
      this.scene.start('level3', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (player.y > 900) {
      let currPos = 910 - player.y;
      this.scene.start('level1', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (cursors.left.isDown && player.body.touching.down) {
      player.setVelocityX(-420);
      player.anims.play('left', true);
    } else if (cursors.right.isDown && player.body.touching.down) {
      player.setVelocityX(420);

      player.anims.play('right', true);
    } else if (player.body.touching.down) {
      player.setVelocityX(0);
      player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityX(0);
      player.anims.play('jump');
      loadingJump = true;
      if (timer < 70) {
        timer += 1;
      }
      jump.play();
    } else if (loadingJump === true) {
      if (timer < 10) {
        player.body.velocity.y = -400;
      } else if (timer < 20) {
        player.body.velocity.y = -500;
      } else if (timer < 30) {
        player.body.velocity.y = -600;
      } else if (timer < 40) {
        player.body.velocity.y = -700;
      } else if (timer < 50) {
        player.body.velocity.y = -800;
      } else if (timer < 55) {
        player.body.velocity.y = -900;
      } else if (timer < 60) {
        player.body.velocity.y = -1000;
      } else if (timer < 65) {
        player.body.velocity.y = -1100;
      } else if (timer > 65) {
        player.body.velocity.y = -1150;
      }
      if (cursors.right.isDown) {
        player.body.velocity.x = 300;
      }
      loadingJump = false;
      timer = 0;
    }
  }
}
