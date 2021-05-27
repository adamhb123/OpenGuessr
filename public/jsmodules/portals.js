import * as Gallery from "/jsmodules/gallery.js";
import * as Utility from "/jsmodules/utility.js";
import * as Markers from "/jsmodules/markers.js";

var allowMarkerCreation = true;
var viewer = null;

function Portal(uuid, image, markers) {
  this.uuid = uuid;
  this.image = image;
  this.markers = markers;
  this.load = () => {
    //  Needs to load portal markers by getting the json data with all the
    //  portal data in it.
    markersPlugin.clearMarkers();
    viewer.setPanorama(`/images/panoramas/${this.image}`);
  }

  this.view = () => {
    allowMarkerCreation = false;
    setModeText("Roam");
    return new Promise((resolve, reject) => {
      console.log(`loading /images/panoramas/${this.image}`);
      //.filter(marker => marker.idLink == idLink)
      viewer.setPanorama(`/images/panoramas/${this.image}`).then(Markers.hide()).then(resolve(`Successfully viewing portal w/ IMG=${this.image}!`));
    });
  }
  this.getJSON = () => {
    return JSON.stringify({
      uuid: this.uuid,
      image: this.image,
      markers: this.markers
    });
  }
}

function PortalFromJSON(jsonData) {
  return new Portal(jsonData.uuid, jsonData.image, jsonData.markers);
}

function init(_viewer) {
  viewer = _viewer;
}

function setModeText(mode) {
  let textCont = document.getElementById("mode-text-div").getElementsByTagName('h1')[0];
  textCont.innerHTML = `Mode: ${mode}`;
}

function finalizePortal() {
  Utility.sendPost("editor", "finalize portal", {
    "markers": Markers.markersMasterList
  }); 
}

function returnPortal(originalPortal) {
  return new Promise((resolve, reject) => {
    setModeText("Edit");
    allowMarkerCreation = true;
    viewer.setPanorama(originalPortal).then(Markers.unhide());
  });
}

function copyPortalId(element) {
  let im = element.src.split('.');
  im = im.slice(0, im.length - 1).join();
  im = im.split("/");
  im = im[im.length - 1];
  //im = im.split('=')[1];
  document.getElementById("create-marker-text-id-link").value = im;
}

export {
  allowMarkerCreation,
  PortalFromJSON,
  init,
  setModeText,
  finalizePortal,
  returnPortal,
  copyPortalId
}
