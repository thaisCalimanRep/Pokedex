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

async function main() {
  connectionBD();
  const pokemon = await PokemonInfo();

  printEncontroPokemon(pokemon);
}

async function connectionBD() {
  await context.connect();
}

async function PokemonInfo() {
  const idPokemonEncounter = pokemonjson.getPokemonIDEncounter();

  let pokemonBD = await verificaPokemonBD(idPokemonEncounter);

  if (pokemonBD.length === 0) {
    const pokemonInfoJS = await pokemonjson.getPokemonDataEncounterJs(
      idPokemonEncounter
    );
    pokemonBD = await context.create(pokemonInfoJS);
  } else {
    const infoPokemonUpdate = await infoPokemonUpdateBD(pokemonBD);

    pokemonBD = await context.update(parseInt(infoPokemonUpdate.id), {
      viewed: parseInt(infoPokemonUpdate.viewed) + 1,
    });
  }

  return pokemonBD;
}

function printEncontroPokemon(pokemon) {

  let qtdeVezesString = "vez";
  if (pokemon.viewed > 1) {
    qtdeVezesString = "vezes";
  }

  console.log("==============");
  console.log(
    `Parabéns! Você já encontrou o pokémon ${pokemon.nome} ${pokemon.viewed} ${qtdeVezesString}.`
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

  const pokemonInfos = new pokemonViewed(pokemonId[0], pokemonViewed[0]);

  return pokemonInfos;
}

async function verificaPokemonBD(idPokemon) {
  const pokemonRead = await context.read({ id: idPokemon });
  return pokemonRead;
}
main();
