/** @format */
let platforms;
let player;
let cursors;
var timer = 0;
var loadingJump = false;
let lowest = 1000;
let data = null || 500;
let level4platforms;
let jump;
let fall;
let land;
let bump;
export default class levelFive extends Phaser.Scene {
  constructor() {
    super({ key: 'level5' });
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
    platforms.create(355, 880, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 850, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 820, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 800, 'platform').setScale(0.25).refreshBody();

    platforms.create(325, 800, 'platform').setScale(0.25).refreshBody();
    platforms.create(295, 800, 'platform').setScale(0.25).refreshBody();

    platforms.create(840, 880, 'platform').setScale(0.25).refreshBody();
    platforms.create(840, 850, 'platform').setScale(0.25).refreshBody();
    platforms.create(840, 820, 'platform').setScale(0.25).refreshBody();
    platforms.create(840, 800, 'platform').setScale(0.25).refreshBody();

    platforms.create(870, 800, 'platform').setScale(0.25).refreshBody();
    platforms.create(900, 800, 'platform').setScale(0.25).refreshBody();

    platforms.create(845, 620, 'platform').setScale(0.25).refreshBody();
    platforms.create(870, 620, 'platform').setScale(0.25).refreshBody();
    platforms.create(895, 620, 'platform').setScale(0.25).refreshBody();

    platforms.create(20, 620, 'platform').setScale(0.25).refreshBody();
    platforms.create(50, 620, 'platform').setScale(0.25).refreshBody();
    platforms.create(80, 620, 'platform').setScale(0.25).refreshBody();

    platforms.create(1180, 420, 'platform').setScale(0.25).refreshBody();
    platforms.create(1150, 420, 'platform').setScale(0.25).refreshBody();
    platforms.create(1120, 420, 'platform').setScale(0.25).refreshBody();

    platforms.create(740, 240, 'platform').setScale(0.25).refreshBody();
    platforms.create(775, 240, 'platform').setScale(0.25).refreshBody();

    platforms.create(580, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(615, 200, 'platform').setScale(0.25).refreshBody();

    platforms.create(455, 160, 'platform').setScale(0.25).refreshBody();
    platforms.create(420, 160, 'platform').setScale(0.25).refreshBody();

    platforms.create(120, 240, 'platform').setScale(0.25).refreshBody();
    platforms.create(155, 240, 'platform').setScale(0.25).refreshBody();

    platforms.create(600, -170, 'platform').setScale(3).refreshBody();
    this.add.image(600, 450, 'level5');
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
      this.scene.start('level6', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (player.y > 900) {
      let currPos = 910 - player.y;
      this.scene.start('level4', {
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
      }
      loadingJump = false;
      timer = 0;
    }
  }
}
