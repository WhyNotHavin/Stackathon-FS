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
export default class levelFour extends Phaser.Scene {
  constructor() {
    super({ key: 'level4' });
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
    platforms.create(135, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(105, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(90, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(65, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(35, 560, 'platform').setScale(0.25).refreshBody();

    platforms.create(495, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(460, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(425, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(390, 560, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 560, 'platform').setScale(0.25).refreshBody();

    platforms.create(1100, 340, 'platform').setScale(0.25).refreshBody();
    platforms.create(1135, 340, 'platform').setScale(0.25).refreshBody();
    platforms.create(1170, 340, 'platform').setScale(0.25).refreshBody();

    platforms.create(425, 885, 'platform').setScale(1.25).refreshBody();

    platforms.create(795, 455, 'platform').setScale(0.75).refreshBody();
    platforms.create(795, 530, 'platform').setScale(0.75).refreshBody();

    platforms.create(835, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 220, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 250, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 280, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 310, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 340, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 370, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 400, 'platform').setScale(0.25).refreshBody();

    platforms.create(355, -20, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 10, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 40, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 70, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 100, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 130, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 160, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 190, 'platform').setScale(0.25).refreshBody();
    platforms.create(355, 220, 'platform').setScale(0.25).refreshBody();

    platforms.create(835, -20, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 10, 'platform').setScale(0.25).refreshBody();
    platforms.create(835, 20, 'platform').setScale(0.25).refreshBody();

    platforms.create(870, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(905, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(940, 200, 'platform').setScale(0.25).refreshBody();
    platforms.create(975, 200, 'platform').setScale(0.25).refreshBody();

    platforms.create(390, 370, 'platform').setScale(0.65).refreshBody();
    platforms.create(390, 270, 'platform').setScale(0.65).refreshBody();
    this.add.image(600, 450, 'level4');
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
      let currPos = 855 - player.y;
      this.scene.start('level5', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (player.y > 900) {
      let currPos = 910 - player.y;
      this.scene.start('level3', {
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
