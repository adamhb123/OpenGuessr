import * as Portals from "/jsmodules/portals.mjs";
import * as Maps from "/jsmodules/maps.mjs";

function PortalGallery(mapUUID) {
  this.update = () => {
    return new Promise((resolve, reject) => {
      let portals = [];
      fetch("/portals", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mapUUID: mapUUID,
          type: "get map portals"
        }),
      }).then(
        response => response.json()).then(
        data => {
          let boxCount = 18;
          for (let i = 0; i < (data.length < boxCount ? data.length : boxCount); i++) {
            portals.push(data[i]);
          }
          let imgs = document.getElementsByClassName("gallery-thumbnail");
          for (let i = 0; i < portals.length; i++) {
            imgs[i].setAttribute("src", "/images/panoramas/" + portals[i].image);
            imgs[i].setAttribute("uuid", portals[i].uuid);
            imgs[i].onclick = () => {
              Portals.copyPortalUUID(imgs[i]);
              this.toggle();
            };
            console.log(imgs[i].onclick);
            imgs[i].className = "gallery-thumbnail occupied";
          }
          for (let i = portals.length; i < boxCount; i++) {
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
      let portals = [];
      fetch("/maps").then(
        response => response.json()).then(
        data => {
          let imgs = document.getElementsByClassName("gallery-thumbnail");
          let boxCount = 18;
          console.log(data);
          for (let i = 0; i < (data.length < boxCount ? data.length : boxCount); i++) {
            portals.push(data[i].portals[0]);
          }
          console.log(portals);
          for (let i = 0; i < portals.length; i++) {
            imgs[i].setAttribute("src", "/images/panoramas/" + portals[i].image);
            imgs[i].setAttribute("uuid", portals[i].uuid);
            imgs[i].onclick = () => {
              Portals.copyPortalUUID(imgs[i]);
              this.toggle();
            };
            console.log(imgs[i].onclick);
            imgs[i].className = "gallery-thumbnail occupied";
          }
          for (let i = portals.length; i < boxCount; i++) {
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
