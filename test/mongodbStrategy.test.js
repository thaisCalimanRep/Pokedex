const assert = require('assert')
const MongoDb = require('./../src/bd/mongoDbStrategy')
const Context = require('./../src/bd/base/contextStrategy')
const pokemonjson = require('./../pokemonjson')
const context = new Context(new MongoDb())

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        await context.connect();
        
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado';
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {   
        const MOCK_POKEMON_CADASTRAR = await pokemonjson.getPokemonDataEncounter();      
        const { nome, height, weight, types, abilities, viewed} = await context.create(MOCK_POKEMON_CADASTRAR)        
        assert.deepEqual({ nome, height, weight, types, abilities, viewed}, MOCK_POKEMON_CADASTRAR)
    })


})