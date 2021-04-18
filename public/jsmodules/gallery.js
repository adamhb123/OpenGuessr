import * as Portals from "/jsmodules/portals.js";

export function update(){
  return new Promise((resolve, reject)=>{
    let images = [];
     fetch("/portals").then(
      response => response.json()).then(
        data => {
          let boxCount = 18;
          console.log(data);
          for(let i = 0; i < (data.length < boxCount ? data.length : boxCount); i++){
            images.push(data[i]);
          }
          console.log(images);
          let imgs = document.getElementsByClassName("portal-thumbnail");
          console.log("Images: " + imgs.length);
          for(let i = 0; i < images.length; i++){
            //  console.log("IMAGE: " + images[i]);
            imgs[i].setAttribute("src","/images/panoramas/"+images[i]);
            imgs[i].onclick = () => {Portals.copyPortalId(imgs[i])};
            console.log(imgs[i].onclick);
            imgs[i].className = "portal-thumbnail occupied";
          }
          for(let i = images.length; i < boxCount; i++){
            imgs[i].className = "portal-thumbnail empty";
          }
          resolve(true);
        }
      );
  })
}

export function toggle(){
  let gallery = document.getElementsByClassName("portal-gallery")[0];
  if(gallery.className == "portal-gallery visible"){
    gallery.className = "portal-gallery invisible";
  }
  else{
    gallery.className = "portal-gallery visible";
  }
}
