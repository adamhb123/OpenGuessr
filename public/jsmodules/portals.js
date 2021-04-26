import * as Gallery from "/jsmodules/gallery.js";
import * as Utility from "/jsmodules/utility.js";
import * as Markers from "/jsmodules/markers.js";

export var allowMarkerCreation = true;
var viewer = null;

export function init(_viewer) {
  viewer = _viewer;
}

export function setModeText(mode) {
  let textCont = document.getElementById("mode-text-div").getElementsByTagName('h1')[0];
  textCont.innerHTML = `Mode: ${mode}`;
}

export function getImageFromPortalId(portalId) {
  return new Promise((resolve, reject) => {
    fetch("/portals").then(
      response => response.json()).then(
      data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let dataSplit = data[i].split(".")
          let id = dataSplit.slice(0, dataSplit.length - 1).join();
          console.log(`${id} == ${portalId} = ${id==portalId}`);
          if (id == portalId) {
            resolve(data[i]);
          }
        }
        reject(`Portal '${portalId}' does not exist!`);
      }
    );
  });
}

export function viewPortal(imageFilename) {
  allowMarkerCreation = false;
  setModeText("Roam");
  return new Promise((resolve, reject) => {
    console.log(`loading /images/panoramas/${imageFilename}`);
    //.filter(marker => marker.idLink == idLink)
    viewer.setPanorama(`/images/panoramas/${imageFilename}`).then(Markers.hide()).then(resolve(`Successfully viewing portal w/ IMG=${imageFilename}!`));
  })
}

export function loadPortal(imageFilename) {
  //  Needs to load portal markers by getting the json data with all the
  //  portal data in it.
  markersPlugin.clearMarkers();
  viewer.setPanorama(`/images/panoramas/${imageFilename}`);
}

export function transitionToViewPortal(idLink) {
  getImageFromPortalId(idLink).then(imageLink => {viewPortal(imageLink);
  });
}

export function finalizePortal() {
  Utility.sendPost("finalize portal", {
    "markers": Gallery.markersMasterList
  });
}

export function returnPortal(originalPortal) {
  return new Promise((resolve, reject) => {
    setModeText("Edit");
    allowMarkerCreation = true;
    viewer.setPanorama(originalPortal).then(Markers.unhide());
  });
}

export function copyPortalId(element) {
  let im = element.src.split('.');
  im = im.slice(0, im.length - 1).join();
  im = im.split("/");
  im = im[im.length - 1];
  //im = im.split('=')[1];
  document.getElementById("create-marker-text-id-link").value = im;
  Gallery.toggle();
}
