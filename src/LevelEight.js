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
let n;
export default class levelEight extends Phaser.Scene {
  constructor() {
    super({ key: 'level8' });
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
    platforms.create(-70, 350, 'platform').setScale(2).refreshBody();
    platforms.create(-120, 100, 'platform').setScale(2).refreshBody();
    platforms.create(-120, -100, 'platform').setScale(2).refreshBody();
    platforms.create(-85, 550, 'platform').setScale(2).refreshBody();
    platforms.create(-85, 790, 'platform').setScale(2).refreshBody();
    // right edge v
    platforms.create(1320, 350, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 100, 'platform').setScale(2).refreshBody();
    platforms.create(1320, -100, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 550, 'platform').setScale(2).refreshBody();
    platforms.create(1320, 790, 'platform').setScale(2).refreshBody();
    // platforms v
    platforms.create(90, 930, 'platform').setScale(1).refreshBody();
    platforms.create(140, 930, 'platform').setScale(1).refreshBody();

    platforms.create(0, 230, 'platform').setScale(1).refreshBody();

    platforms.create(105, 570, 'platform').setScale(1).refreshBody();
    platforms.create(105, 460, 'platform').setScale(1).refreshBody();
    platforms.create(105, 430, 'platform').setScale(1).refreshBody();

    platforms.create(105, 430, 'platform').setScale(1).refreshBody();

    platforms.create(220, 410, 'platform').setScale(0.7).refreshBody();
    platforms.create(310, 410, 'platform').setScale(0.7).refreshBody();
    platforms.create(400, 410, 'platform').setScale(0.7).refreshBody();
    platforms.create(490, 410, 'platform').setScale(0.7).refreshBody();
    platforms.create(565, 410, 'platform').setScale(0.7).refreshBody();

    platforms.create(500, 720, 'platform').setScale(1.65).refreshBody();
    platforms.create(500, 820, 'platform').setScale(1.65).refreshBody();

    platforms.create(660, 870, 'platform').setScale(1).refreshBody();
    platforms.create(1035, 870, 'platform').setScale(1).refreshBody();

    platforms.create(1160, 630, 'platform').setScale(1).refreshBody();

    platforms.create(1160, 0, 'platform').setScale(1).refreshBody();
    platforms.create(1160, 80, 'platform').setScale(1).refreshBody();
    platforms.create(1160, 150, 'platform').setScale(1).refreshBody();

    platforms.create(365, 80, 'platform').setScale(2).refreshBody();

    platforms.create(525, 135, 'platform').setScale(1.2).refreshBody();

    // platforms.create(600, 970, 'platform').refreshBody();

    this.add.image(600, 450, 'level8');
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
    n = this.input.keyboard.addKey('N');
  }

  update() {
    if (player.x > 640 && player.x < 760 && player.y > 630) {
      player.setVelocityY(520);
      player.setVelocityX(420);
    }
    if (player.x > 930 && player.x < 1130 && player.y > 630) {
      player.setVelocityY(520);
      player.setVelocityX(-420);
    }
    if (player.x > 490 && player.x < 670 && player.y < 100) {
      player.setVelocityY(520);
      player.setVelocityX(420);
    }

    if (player.body.velocity.y > 200) {
      player.setBounce(0);
    } else {
      player.setBounce(0.5);
    }
    if (n.isDown) {
      this.scene.start('level9', {
        positionX: player.x,
        positionY: 300,
        velocity: player.body.velocity,
      });
    }
    if (player.y < -5) {
      let currPos = 885 - player.y;
      this.scene.start('end', {
        positionX: player.x,
        positionY: currPos,
        velocity: player.body.velocity,
      });
    }
    if (player.y > 900) {
      let currPos = 910 - player.y;
      this.scene.start('level7', {
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
      // time is in ms
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
    // Edit: changed the timing
  }
}
