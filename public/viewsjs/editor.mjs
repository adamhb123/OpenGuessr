import * as Markers from "/jsmodules/markers.mjs";
import * as Gallery from "/jsmodules/gallery.mjs";
import * as Utility from "/jsmodules/utility.mjs";
import * as Portals from "/jsmodules/portals.mjs";
import * as Maps from "/jsmodules/maps.mjs";
import * as Animations from "/jsmodules/animations.mjs"

let panorama = document.getElementById("editor-script").getAttribute("data-panorama");
let mapUUID = document.getElementById("editor-script").getAttribute("data-mapUUID");

var viewer = new PhotoSphereViewer.Viewer({
  plugins: [
    [PhotoSphereViewer.MarkersPlugin]
  ],
  container: document.querySelector('#viewer'),
  panorama: panorama
});
var markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);
Portals.init(viewer);
Markers.init(markersPlugin, viewer, mapUUID);
let gallery = new Gallery.PortalGallery(mapUUID);

/* Button stuff */
document.getElementById("gallery-button").onclick = () => {
  gallery.update().then(gallery.toggle())
};
document.getElementById("add-marker-button").onclick = () => {
  Markers.add();
};
document.getElementById("final-marker-button").onclick = () => {
  Portals.finalizePortal();
}
document.getElementById("return-marker-button").onclick = () => {
  Portals.returnPortal(panorama);
}

function onloadActions() {
  gallery.update();
  let intid = setInterval(() => {
    if (viewerCanvas == null) {
      viewerCanvas = document.getElementsByClassName("psv-canvas");
      viewerCanvas = viewerCanvas.length > 0 ? viewerCanvas[0] : null;
    } else {
      clearInterval(intid);
    }
  }, 100);
}

/* Photosphere */
if (panorama.includes('undefined')) window.location.replace("/upload");
console.log(panorama);

var viewerCanvas = null;
console.log(`Canvas: ${viewerCanvas}`);

if (window.addEventListener) {
  window.addEventListener('load', () => {
    onloadActions();
  });
  document.addEventListener('contextmenu', function(e) {
    //alert("You've tried to open context menu"); //here you draw your own menu
    e.preventDefault();
  }, false);
} else {
  window.attachEvent('onload', () => {
    onloadActions();
  });
  document.attachEvent('oncontextmenu', function() {
    //alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}

Portals.setModeText("Edit");
