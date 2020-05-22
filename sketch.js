var trex_running, trex_collided, trex, ground1, cloud, CLOUD, obstacles, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, PLAY = 0,
  END = 1,
  gameState = PLAY,
  restart, gameover, count = 0;;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground1 = loadImage("ground2.png");
  CLOUD = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restart = loadImage("restart.png");
  gameover = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 150);
  trex.addAnimation("trex", trex_running);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addAnimation("ground", ground1);

  inground = createSprite(300, 190, 600, 10);
  inground.visible = false;

  restart1 = createSprite(300, 130);
  restart1.scale = 0.45;
  restart1.addAnimation("restart", restart);
  restart1.visible = false;

  gameOver = createSprite(300, 50);
  gameOver.addAnimation("gameover", gameover);
  gameOver.scale = 0.5;
  gameOver.visible = false;



  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();

}

function draw() {
  background("white");
  drawSprites();



  text("Score:" + count, 50, 50);


  //trex touching the ground
  trex.velocityY = trex.velocityY + 1;
  trex.collide(inground);



  if (gameState === PLAY)

  {
    count = count + Math.round(frameRate() / 61);

    ground.velocityX = -3;


    if (ground.x < 0)

    {
      ground.x = ground.width / 2;
    }

    //trex jumps
    if (keyDown("UP_ARROW") && trex.y > 160)

    {
      trex.velocityY = -15;

    }

    spawnClouds();
    spawnObstacles();

  }


  if (ObstaclesGroup.isTouching(trex))

  {
    gameState = END;
  }


  if (gameState === END) {
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

    trex.addAnimation("trex", trex_collided);

    ground.velocityX = 0;

    restart1.visible = true;
    gameOver.visible = true;

    //count=0;

  }
  
  if(mousePressedOver(restart1))
     {
       reset();
       ObstaclesGroup.destroyEach();
       CloudsGroup.destroyEach();
       count=0;
       restart1.visible=false;
       gameOver.visible=false;
       trex.addAnimation("trex",trex_running);
     }




  //console.log(trex.y);

}

function spawnClouds() {
  if (frameCount % 70 === 0) {
    cloud = createSprite(600, 100);
    cloud.addAnimation("clouds", CLOUD);
    cloud.velocityX = -4;
    cloud.y = random(20, 130);
    trex.depth = cloud.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 300;
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(600, 170);
    obstacles.velocityX = -3;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacles.addAnimation("obstacle1", obstacle1);

        break;
      case 2:
        obstacles.addAnimation("obstacle2", obstacle2);
        break;
      case 3:
        obstacles.addAnimation("obstacle3", obstacle3);
        break;
      case 4:
        obstacles.addAnimation("ob4", obstacle4);
        break;
      case 5:
        obstacles.addAnimation("ob5", obstacle5);
        break;
      case 6:
        obstacles.addAnimation("ob6", obstacle6);
        break;
    }
    obstacles.scale = 0.55;
    obstacles.lifetime = 300;
    ObstaclesGroup.add(obstacles);

  }
}

function reset()
{
  gameState=PLAY;
  
}