import * as Portals from "../jsmodules/portals.mjs";

//  Viewer initialization
Portals.getRandomPortalImageFile().then(imageFile => {
  var viewer = new PhotoSphereViewer.Viewer({
    navbar: [
      'autorotate'
    ],
    mousemove: false,
    container: document.querySelector('#viewer'),
    panorama: `/images/panoramas/${imageFile}`
  });
  viewer.trigger('autorotate');
  document.querySelector(".psv-autorotate-button").click();
  document.querySelector(".psv-navbar").remove();
}).catch(error => console.error(`Failed to initialize viewer: ${error}`));
