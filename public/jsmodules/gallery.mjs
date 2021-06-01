import * as Portals from "/jsmodules/portals.mjs";
import * as Maps from "/jsmodules/maps.mjs";

function PortalGallery(mapUUID) {
  this.update = () => {
    return new Promise((resolve, reject) => {
      let images = [];
      fetch("/portals",{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({mapFilename:mapUUID+".map"}),
      }).then(
        response => response.json()).then(
        data => {
          let boxCount = 18;
          for (let i = 0; i < (data.length < boxCount ? data.length : boxCount); i++) {
            images.push(data[i].image);
          }
          console.log(images);
          let imgs = document.getElementsByClassName("gallery-thumbnail");
          console.log("Images: " + imgs.length);
          for (let i = 0; i < images.length; i++) {
            imgs[i].setAttribute("src", "/images/panoramas/" + images[i]);
            imgs[i].onclick = () => {
              Portals.copyPortalId(imgs[i]);
              this.toggle();
            };
            console.log(imgs[i].onclick);
            imgs[i].className = "gallery-thumbnail occupied";
          }
          for (let i = images.length; i < boxCount; i++) {
            imgs[i].className = "gallery-thumbnail empty";
          }
          resolve("Finished loading portal gallery");
        }
      );
    })
  };
  this.toggle = () => {
    let gallery = document.getElementsByClassName("gallery")[0];
    if (gallery.className == "gallery visible") {
      gallery.className = "gallery invisible";
    } else {
      gallery.className = "gallery visible";
    }
  };
}

function MapGallery() {
  this.update = () => {
    return new Promise((resolve, reject) => {
      let images = [];
      fetch("/maps").then(
        response => response.json()).then(
        data => {
          let imgs = document.getElementsByClassName("gallery-thumbnail");
          console.log("Images: " + imgs.length);
          let boxCount = 18;
          console.log(data);
          for (let i = 0; i < (data.length < boxCount ? data.length : boxCount); i++) {
            images.push(data[i].portals[0].image);
          }
          console.log(images);
          console.log("Images: " + imgs.length);
          for (let i = 0; i < images.length; i++) {
            imgs[i].setAttribute("src", "/images/panoramas/" + images[i]);
            imgs[i].onclick = () => {
              Portals.copyPortalId(imgs[i]);
              this.toggle();
            };
            console.log(imgs[i].onclick);
            imgs[i].className = "gallery-thumbnail occupied";
          }
          for (let i = images.length; i < boxCount; i++) {
            imgs[i].className = "gallery-thumbnail empty";
          }

          resolve("Finished loading map gallery");
        }
      );
    })
  };
  this.toggle = () => {
    let gallery = document.getElementsByClassName("gallery")[0];
    if (gallery.className == "gallery visible") {
      gallery.className = "gallery invisible";
    } else {
      gallery.className = "gallery visible";
    }
  };
}

export {
  PortalGallery,
  MapGallery
};
