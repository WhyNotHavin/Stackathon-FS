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
export default class levelThree extends Phaser.Scene {
  constructor() {
    super({ key: 'level3' });
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
    platforms.create(620, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(590, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(560, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(535, 780, 'platform').setScale(0.25).refreshBody();

    platforms.create(923, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(890, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(860, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(830, 780, 'platform').setScale(0.25).refreshBody();
    platforms.create(815, 780, 'platform').setScale(0.25).refreshBody();

    platforms.create(135, 260, 'platform').setScale(0.3).refreshBody();
    platforms.create(105, 260, 'platform').setScale(0.3).refreshBody();
    platforms.create(90, 260, 'platform').setScale(0.3).refreshBody();
    platforms.create(65, 260, 'platform').setScale(0.3).refreshBody();
    platforms.create(35, 260, 'platform').setScale(0.3).refreshBody();

    platforms.create(1160, 660, 'platform').setScale(0.25).refreshBody();
    platforms.create(1130, 660, 'platform').setScale(0.25).refreshBody();
    platforms.create(1110, 660, 'platform').setScale(0.25).refreshBody();
    platforms.create(1080, 660, 'platform').setScale(0.25).refreshBody();

    platforms.create(515, 590, 'platform').setScale(0.5).refreshBody();
    platforms.create(585, 590, 'platform').setScale(0.5).refreshBody();
    platforms.create(655, 590, 'platform').setScale(0.5).refreshBody();
    platforms.create(700, 590, 'platform').setScale(0.5).refreshBody();
    platforms.create(780, 570, 'platform').setScale(0.8).refreshBody();

    platforms.create(460, 355, 'platform').setScale(0.9).refreshBody();
    platforms.create(475, 355, 'platform').setScale(0.9).refreshBody();

    platforms.create(425, -40, 'platform').setScale(1.3).refreshBody();
    this.add.image(600, 450, 'level3');
    if (data.positionX) {
      player = this.physics.add
        .sprite(data.positionX, data.positionY, 'dude')
        .setScale(2);
      player.setVelocityX(data.velocity.x);
      player.setVelocityY(data.velocity.y);
    } else {
      player = this.physics.add.sprite(600, 840, 'dude').setScale(2);
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
      this.scene.start('level4', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (player.y > 900) {
      let currPos = 910 - player.y;
      this.scene.start('level2', {
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
        player.body.velocity.y = -1120;
      }
      if (cursors.right.isDown) {
        player.body.velocity.x = 300;
        console.log(timer);
      }
      loadingJump = false;
      timer = 0;
    }
  }
}
