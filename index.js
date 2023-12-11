const MongoDb = require("./src/bd/mongoDbStrategy");
const Context = require("./src/bd/base/contextStrategy");
const pokemonjson = require("./pokemonjson");
const context = new Context(new MongoDb());

let pokemonInfoUpdate = class pokemonInfoUpdate {
  constructor(id, viewed) {
    this.id = id;
    this.viewed = viewed;
  }
};

function main() {
  connectionBD();
  PokemonInfo();
}

async function connectionBD() {
  await context.connect();
}

async function PokemonInfo() {
  const pokemonInfoJS = await pokemonjson.getPokemonDataEncounterJs();

  let pokemonBD = await verificaPokemonBD(pokemonInfoJS);

  if (pokemonBD.length === 0) {
    pokemonBD = await context.create(pokemonInfoJS);
  } else {
    const infoPokemonUpdate = await infoPokemonUpdateBD(pokemonBD);

    //const qtdViewed = parseInt(infoPokemonUpdate.viewed) + 1;

    pokemonBD = await context.update(parseInt(infoPokemonUpdate.id), {
      viewed: parseInt(infoPokemonUpdate.viewed) + 1,
    });
  }

  printEncontroPokemon(pokemonBD);
}

function printEncontroPokemon(pokemon) {
  console.log("==============");
  console.log(
    `Parabéns! Você já encontrou o pokémon ${pokemon.nome} ${pokemon.viewed} x.`
  );
  console.log("ID:", pokemon.id);
  console.log("Name:", pokemon.nome);
  console.log(`Tamanho: ${pokemon.height}m`);
  console.log(`Peso: ${pokemon.weight}Kg`);
  console.log("Tipos:", pokemon.types);
  console.log("Habilidades:", pokemon.abilities);
  console.log("==============");
}

async function infoPokemonUpdateBD(pokemonData) {
  let pokemonId = pokemonData.map(function (pokemonInfoId) {
    return pokemonInfoId.id;
  });

  let pokemonViewed = pokemonData.map(function (pokemonInfoViewed) {
    return pokemonInfoViewed.viewed;
  });
  const pokemonInfos = new pokemonInfoViewed(pokemonId[0], pokemonViewed[0]);

  return pokemonInfos;
}

async function verificaPokemonBD(item) {
  const pokemonRead = await context.read({ id: item.id });
  return pokemonRead;
}
main();
