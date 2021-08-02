function onMapChange() {
	let displayMapCreation = document.querySelector("#map-creation-section");
	if (document.querySelector("#map").value === "new-map") {
		displayMapCreation.style.display = "block";
	} else {
		displayMapCreation.style.display = "none";
	}
}
//  Run onMapChange once to ensure page appears correctly
window.addEventListener("load", () => onMapChange());
window.addEventListener("pageshow", function(event) {
	var historyTraversal = event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
	if (historyTraversal) {
		// Handle page restore.
		window.location.reload();
	}
});
