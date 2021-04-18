import * as Utility from "/jsmodules/utility.js";
import * as Portals from "/jsmodules/portals.js";
import * as Animations from "/jsmodules/animations.js";

var markersPlugin = null;
var markersMasterList = [];
var clickLocs = []
let creatingRect = false;

function RGBA(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.getCSS = () => {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

export function init(_markersPlugin, _viewer) {
  markersPlugin = _markersPlugin;
  _viewer.on('click', (e, data) => {
    Animations.sparkle(e.clientX, e.clientY);
    if (!data.rightclick) {
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

export function Marker(idLink, markerId, polygonRad) {
  this.idLink = idLink;
  this.markerId = markerId;
  this.polygonRad = polygonRad;
}

export function createPolygonRadMarker(id, polygonRad, onClick) {
  markersPlugin.addMarker({
    id: id,
    polygonRad: polygonRad,
  });
  if (onClick != null) {
    markersPlugin.on("select-marker", onClick);
  }
}

export function updatePolygonRadMarkerPosition(id, newPolygonRad) {
  markersPlugin.updateMarker({
    id: id,
    polygonRad: newPolygonRad,
  });
}

export function updatePolygonRadMarkerStyle(id, fillColor, strokeColor, strokeWidth) {
  markersPlugin.updateMarker({
    id: id,
    svgStyle: {
      fill: fillColor.getCSS(),
      stroke: strokeColor.getCSS(),
      strokeWidth: `${strokeWidth}px`
    },
  });
}

export function hide(markers = markersMasterList) {
  console.log(markers);
  return new Promise((resolve, reject) => {
    if (markers == null) reject("markers cannot be null");
    markers.forEach(marker => {
      markersPlugin.hideMarker(marker.markerId);
    });
    resolve("Markers successfully hidden!");
  })
}

export function unhide(markers = markersMasterList) {
  console.log(markers);
  return new Promise((resolve, reject) => {
    if (markers == null) reject("markers cannot be null");
    markers.forEach(marker => {
      markersPlugin.showMarker(marker.markerId);
    });
    resolve("Markers successfully unhidden!");
  })
}

export function add() {
  let idLink = document.querySelector("#create-marker-text-id-link").value;
  console.log(`IDLINK: ${idLink}`);
  let tempId = Utility.createUUID();
  markersMasterList.push(new Marker(idLink, tempId, clickLocs));
  createPolygonRadMarker(tempId, clickLocs, (e, marker, data) => {
    console.log(data);
    Portals.transitionToViewPortal(idLink);

  });
  updatePolygonRadMarkerStyle(tempId,
    new RGBA(225, 28, 82, .2),
    new RGBA(176, 25, 126, .8));
  markersPlugin.removeMarker("transportMarker");
  clickLocs = []
}

export function removeMarker(markerId) {
  return new Promise((resolve, reject) => {
    markersPlugin.removeMarker(markersMasterList.filter(marker => markerId == marker.markerId)[0]);
    markersMasterList = markersMasterList.filter(emid => emid !== markerId);
    resolve(`Marker ${markerId} removed!`);
  })
}
