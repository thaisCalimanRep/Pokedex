const axios = require('axios')
const URL = `https://pokeapi.co/api/v2`

async function getPokemon(nome) {
    const url= `${URL}/pokemon/${nome}`
    const response = await axios.get(url)
    return response.data
}

async function getPokemonCharac(id) {
    const url= `${URL}/characteristic/${id}`
    const response = await axios.get(url)
    return response.data
}

// getPokemon('pikachu')
//     .then(function (resultado) {
//         console.log('pokemon', resultado)
//     })
//     .catch(function (error){
//         console.error('erro interno', erro)
//     })

// getPokemonCharac(25)
// .then(function (resultado) {
//     console.log('pokemon', resultado)
// })
// .catch(function (error){
//     console.error('erro interno', erro)
// })

module.exports = {
    getPokemon,
    getPokemonCharac
}