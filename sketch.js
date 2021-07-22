const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
//stores all the balls
var balls = []
//boats array will store all the boats
var boats = []

var boatAnimation = [];

var brokenBoatAnimation = [];
var score = 0
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  evilPirate = loadJSON("./assets/pirateEnemy.json")
  madPirate = loadImage("./assets/pirateEnemy.png")
  SinkingShip = loadImage("./assets/broken-ship-01.png")
  SinkingShip2 = loadJSON("./assets/broken-ship-01.json")

  SpongeBobMusic1 = loadSound("./assets/background_music.mp3")
  
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, -PI / 4);
  var boatFrames = evilPirate.frames
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = madPirate.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenboatFrames = SinkingShip2.frames
  for (var i = 0; i < brokenboatFrames.length; i++) {
    var pos = brokenboatFrames[i].position;
    var img = SinkingShip.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  textSize(20)
  fill("red")
text("Score: "+score,width-200,50)
  Engine.update(engine);
  ground.display();
  //SpongeBobMusic1.play()
  //SpongeBobMusic1.setVolume(0.1)
  

  showBoats()
//array
// arr = ["hello", "hi","bye"]
//arr[0]

 //!==  not equal to
  //iterating through the balls array to display all the balls
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    //iterating through the boats array
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        // check the boat and ball is colliding
        if(Matter.SAT.collides(balls[i].body, boats[j].body).collided){
          //remove funtion called which is created in the boat class
          boats[j].remove(j);
          score = score+1
          //removing the ball from world
          Matter.World.remove(world, balls[i].body);
          //removing the ball from ball's array
          balls.splice(i, 1);
          // i value is reduced bcoz 1 ball is deleted
          i--;

        }
      }
    }
  }

  cannon.display();
  tower.display();

 
}

function showBoats() {
  //checking if we have boats present on the canvas
  if (boats.length > 0) {
    //to create a new boat we are checking weather the boats are less than 4 and the last boat is inside the canvas
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      //creating new boat
      var boat = new Boat(width,height - 100, 200, 200, position,boatAnimation);
      // storing each boat in the array
      boats.push(boat);
    }
    // gives velocity to every single boat
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });
      //displays every single boat
    boats[i].display();
    boats[i].animate();
    if(Matter.SAT.collides(tower.body,boats[i].body).collided){
      gameOver()
    }
    }
  } else {
    //if none of the boats are present in the canvas, a new boat will be created
    var boat = new Boat(width, height - 100, 200, 200, -100,boatAnimation);
    boats.push(boat);
  }
}

function gameOver(){
  swal(
    {
      title:"You failed",
      text:"thx for playing",
      confirmButtonText:"again"
    },
    function(isConfirm){
      if(isConfirm){
        location.reload()
      }
    }
  )
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    //creating ball
  cannonball = new CannonBall(cannon.x, cannon.y)
  //individual ball is being added to the balls array
    balls.push(cannonball)
  }
}

//displaying each ball
function showCannonBalls(ball, index) {
  ball.display();
  //if the ball crosses the canvas it will get destroyed
  if (ball.body.position.x >= width || ball.body.position.y >= height) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if (keyCode === DOWN_ARROW) {
    //last ball of the balls array will move
    balls[balls.length - 1].shoot();
  }
}


