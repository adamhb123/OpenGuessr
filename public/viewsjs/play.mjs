import * as Portals from "../jsmodules/portals.mjs";

//  Viewer initialization
Portals.getRandomPortalImageFile().then(imageFile => {
	var viewer = new PhotoSphereViewer.Viewer({
		plugins: [],
		container: document.querySelector('#viewer'),
		panorama: `/images/panoramas/${imageFile}`
	});
	document.querySelector(".psv-navbar").remove();
});

