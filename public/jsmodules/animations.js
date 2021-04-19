//  Can automate frame retrieval by searching anim folder
function preload(frame){
  let im = new Image();
  im.src = frame;
  return im;
}

const EFFECTS = {
  "sparkle":[
    preload("/images/animations/sparkle/frame_00.png"),
    preload("/images/animations/sparkle/frame_01.png"),
    preload("/images/animations/sparkle/frame_02.png"),
    preload("/images/animations/sparkle/frame_03.png"),
    preload("/images/animations/sparkle/frame_04.png"),
    preload("/images/animations/sparkle/frame_05.png"),
    preload("/images/animations/sparkle/frame_06.png"),
    preload("/images/animations/sparkle/frame_07.png"),
    preload("/images/animations/sparkle/frame_08.png"),
    preload("/images/animations/sparkle/frame_09.png")
  ]
};
var animationCanvas = document.createElement("canvas");
animationCanvas.className = "animation-canvas";
animationCanvas.width = document.body.clientWidth;
animationCanvas.height = document.body.clientHeight;
document.body.append(animationCanvas);
var animationCtx = animationCanvas.getContext("2d");

function animate(effect, x, y){
  console.log("Drawing animation");
  let frames = EFFECTS[effect];
  let i = 0;
  let intid = setInterval(()=>{
    if(i == frames.length) clearInterval(intid);
    animationCtx.clearRect(0, 0, animationCtx.canvas.width, animationCtx.canvas.height)
    animationCtx.drawImage(frames[i],x,y); // Or at whatever offset you like
    i++;
  },100);
};

export function sparkle(x, y){
  //console.log(`Sparkle anim @ (${x},${y}) on ctx ${animationCtx
  window.addEventListener("load" , animate.bind(null,"sparkle",x,y) , false);
}
