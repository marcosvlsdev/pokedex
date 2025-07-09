function convertToBasicModel(pokemonDetails) {
    const pokemon = new Pokemon()
    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = pokemonDetails.types
    pokemon.name = pokemonDetails.name
    pokemon.id = pokemonDetails.id
    pokemon.types = types
    pokemon.type = types[0]
    pokemon.photo = pokemonDetails.sprites.front_default
    return pokemon
}

const pokeApi = {}
pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=>pokemons.map((pokemon)=>fetch(pokemon.url) //lista de requisições de cada url do pokemon
                                                .then((answer)=>answer.json())
                                                .then((pokemon)=>convertToBasicModel(pokemon))))
    .then((requisicaoInfos) => Promise.all(requisicaoInfos)) //espera a promise de cada requisicao
    .then((listaDeInfos)=>listaDeInfos) //transforma em uma array com os detalhes de cada pokemon
    .catch((error) => console.log(error))
}