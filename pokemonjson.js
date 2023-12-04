const service = require('./service');

let pokemonInfo = class pokemonInfo {
    constructor(id = 0, nome = '', height = 0, weight = 0, types = '', abilities = '', viewed = 0) {
            this.id = id;
            this.nome = nome.toUpperCase();
            this.height = (height/10).toFixed(1);
            this.weight = (weight/10).toFixed(1);
            this.types = types;
            this.abilities = abilities;
            this.viewed = viewed;
    }
};

function getPokemonEncounter(){
    var indexpokemon = Math.floor(Math.random() * 1010);
    return indexpokemon;
}

function printPokemon(pokemon){
    console.log('Pokemon ID:', pokemon.id);   
    console.log('Pokemon Name:', pokemon.nome);
    console.log(`Pokemon Height: ${pokemon.height}m`);
    console.log(`Pokemon Weight: ${pokemon.weight}Kg`);   
    console.log('Pokemon Types:', pokemon.types);
    console.log('Pokemon Abilities:', pokemon.abilities);
    console.log('==============');  
}

function getTypePokemon(pokemonData){
    let arrayType = pokemonData.types.map(function(Type){
        return Type.type
    }); 

    let pokemonType = arrayType.map(function(tipo){
        return tipo.name
    });

    pokemonType = upperCaseArray(pokemonType);
    return pokemonType;
}

function getAbilitiesPokemon(pokemonData){

    let arrayAbilities = pokemonData.abilities.map(function(abilities){
        return abilities
    }) 

    const Enabled  = arrayAbilities.filter(function(abilities){
        const abilitiesEnabled = abilities.is_hidden === false
        return abilitiesEnabled
    }) 
    
    let pokemonAbilities = Enabled.map(function(arrayAbilitie){
         return arrayAbilitie.ability.name
     })

    pokemonAbilities = upperCaseArray(pokemonAbilities);

    return pokemonAbilities;
}

async function getDataPokemon(indexNamePokemon, isName) {
    try{        
        if (isName === true){
            indexNamePokemon = indexNamePokemon.toLowerCase(); 
        }
        const pokemonData = await service.getPokemon(indexNamePokemon);
        const pokemonType = getTypePokemon(pokemonData);
        const pokemonAbilities = getAbilitiesPokemon(pokemonData);        

        const pokemon = new pokemonInfo(pokemonData.id, pokemonData.name,pokemonData.height, 
             pokemonData.weight, pokemonType, pokemonAbilities, 1);  
             
        return pokemon;
    } catch(error) {
        console.error('Pokemon não encontrado.', erro);
    }
}

async function getPokemonDataEncounterJs() {
    const pokemonData = await getDataPokemon(getPokemonEncounter(),false);
    return pokemonData
}

function upperCaseArray(lowerCaseArray){
    lowerCaseArray = lowerCaseArray.map(function (upperText) { 
        return upperText.toUpperCase();
    }); 
    return lowerCaseArray;

}


module.exports = {
    getPokemonDataEncounterJs
}