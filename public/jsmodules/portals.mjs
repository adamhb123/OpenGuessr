import * as Gallery from "/jsmodules/gallery.mjs";
import * as Utility from "/jsmodules/utility.mjs";
import * as Markers from "/jsmodules/markers.mjs";

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
    /*allowMarkerCreation = false;
    setModeText("Roam");
    return new Promise((resolve, reject) => {
      console.log(`loading /images/panoramas/${this.image}`);
      //.filter(marker => marker.idLink == idLink)
      viewer.setPanorama(`/images/panoramas/${this.image}`).then(Markers.hide()).then(resolve(`Successfully viewing portal w/ IMG=${this.image}!`));
    });*/
    peekPortal(this.image);
  }
  this.getJSON = () => {
    return JSON.stringify({
      uuid: this.uuid,
      image: this.image,
      markers: this.markers
    });
  }
}

function peekPortal(portalImage) {
  allowMarkerCreation = false;
  setModeText("Roam");
  return new Promise((resolve, reject) => {
    console.log(`loading /images/panoramas/${portalImage}`);
    //.filter(marker => marker.idLink == idLink)
    viewer.setPanorama(`/images/panoramas/${portalImage}`).then(Markers.hide()).then(resolve(`Successfully viewing portal w/ IMG=${this.image}!`));
  });
}

function PortalFromJSON(jsonData) {
  return new Portal(jsonData.uuid, jsonData.image, jsonData.markers);
}

function init(_viewer) {
  viewer = _viewer;
}

function setModeText(mode) {
  let textCont = document.querySelector("#mode-text-div").getElementsByTagName('h1')[0];
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

function copyPortalUUID(element) {
  document.querySelector("#create-marker-text-id-link").setAttribute("uuid", element.getAttribute("uuid"));
}

export {
  allowMarkerCreation,
  PortalFromJSON,
  init,
  setModeText,
  finalizePortal,
  returnPortal,
  copyPortalUUID,
  peekPortal
}
