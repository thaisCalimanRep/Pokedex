const IDb = require('./interfaceDb');
class ContextStrategy extends IDb {
  constructor(database) {
    super();
    this._database = database;
  }
  isConnected() {
    return this._database.isConnected();
  }
  connect() {
    return this._database.connect()
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  update(itemid, item) {
    return this._database.update(itemid, item);
  }
  delete(itemid) {
    return this._database.delete(itemid);
  }
}

module.exports = ContextStrategy;
