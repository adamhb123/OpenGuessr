function Map(name, uuid, links, portals) {
  /*  'links' refers to a list of objects with the following structure:
      {map: (mapobject),connectingPortal: (portalobject)}
      They are used in order to connect multiple maps together through
      a singular portal. This portal should be mirrored in the other map
      as well, but it is not a necessity */
  this.name = name;
  this.uuid = uuid;
  this.links = links;
  this.portals = portals;
}

function MapFromJSON(jsonData) {
  return new Map(jsonData.name, jsonData.uuid, jsonData.portals);
}

export {
  Map,
  MapFromJSON
};
