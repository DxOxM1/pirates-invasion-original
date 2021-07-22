class CannonBall {
    constructor(x, y) {
      var options = {
        isStatic: true,
        restitution: 0.8
      };
      this.r = 40
      this.body = Bodies.circle(x, y, this.r, options);
      this.image= loadImage("assets/cannonball.png")
      World.add(world, this.body);
      this.path= []
    }
    display() {
      var pos = this.body.position;
      push()
      translate(pos.x, pos.y);
        rotate(this.body.angle);
     imageMode(CENTER);
      image(this.image,0,0, this.r, this.r);
      pop();
      //this.path=[[x1,y1],[x2,y2],[x3,y3],....]
      //getting the positions of ball and pushing them in the trajectory array
      if (this.body.velocity.x > 0 && this.body.position.x > 250) {
        var position = [this.body.position.x, this.body.position.y];
        this.path.push(position);
      }
  
      // setting image to the trajectory
      for (var i = 0; i < this.path.length; i++) {
        image(this.image, this.path[i][0], this.path[i][1], 5, 5);
      }
    }
    shoot() {
        //converting angle into x and y point
        var velocity = p5.Vector.fromAngle(cannon.angle);
        //speed
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
      }
  }