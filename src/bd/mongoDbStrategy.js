const Mongoose = require("mongoose");
const ICrud = require("./base/interfaceDb");

const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando",
};
class MongoDB extends ICrud {
  constructor() {
    super();
    this._pokemons = null;
    this._driver = null;
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return state;

    if (state !== "Conectando") return state;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }
  defineModel() {
    const pokemonsSchema = new Mongoose.Schema({
      id: {
        type: Number,
        require: true,
      },
      nome: {
        type: String,
        require: true,
      },
      height: {
        type: Number,
        index: "2d",
      },
      weight: {
        type: Number,
        index: "2d",
      },
      types: {
        type: Array,
      },
      abilities: {
        type: Array,
      },
      viewed: {
        type: Number,
      },
      captured: {
        type: Number,
      },
    });

    //mocha workaround
    this._pokemons =
      Mongoose.models.pokemons || Mongoose.model("pokemons", pokemonsSchema);
  }
  connect() {
    Mongoose.connect("mongodb://thais:thais123@localhost:27017/pokemons", {
      useNewUrlParser: true,
    }).catch((error) => {
      if (!error) return;
      console.log("Falha na conexão!", error);
    });
    this._driver = Mongoose.connection;
    this.defineModel();
  }

  async create(item) {
    return this._pokemons.create(item);
  }
  async read(item = {}) {
    return this._pokemons.find(item);
  }
  async update(itemid, item) {
    return this._pokemons.findOneAndUpdate(
      { id: itemid },
      { $set: item },
      { new: true }
    );
  }
  async delete(itemid) {
    return this._pokemons.deleteOne({ id: itemid });
  }
}

module.exports = MongoDB;
