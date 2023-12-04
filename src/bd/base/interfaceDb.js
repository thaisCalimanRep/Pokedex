class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}
//interface
class IDb {
  create(item) {
    throw new NotImplementedException();
  }
  read(item) {
    throw new NotImplementedException();
  }
  update(itemid, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
  isConnected(itemid) {
    throw new NotImplementedException();
  }
}

module.exports = IDb;
