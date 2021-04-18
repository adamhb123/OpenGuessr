let EFFECTS = {
  "sparkle":"/images/animations/sparkle.gif",
}

var canvas = null;

export function init(_canvas){
  canvas = _canvas;
}

export function sparkle(x, y){
  if(canvas == null) return;
  var img = new Image;
  let context = canvas.getContext('2d');
  img.onload = function(){
    context.drawImage(img,x,y); // Or at whatever offset you like
  };
  img.src = EFFECTS.sparkle;
}
