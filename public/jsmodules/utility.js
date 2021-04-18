
export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export function createUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export function choice(choiceList) {
  var index = Math.floor(Math.random() * choiceList.length);
  return choiceList[index];
}

export function sendPost(type, data){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "editor", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let dataObj = {
    "type": type
  }
  dataObj = Object.assign(data, dataObj);
  console.log(dataObj);
  xhr.send(JSON.stringify(dataObj));
}
