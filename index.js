const MongoDb = require('./src/bd/mongoDbStrategy')
const Context = require('./src/bd/base/contextStrategy')
const pokemonjson = require('./pokemonjson')
const context = new Context(new MongoDb())

let pokemonInfoViewed = class pokemonInfoViewed {
    constructor(id = 0, viewed = '') {
            this.id = id;
            this.viewed = viewed;
    }

};

function main(){
    bdConnection();
    setPokemonInfo();
};

async function bdConnection(){
    await context.connect(); 
}

async function setPokemonInfo(){    
    const pokemonInfoJS = await pokemonjson.getPokemonDataEncounterJs();
    const existePokemon = await verificaRegistro(pokemonInfoJS);
    if (existePokemon.length === 0){
        await context.create(pokemonInfoJS); 
        console.log('Parabéns! É sua primeira vez vendo esse pokemon', pokemonInfoJS);
    } else{
        const pokemoninfoExists = await returnPokemonInfoExists(existePokemon);
        const qtdViewed = parseInt(pokemoninfoExists.viewed) + 1;
        const pokemonAtualizado = await context.update(parseInt(pokemoninfoExists.id), {viewed: qtdViewed});  
        console.log(`Parabéns! É sua ${qtdViewed} vez vendo esse pokemon ${pokemonAtualizado}`); 
    }
    
}

async function returnPokemonInfoExists(pokemonData){

    let pokemonId = pokemonData.map(function(pokemonInfoId){
        return pokemonInfoId.id
    }) 

    let pokemonViewed = pokemonData.map(function(pokemonInfoViewed){
        return pokemonInfoViewed.viewed
    }) 
    const pokemonInfos = new pokemonInfoViewed(pokemonId[0], pokemonViewed[0]);  

    return pokemonInfos;
}

async function verificaRegistro(item){
    const pokemonRead = await context.read({id: item.id});
   return pokemonRead;
}
main();