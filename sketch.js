var bg, bgImg, title, titleimg, playbutton, playbuttonimg, gameover, gameoverimg, resetbutton, resetbuttonimg;
var player, playerimg, hittingimg, hittingimg2, walkingimg, walkingimg2;
var InvisibleGround, InvisibleWall1, InvisibleWall2;
var alienGroup, laserGroup, alienimg;
var bigboyimg, bigboygroup;
var blobimg,blobgroup;
var randspeed, randx, randxx, randxxx, randspeed2, randtime;
var GameState;
let playerHits = 0;
let playerHits2 = 0;
let isPlayerHittingRight = false;
let isPlayerHittingLeft = false;

function preload() {
  playerimg = loadAnimation("assets/stationary-1.png", "assets/stationary-2.png", "assets/stationary-3.png", "assets/stationary-4.png");
  hittingimg = loadAnimation("assets/hit-1.png", "assets/hit-2.png", "assets/hit-3.png", "assets/hit-4.png", "assets/hit-5.png", "assets/hit-6.png");
  hittingimg2 = loadAnimation("assets/hitt1.png", "assets/hitt2.png", "assets/hitt3.png", "assets/hitt4.png", "assets/hitt5.png", "assets/hitt6.png");
  walkingimg = loadAnimation("assets/running-1.png", "assets/running-2.png", "assets/running-3.png", "assets/running-4.png", "assets/running-5.png", "assets/running-6.png");
  walkingimg2 = loadAnimation("assets/run1.png", "assets/run2.png", "assets/run3.png", "assets/run4.png", "assets/run5.png", "assets/run6.png");
  alienimg = loadAnimation("assets/alien1.png", "assets/alien2.png", "assets/alien3.png", "assets/alien4.png", "assets/alien5.png", "assets/alien6.png");
  bigboyimg = loadAnimation("assets/bigboy-1.png", "assets/bigboy-2.png", "assets/bigboy-3.png", "assets/bigboy-4.png", "assets/bigboy-5.png", "assets/bigboy-6.png", "assets/bigboy-7.png", "assets/bigboy-8.png", "assets/bigboy-9.png", "assets/bigboy-10.png", "assets/bigboy-11.png", "assets/bigboy-12.png", "assets/bigboy-13.png", "assets/bigboy-14.png", "assets/bigboy-15.png", "assets/bigboy-16.png", "assets/bigboy-17.png", "assets/bigboy-18.png", "assets/bigboy-19.png", "assets/bigboy-20.png", "assets/bigboy-21.png", "assets/bigboy-22.png", "assets/bigboy-23.png", "assets/bigboy-24.png", "assets/bigboy-25.png");
  blobimg = loadAnimation("assets/slowboy-1.png","assets/slowboy-2.png","assets/slowboy-3.png","assets/slowboy-4.png","assets/slowboy-5.png","assets/slowboy-6.png","assets/slowboy-7.png","assets/slowboy-8.png");
  bgImg = loadImage("assets/background.jpg");
  titleimg = loadImage("assets/title.png");
  playbuttonimg = loadImage("assets/playbutton.png");
  gameoverimg = loadImage("assets/gameover.png");
  resetbuttonimg = loadImage("assets/resetbutton.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Adding the background image
  bg = createSprite(displayWidth / 2 - 100, displayHeight / 2 - 40, 30, 20);
  bg.addImage(bgImg);
  bg.scale = 0.4;

  title = createSprite(windowWidth / 2, windowHeight / 2, 100, 100);
  title.addImage(titleimg);

  playbutton = createSprite(windowWidth / 2, windowHeight / 2 + 110, 30, 30);
  playbutton.addImage(playbuttonimg);
  playbutton.scale = 0.4;

  gameover = createSprite(windowWidth / 2, windowHeight / 2, 100, 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  resetbutton = createSprite(windowWidth / 2, windowHeight / 2 + 200, 10, 10);
  resetbutton.addImage(resetbuttonimg);
  resetbutton.scale = 0.04;

  InvisibleGround = createSprite(displayWidth / 2, displayHeight - 175, displayWidth * 4, 20);
  InvisibleGround.setCollider("rectangle", 0, 0, displayWidth * 4 + 200, 30);
  InvisibleGround.debug = false;
  InvisibleGround.visible = false;

  InvisibleWall1 = createSprite(0, displayHeight / 2, 20, displayHeight);
  InvisibleWall1.visible = false;
  InvisibleWall2 = createSprite(windowWidth, displayHeight / 2, 20, displayHeight);
  InvisibleWall2.visible = false;

  // Creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 400, 50, 50);
  player.addAnimation("player", playerimg);
  player.addAnimation("walking", walkingimg);
  player.addAnimation("walking2", walkingimg2);
  player.addAnimation("hit_right", hittingimg);
  player.addAnimation("hit_left", hittingimg2);
  player.depth = player.depth + 500;
  player.scale = 0.5;
  player.setCollider("rectangle", 0, 0, 120, 130);

  GameState = 0;

  alienGroup = createGroup();
  laserGroup = createGroup();
  bigboygroup = createGroup();
  blobgroup = createGroup();
}

function draw() {
  background(0);

  if (GameState == 0) {
    title.visible = true;
    playbutton.visible = true;
    gameover.visible = false;
    resetbutton.visible = false;

    player.velocityY = player.velocityY + 0.8;
    player.collide(InvisibleGround);
    player.collide(InvisibleWall1);
    player.collide(InvisibleWall2);

    if (mousePressedOver(playbutton)) {
      GameState = 1;
    }
  }

  if (GameState == 1) {
    title.visible = false;
    playbutton.visible = false;
    gameover.visible = false;
    resetbutton.visible = false;
    player.debug = false;

    if (keyDown("A")) {
      player.changeAnimation("walking2", walkingimg2);
      player.x = player.x - 10;
    } else if (keyWentUp("A")) {
      player.changeAnimation("player", playerimg);
    }

    if (keyDown("D")) {
      player.changeAnimation("walking", walkingimg);
      player.x = player.x + 10;
    } else if (keyWentUp("D")) {
      player.changeAnimation("player", playerimg);
    }

    if (keyWentDown("E")) {
      player.changeAnimation("hit_right", hittingimg);
      player.setCollider("rectangle", 10, 0, 200, 150);
      isPlayerHittingRight = true;
    } else if (keyWentUp("E")) {
      player.changeAnimation("player", playerimg);
      player.setCollider("rectangle", -20, 0, 120, 130);
      isPlayerHittingRight = false;
    }

    if (keyWentDown("Q")) {
      player.changeAnimation("hit_left", hittingimg2);
      player.setCollider("rectangle", 10, 0, -200, 150);
      isPlayerHittingLeft = true;
    } else if (keyWentUp("Q")) {
      player.changeAnimation("player", playerimg);
      player.setCollider("rectangle", -20, 0, 120, 130);
      isPlayerHittingLeft = false;
    }

    player.velocityY = player.velocityY + 0.8;
    player.collide(InvisibleGround);
    player.collide(InvisibleWall1);
    player.collide(InvisibleWall2);

    randspeed = Math.round(random(3, 7));
    randx = Math.round(random(400, displayWidth/2+100));
    randxx = Math.round(random(displayWidth - 500, displayWidth - 300));
    randxxx = Math.round(random(50,300));
    randspeed2 = Math.round(random(-6, -8));
    randtime = Math.round(random(500, 1300));

    spawnUFO();
    spawnBigBoy();
    spawnBlob(); 

    if (isPlayerHittingRight) {
      if (player.isTouching(bigboygroup)) {
        playerHits = playerHits + 1;
        player.position.x -= 20;
        if (playerHits >= 8) {
          bigboygroup[0].remove();
          playerHits = 0;
        }
      }
    }

    if (!isPlayerHittingRight && player.isTouching(bigboygroup)) {
      GameState = 2;
    }

    if (isPlayerHittingLeft) {
      if (player.isTouching(blobgroup)) {
        playerHits2 = playerHits2 + 1;
        player.position.x += 20;
        if (playerHits2 >= 3) {
          blobgroup[0].remove();
          playerHits2 = 0;
        }
      }
    }

    if (!isPlayerHittingLeft && player.isTouching(blobgroup)) {
      GameState = 2;
    }


  }

  if (player.isTouching(laserGroup)) {
    GameState = 2;
  }

  if (GameState == 2) {
    gameover.visible = true;
    resetbutton.visible = true;
    title.visible = false;
    playbutton.visible = false;

    player.visible = false;
    player.position.x = displayWidth - 1150;
    player.position.y = displayHeight - 400;

    alienGroup.destroyEach();
    laserGroup.destroyEach();
    bigboygroup.destroyEach();
    blobgroup.destroyEach();

    if (mousePressedOver(resetbutton)) {
      reset();
    }
  }

  drawSprites();
}

function shootLasers(alien, randspeed2, randtime) {
  const laser1 = createSprite(alien.position.x, 85, 10, 50);
  laser1.velocityY = -alien.velocityX - randspeed2;

  laser1.shapeColor = "red";
  laser1.lifetime = 120;

  laserGroup.add(laser1);

  setTimeout(() => {
    const laser2 = createSprite(alien.position.x, 85, 10, 50);
    laser2.velocityY = -alien.velocityX - randspeed2;

    laser2.shapeColor = "red";
    laser2.lifetime = 120;

    laserGroup.add(laser2);
  }, randtime);
}

function spawnUFO() {
  if (frameCount % 120 === 0) {
    var alien = createSprite(randx, 60, 10, 20);
    alien.addAnimation("alien", alienimg);
    alien.velocityX = -randspeed;
    alien.scale = 0.35;
    alien.lifetime = 200;

    alienGroup.add(alien);
    shootLasers(alien, randspeed2, randtime);
  }
}

function spawnBigBoy() {
  if (frameCount % 1000 === 0) {
    var bigboy = createSprite(randxx, 600, 100, 100);
    bigboy.addAnimation("bigboy", bigboyimg);
    bigboy.scale = 0.45;
    bigboy.velocityX = -1;
    bigboy.depth = 100;
    bigboy.setCollider("rectangle", 0, 0, 300, 440);
    bigboy.collide(InvisibleGround);
    bigboy.debug = false;
    bigboygroup.add(bigboy);
  }
}

function spawnBlob() {
  if (frameCount % 240 === 0) {
    var blob = createSprite(randxxx, 650, 30, 30);
    blob.addAnimation("blob", blobimg);
    blob.scale = 0.4;
    blob.velocityX = 3;
    blob.depth = 200;
    blob.setCollider("rectangle", 0, 0, 280, 300);
    blob.collide(InvisibleGround);
    blob.debug = false;
    blobgroup.add(blob);
  }
}

function reset() {
  GameState = 1;
  alienGroup.destroyEach();
  laserGroup.destroyEach();
  bigboygroup.destroyEach();
  blobgroup.destroyEach();
  gameover.visible = false;
  player.visible = true;
}
