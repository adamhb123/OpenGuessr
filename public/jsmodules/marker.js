
  function createPolygonRadMarker(id, polygonRad, onClick=null){
    markersPlugin.addMarker({
      id: id,
      polygonRad: polygonRad,
    });
    if(onClick != null){
        markersPlugin.on("select-marker", onClick);
    }
  }
  function updatePolygonRadMarkerPosition(id, newPolygonRad){
    markersPlugin.updateMarker({
      id: id,
      polygonRad: newPolygonRad,
    });
  }
  function updatePolygonRadMarkerStyle(id, fillColor, strokeColor, strokeWidth){
    markersPlugin.updateMarker({
      id: id,
      svgStyle: {
        fill: fillColor.getCSS(),
        stroke: strokeColor.getCSS(),
        strokeWidth: `${strokeWidth}px`
      },
    });
  }
  function hideMarkers(markers){
    console.log(markers);
    return new Promise((resolve, reject)=>{
      if(markers == null) reject("markers cannot be null");
      markers.forEach(marker => {
        markersPlugin.hideMarker(marker.markerId);
      });
      resolve("Markers successfully hidden!");
    })
  }

  function unhideMarkers(markers){
    console.log(markers);
    return new Promise((resolve, reject)=>{
      if(markers == null) reject("markers cannot be null");
      markers.forEach(marker => {
        markersPlugin.showMarker(marker.markerId);
      });
      resolve("Markers successfully unhidden!");
    })
  }
  function addMarker(){
    let idLink = document.querySelector("#create-marker-text-id-link").value;
    console.log(`IDLINK: ${idLink}`);
    let tempId = createUUID();
    markerMasterList.push(new Marker(idLink, tempId, clickLocs));
    createPolygonRadMarker(tempId, clickLocs, onClick = (e, marker, data)=>{
      console.log(data);
      transitionToViewPortal(idLink);

    });
    updatePolygonRadMarkerStyle(tempId,
      new RGBA(225, 28, 82, .2),
      new RGBA(176, 25, 126, .8));
    markersPlugin.removeMarker("transportMarker");
    clickLocs = []
  }

  function removeMarker(markerId){
    return new Promise((resolve, reject)=>{
      markersPlugin.removeMarker(markerMasterList.filter(marker => markerId == marker.markerId)[0]);
      markerMasterList = markerMasterList.filter(emid => emid !== markerId);
      resolve(`Marker ${markerId} removed!`);
    })
  }
