class Boat {
    constructor(x, y,width,height,boatPos, boatAnimation) {
      var options = {
        restitution: 0.8
      };
      this.body = Bodies.rectangle(x, y,width,height, options);
      this.image= loadImage("assets/boat.png")
      this.width = width;
    this.height = height;
    this.speed = 0.05
    this.boatPosition = boatPos;
    this.animation = boatAnimation;
      World.add(world, this.body);
    }
    animate(){
      this.speed +=0.05
    }
    display() {
      var pos = this.body.position;
      var index = floor(this.speed%this.animation.length)
      push()
      translate(pos.x, pos.y);
        rotate(this.body.angle);
     imageMode(CENTER);
      image(this.animation[index],0,this.boatPosition, this.width,this.height);
      pop();
    }

    remove(index) {
      this.animation = brokenBoatAnimation;
      this.speed = 0.05;
      this.width = 300;
    this.height = 300;
    setTimeout(()=>{
      Matter.World.remove(world, boats[index].body);
      boats.splice(index, 1);
    },2000)
    
      }
  }