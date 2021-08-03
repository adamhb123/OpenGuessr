import * as Gallery from "./gallery.mjs";
import * as Utility from "./utility.mjs";
import * as Markers from "./markers.mjs";
import * as Constants from "../constants.mjs"
import {sendPost, waitForResponse} from "./utility.mjs";

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

function getRandomPortalImageFile() {
  return new Promise((resolve,reject) => {
    let xhr = Utility.sendPost("portals", {
      type: Constants.POSTCodes.GETRANDOMPORTALIMAGEFILE
    });
    waitForResponse(xhr).then(result => {
      console.log(result);
      resolve(JSON.parse(result).portalImage);
    });
  });
}

function finalizePortal() {
  return Utility.waitForResponse(Utility.sendPost("portals", {type: Constants.POSTCodes.FINALIZEPORTAL}, {
    "markers": Markers.markersMasterList
  }));
}

function returnPortal(originalPortal) {
  setModeText("Edit");
  allowMarkerCreation = true;
  return viewer.setPanorama(originalPortal).then(Markers.unhide());
}

function copyPortalUUID(element) {
  document.querySelector("#create-marker-text-id-link").setAttribute("uuid", element.getAttribute("uuid"));
}

export {
  allowMarkerCreation,
  PortalFromJSON,
  init,
  setModeText,
  getRandomPortalImageFile,
  finalizePortal,
  returnPortal,
  copyPortalUUID,
  peekPortal,
}
