const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function createUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function choice(choiceList) {
  var index = Math.floor(Math.random() * choiceList.length);
  return choiceList[index];
}

function sendPost(destination, type, data) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", destination, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log("DATA" + JSON.stringify(data));
  let dataObj = {
    "type": type
  }
  dataObj = Object.assign(data, dataObj);
  console.log("DATA OBJ:" + JSON.stringify(dataObj));
  xhr.send(JSON.stringify(dataObj));
  return xhr;
}

function getMapPortals(mapUUID) {
  return new Promise((resolve, reject) => {
    let xhr = sendPost("/portals", null, {
      mapUUID: mapUUID,
      type: "get map portals"
    });
    let timeElapsed = 0;
    let intid = setInterval(() => {
      if (xhr.readyState == 4) {
        resolve(xhr.response);
        clearInterval(intid);
      } else if (timeElapsed > 10000) {
        reject(`Failed to retrieve portals from map ${mapUUID}`)
        clearInterval(intid);
      }
      timeElapsed += 100;
    }, 100);
  });
}

function getPortalImageFile(mapFilename, portalUUID) {
  return new Promise((resolve, reject) => {
    let xhr = sendPost("/portals", null, {
      mapFilename: mapFilename,
      portalUUID: portalUUID,
      type: "get portal image"
    });
    let timeElapsed = 0;
    let intid = setInterval(() => {
      if (xhr.readyState == 4) {
        resolve(xhr.response);
        clearInterval(intid);
      } else if (timeElapsed > 10000) {
        reject(`Failed to retrieve portals from map ${mapFilename}`)
        clearInterval(intid);
      }
      timeElapsed += 100;
    }, 100);
  });
}

export {
  copyToClipboard,
  createUUID,
  choice,
  sendPost,
  getMapPortals,
  getPortalImageFile
};
