const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, rope2, rope3;
var fruit;
var Connection, Connection2, Connection3;

var rabbitImg, fruitImg, backgroundImg;
var bunny;
var button, button2, button3;

var blink, eat, sad;

var cut_sound, sad_sound, eat_sound, air_sound, bg_sound

var mute_btn, balloon_btn;

var canW, canH;


function preload() {
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  rabbitImg = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  eat_sound = loadSound("eating_sound.mp3");
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound("rope_cut.mp3");
  air_sound = loadSound("air.wav");
  bg_sound  = loadSound("bk_song.mp3");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  blink.looping = true;
  eat.looping = false;
  sad.looping = false;


          
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if(isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW + 80, canH);
  } else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-20,600,20);

  bg_sound.play();
  bg_sound.setVolume(0.3);

  blink.frameDelay = 20;
  eat.frameDelay = 20;


  rope = new Rope(6, {x:20, y:90});
  rope2 = new Rope(6, {x:200, y:55});
  rope3 = new Rope(6, {x:300, y:220});

  fruit = Bodies.circle(250, 100, 20);

  bunny = createSprite(300, canH-100)
  bunny.scale = 0.25

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad)
  bunny.changeAnimation("blinking");


  button = createImg("cut_button.png");
  button.position(20, 70);
  button.size(35, 35);
  button.mouseClicked(drop);

  button2 = createImg("cut_button.png");
  button2.position(200, 35);
  button2.size(35, 35);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.position(300, 200);
  button3.size(35, 35);
  button3.mouseClicked(drop3);

  mute_btn = createImg("mute.png");
  mute_btn.position(370, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  balloon_btn = createImg("balloon.png");
  balloon_btn.position(30, 250);
  balloon_btn.size(120, 80);
  balloon_btn.mouseClicked(soprar);

  Matter.Composite.add(rope.body, fruit);

  Connection = new Link(rope, fruit);
  Connection2 = new Link(rope2, fruit);
  Connection3 = new Link(rope3, fruit);
  
  imageMode(CENTER)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, canW + 80, canH);

  if (collide(fruit, bunny) === true){
    bunny.changeAnimation("eating");
    eat_sound.play();
  
  }
  if (collide(fruit, ground.body) === true){
    bunny.changeAnimation("crying");
    sad_sound.play();
  }

  ground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if ( fruit !== null){
  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  }
  
  Engine.update(engine);
  

  drawSprites();
   
}

function drop(){
  rope.break();
  Connection.detach();
  Connection = null;
  cut_sound.play();

}

function drop2(){
  rope2.break();
  Connection2.detach();
  Connection2 = null;
  cut_sound.play();

}

function drop3(){
  rope3.break();
  Connection3.detach();
  Connection3 = null;
  cut_sound.play();

}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()

  } else {
    bg_sound.play();

  }
}

function collide(body, sprite){

  if ( body !== null){


  var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)

  if (d<=80) {
    World.remove(engine.world, fruit);
    fruit = null;

    return true;

  } else {

    return false;
    
  }
 
}

}

function soprar(){
  Matter.Body.applyForce( fruit,{x:0, y:0}, {x:0.01, y:0});
  air_sound.play();
}
