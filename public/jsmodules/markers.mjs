import * as Utility from "/jsmodules/utility.mjs";
import * as Portals from "/jsmodules/portals.mjs";
import * as Animations from "/jsmodules/animations.mjs";

var markersPlugin = null;
var markersMasterList = [];
var clickLocs = [];
var currentMapUUID = null;

function RGBA(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.getCSS = () => {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

function init(_markersPlugin, _viewer, _currentMapUUID) {
  markersPlugin = _markersPlugin;
  currentMapUUID = _currentMapUUID;
  _viewer.on('click', (e, data) => {
    if (!data.rightclick) {
      Animations.sparkle(data.clientX, data.clientY);
      console.log(Portals.allowMarkerCreation);
      if (!Portals.allowMarkerCreation) return;
      if (clickLocs.length == 0) {
        clickLocs = [
          [data.longitude, data.latitude]
        ];
        createPolygonRadMarker("transportMarker", clickLocs);
      } else if (clickLocs.length == 4) {
        clickLocs = [];
        markersPlugin.removeMarker("transportMarker");
      } else {
        clickLocs.push([data.longitude, data.latitude]);
        updatePolygonRadMarkerPosition("transportMarker", clickLocs);
      }
    }
  });
}

function Marker(idLink, markerId, polygonRad) {
  this.idLink = idLink;
  this.markerId = markerId;
  this.polygonRad = polygonRad;
}

function createPolygonRadMarker(id, polygonRad, onClick) {
  markersPlugin.addMarker({
    id: id,
    polygonRad: polygonRad,
  });
  if (onClick != null) {
    markersPlugin.on("select-marker", onClick);
  }
}

function updatePolygonRadMarkerPosition(id, newPolygonRad) {
  markersPlugin.updateMarker({
    id: id,
    polygonRad: newPolygonRad,
  });
}

function updatePolygonRadMarkerStyle(id, fillColor, strokeColor, strokeWidth) {
  markersPlugin.updateMarker({
    id: id,
    svgStyle: {
      fill: fillColor.getCSS(),
      stroke: strokeColor.getCSS(),
      strokeWidth: `${strokeWidth}px`
    },
  });
}

function hide(markers = markersMasterList) {
  console.log(markers);
  return new Promise((resolve, reject) => {
    if (markers == null) reject("markers cannot be null");
    markers.forEach(marker => {
      markersPlugin.hideMarker(marker.markerId);
    });
    resolve("Markers successfully hidden!");
  })
}

function unhide(markers = markersMasterList) {
  console.log(markers);
  return new Promise((resolve, reject) => {
    if (markers == null) reject("markers cannot be null");
    markers.forEach(marker => {
      markersPlugin.showMarker(marker.markerId);
    });
    resolve("Markers successfully unhidden!");
  })
}

function add() {
  let idLink = document.querySelector("#create-marker-text-id-link").value;
  console.log(`IDLINK: ${idLink}`);
  let tempId = Utility.createUUID();
  markersMasterList.push(new Marker(idLink, tempId, clickLocs));
  createPolygonRadMarker(tempId, clickLocs, (e, marker, data) => {
    console.log(data);
    Utility.getPortalImageFile(currentMapUUID, idLink).then(image => Portals.peekPortal(image));
  });
  updatePolygonRadMarkerStyle(tempId,
    new RGBA(225, 28, 82, .2),
    new RGBA(176, 25, 126, .8));
  markersPlugin.removeMarker("transportMarker");
  clickLocs = []
}

function removeMarker(markerId) {
  return new Promise((resolve, reject) => {
    markersPlugin.removeMarker(markersMasterList.filter(marker => markerId == marker.markerId)[0]);
    markersMasterList = markersMasterList.filter(emid => emid !== markerId);
    resolve(`Marker ${markerId} removed!`);
  })
}

export {
  init,
  Marker,
  markersMasterList,
  createPolygonRadMarker,
  updatePolygonRadMarkerPosition,
  updatePolygonRadMarkerStyle,
  hide,
  unhide,
  add,
  removeMarker
};
