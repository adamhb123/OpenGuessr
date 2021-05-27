//  Can automate frame retrieval by searching anim folder
const EFFECTS = {
  "sparkle": "/images/animations/sparkle.png"
};

var animationCanvas = document.createElement("canvas");
animationCanvas.className = "animation-canvas";
animationCanvas.width = document.body.clientWidth;
animationCanvas.height = document.body.clientHeight;
document.body.append(animationCanvas);
var animationCtx = animationCanvas.getContext("2d");

function Animatable(spritesheet, x, y, width, height, animationSpeed) {
  this.spritesheet = new Image();
  this.spritesheet.src = spritesheet;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.scaleWidth = width;
  this.scaleHeight = height;
  this.animationSpeed = animationSpeed;
  this.setScale = (_width, _height) => {
    this.scaleWidth = _width;
    this.scaleHeight = _height;
  }
}

function animate(animatable) {
  let i = 0;
  let start = Date.now();
  let intid = setInterval(() => {
    let timeElapsed = Date.now() - start;
    if (i == 10) clearInterval(intid);
    animationCtx.clearRect(0, 0, animationCtx.canvas.width, animationCtx.canvas.height);
    // img, sx, sy, swidth, sheight, x, y, width, height
    animationCtx.drawImage(animatable.spritesheet, animatable.width * i, 0, animatable.width, animatable.height,
      animatable.x - (animatable.scaleWidth / 2), animatable.y - (animatable.scaleWidth / 2), animatable.scaleWidth, animatable.scaleWidth);
    if (timeElapsed >= animatable.animationSpeed) {
      i++;
      start = Date.now();
    }
  }, Math.floor(animatable.animationSpeed / 2));
};


function sparkle(x, y) {
  //console.log(`Sparkle anim @ (${x},${y}) on ctx ${animationCtx
  let animatable = new Animatable(EFFECTS.sparkle, x, y, 32, 32, 32);
  //animatable.setScale(16,16);
  animatable.spritesheet.addEventListener("load", animate.bind(null, animatable), false);
}

export {sparkle};
