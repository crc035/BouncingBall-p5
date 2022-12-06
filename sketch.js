/*
 * This program sketch is copied from Evan Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 *
 * Clara Chaplin - Program Changes:
 * 1. Changed RGB ranges so that colors only vary around pink,  orange, and yellow.
 * 2. Added to program so that balls are constantly changing color throughout the program.
 * 3. Added to program so that balls are constantly changing size throughout.
 * 4. Changed the sound file so that the song "22" by Taylor Swift plays on a loop.
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;

function preload() {

  sound = loadSound("taylorswift22.mp3");  // preload the sound file
}

function setup() {

  createCanvas(windowWidth, windowHeight);


  
  noStroke();
  
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  // Making more balls
  for (var ballNum = 0; ballNum < 20; ballNum++) {
  	balls[ballNum] = new Ball();  
  }
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Hello T-Swift!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function draw() {

  background(255);
  createBox();
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    // Change the color and size constantly
    balls[ballNum].changeColor();
    balls[ballNum].changeSize();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 300
    
    // RGB values for color but limited to shades of pink
    this.red   = random(240, 255);
    this.green = random(85, 200);
    this.blue  = random(150,220)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;
    
    if ((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) { 
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    } 
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
  // Change the RGB values of a ball, keeping it within a 
  // range of pink / orange / yellow colors.
  changeColor() {
    this.red   = random(235, 255);
    this.green = random(50, 200);
    this.blue  = random(100, 220)
  }
  
  // Changes the size of a ball, without allowing it to
  // go over 100 or below 10.
  changeSize() {
    this.size = this.size + random(-20,20);
    if (this.size > 100) { this.size = 100; }
    if (this.size < 10) { this.size = 10; }
  }
  
  
}